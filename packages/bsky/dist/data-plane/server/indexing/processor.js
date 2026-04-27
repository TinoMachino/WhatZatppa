"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordProcessor = void 0;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
class RecordProcessor {
    constructor(appDb, background, options) {
        Object.defineProperty(this, "appDb", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: appDb
        });
        Object.defineProperty(this, "background", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: background
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    get db() {
        return this.appDb.db;
    }
    get collection() {
        const collection = this.options.schema?.$type ?? this.options.lexId;
        if (!collection) {
            throw new Error('RecordProcessor requires schema or lexId');
        }
        return collection;
    }
    matchesSchema(obj) {
        return this.options.schema?.matches(obj) ?? true;
    }
    assertValidRecord(obj) {
        this.options.schema?.check(obj);
    }
    async insertRecord(uri, cid, obj, timestamp, opts) {
        this.assertValidRecord(obj);
        await this.db
            .insertInto('record')
            .values({
            uri: uri.toString(),
            cid: cid.toString(),
            did: uri.host,
            json: (0, lex_1.lexStringify)(obj),
            indexedAt: timestamp,
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
        const inserted = await this.options.insertFn(this.db, uri, cid, obj, timestamp);
        if (inserted) {
            this.aggregateOnCommit(inserted);
            if (!opts?.disableNotifs) {
                await this.handleNotifs({ inserted });
            }
            return;
        }
        // if duplicate, insert into duplicates table with no events
        const found = await this.options.findDuplicate(this.db, uri, obj);
        if (found && found.toString() !== uri.toString()) {
            await this.db
                .insertInto('duplicate_record')
                .values({
                uri: uri.toString(),
                cid: cid.toString(),
                duplicateOf: found.toString(),
                indexedAt: timestamp,
            })
                .onConflict((oc) => oc.doNothing())
                .execute();
        }
    }
    // Currently using a very simple strategy for updates: purge the existing index
    // for the uri then replace it. The main upside is that this allows the indexer
    // for each collection to avoid bespoke logic for in-place updates, which isn't
    // straightforward in the general case. We still get nice control over notifications.
    async updateRecord(uri, cid, obj, timestamp, opts) {
        this.assertValidRecord(obj);
        await this.db
            .updateTable('record')
            .where('uri', '=', uri.toString())
            .set({
            cid: cid.toString(),
            json: (0, lex_1.lexStringify)(obj),
            indexedAt: timestamp,
        })
            .execute();
        // If the updated record was a dupe, update dupe info for it
        const dupe = await this.options.findDuplicate(this.db, uri, obj);
        if (dupe) {
            await this.db
                .updateTable('duplicate_record')
                .where('uri', '=', uri.toString())
                .set({
                cid: cid.toString(),
                duplicateOf: dupe.toString(),
                indexedAt: timestamp,
            })
                .execute();
        }
        else {
            await this.db
                .deleteFrom('duplicate_record')
                .where('uri', '=', uri.toString())
                .execute();
        }
        const deleted = await this.options.deleteFn(this.db, uri);
        if (!deleted) {
            // If a record was updated but hadn't been indexed yet, treat it like a plain insert.
            return this.insertRecord(uri, cid, obj, timestamp);
        }
        this.aggregateOnCommit(deleted);
        const inserted = await this.options.insertFn(this.db, uri, cid, obj, timestamp);
        if (!inserted) {
            throw new Error('Record update failed: removed from index but could not be replaced');
        }
        this.aggregateOnCommit(inserted);
        if (!opts?.disableNotifs) {
            await this.handleNotifs({ inserted, deleted });
        }
    }
    async deleteRecord(uri, cascading = false) {
        await this.db
            .deleteFrom('record')
            .where('uri', '=', uri.toString())
            .execute();
        await this.db
            .deleteFrom('duplicate_record')
            .where('uri', '=', uri.toString())
            .execute();
        const deleted = await this.options.deleteFn(this.db, uri);
        if (!deleted)
            return;
        this.aggregateOnCommit(deleted);
        if (cascading) {
            await this.db
                .deleteFrom('duplicate_record')
                .where('duplicateOf', '=', uri.toString())
                .execute();
            return this.handleNotifs({ deleted });
        }
        else {
            const found = await this.db
                .selectFrom('duplicate_record')
                .innerJoin('record', 'record.uri', 'duplicate_record.uri')
                .where('duplicateOf', '=', uri.toString())
                .orderBy('duplicate_record.indexedAt', 'asc')
                .limit(1)
                .selectAll()
                .executeTakeFirst();
            if (!found) {
                return this.handleNotifs({ deleted });
            }
            const record = (0, lex_1.lexParse)(found.json);
            if (!this.matchesSchema(record)) {
                return this.handleNotifs({ deleted });
            }
            const inserted = await this.options.insertFn(this.db, new syntax_1.AtUri(found.uri), (0, lex_1.parseCid)(found.cid), record, found.indexedAt);
            if (inserted) {
                this.aggregateOnCommit(inserted);
            }
            await this.handleNotifs({ deleted, inserted: inserted ?? undefined });
        }
    }
    async handleNotifs(op) {
        let notifs = [];
        const runOnCommit = [];
        if (op.deleted) {
            const forDelete = this.options.notifsForDelete(op.deleted, op.inserted ?? null);
            if (forDelete.toDelete.length > 0) {
                // Notifs can be deleted in background: they are expensive to delete and
                // listNotifications already excludes notifs with missing records.
                runOnCommit.push(async (db) => {
                    await db.db
                        .deleteFrom('notification')
                        .where('recordUri', 'in', forDelete.toDelete)
                        .execute();
                });
            }
            notifs = forDelete.notifs;
        }
        else if (op.inserted) {
            notifs = this.options.notifsForInsert(op.inserted);
        }
        for (const chunk of (0, common_1.chunkArray)(notifs, 500)) {
            runOnCommit.push(async (db) => {
                const filtered = await this.filterNotifsForThreadMutes(chunk);
                await db.db.insertInto('notification').values(filtered).execute();
            });
        }
        // Need to ensure notif deletion always happens before creation, otherwise delete may clobber in a race.
        for (const fn of runOnCommit) {
            await fn(this.appDb); // these could be backgrounded
        }
    }
    async filterNotifsForThreadMutes(notifs) {
        const isBlocked = await Promise.all(notifs.map((n) => this.isNotifBlockedByThreadMute(n)));
        return notifs.filter((_, i) => !isBlocked[i]);
    }
    async isNotifBlockedByThreadMute(notif) {
        const subject = notif.reasonSubject;
        if (!subject)
            return false;
        if (subject.startsWith('did:'))
            return false;
        const post = await this.db
            .selectFrom('post')
            .select(['uri', 'replyRoot'])
            .where('uri', '=', subject)
            .executeTakeFirst();
        if (!post)
            return false;
        const threadRoot = post.replyRoot ?? post.uri;
        const threadMute = await this.db
            .selectFrom('thread_mute')
            .selectAll()
            .where('mutedByDid', '=', notif.did)
            .where('rootUri', '=', threadRoot)
            .executeTakeFirst();
        return !!threadMute;
    }
    aggregateOnCommit(indexed) {
        const { updateAggregates } = this.options;
        if (!updateAggregates)
            return;
        this.appDb.onCommit(() => {
            this.background.add((db) => updateAggregates(db.db, indexed));
        });
    }
}
exports.RecordProcessor = RecordProcessor;
exports.default = RecordProcessor;
//# sourceMappingURL=processor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBacklinks = exports.RecordReader = void 0;
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const util_1 = require("../../db/util");
const index_js_1 = require("../../lexicons/index.js");
class RecordReader {
    constructor(db) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
    }
    async recordCount() {
        const res = await this.db.db
            .selectFrom('record')
            .select(util_1.countAll.as('count'))
            .executeTakeFirst();
        return res?.count ?? 0;
    }
    async listAll() {
        const records = [];
        let cursor = '';
        while (cursor !== undefined) {
            const res = await this.db.db
                .selectFrom('record')
                .select(['uri', 'cid'])
                .where('uri', '>', cursor)
                .orderBy('uri', 'asc')
                .limit(1000)
                .execute();
            for (const row of res) {
                const parsed = new syntax_1.AtUri(row.uri);
                records.push({
                    uri: row.uri,
                    path: (0, repo_1.formatDataKey)(parsed.collection, parsed.rkey),
                    cid: (0, lex_data_1.parseCid)(row.cid),
                });
            }
            cursor = res.at(-1)?.uri;
        }
        return records;
    }
    async listCollections() {
        const collections = await this.db.db
            .selectFrom('record')
            .select('collection')
            .groupBy('collection')
            .execute();
        return collections.map((row) => row.collection);
    }
    async listRecordsForCollection(opts) {
        const { collection, limit, reverse, cursor, rkeyStart, rkeyEnd, includeSoftDeleted = false, } = opts;
        const { ref } = this.db.db.dynamic;
        let builder = this.db.db
            .selectFrom('record')
            .innerJoin('repo_block', 'repo_block.cid', 'record.cid')
            .where('record.collection', '=', collection)
            .if(!includeSoftDeleted, (qb) => qb.where((0, util_1.notSoftDeletedClause)(ref('record'))))
            .orderBy('record.rkey', reverse ? 'asc' : 'desc')
            .limit(limit)
            .selectAll();
        // prioritize cursor but fall back to soon-to-be-depcreated rkey start/end
        if (cursor !== undefined) {
            if (reverse) {
                builder = builder.where('record.rkey', '>', cursor);
            }
            else {
                builder = builder.where('record.rkey', '<', cursor);
            }
        }
        else {
            if (rkeyStart !== undefined) {
                builder = builder.where('record.rkey', '>', rkeyStart);
            }
            if (rkeyEnd !== undefined) {
                builder = builder.where('record.rkey', '<', rkeyEnd);
            }
        }
        const res = await builder.execute();
        return res.map((row) => ({
            uri: row.uri,
            cid: row.cid,
            value: (0, repo_1.cborToLexRecord)(row.content),
        }));
    }
    async getRecord(uri, cid, includeSoftDeleted = false) {
        const { ref } = this.db.db.dynamic;
        let builder = this.db.db
            .selectFrom('record')
            .innerJoin('repo_block', 'repo_block.cid', 'record.cid')
            .where('record.uri', '=', uri.toString())
            .selectAll()
            .if(!includeSoftDeleted, (qb) => qb.where((0, util_1.notSoftDeletedClause)(ref('record'))));
        if (cid) {
            builder = builder.where('record.cid', '=', cid);
        }
        const record = await builder.executeTakeFirst();
        if (!record)
            return null;
        return {
            uri: record.uri,
            cid: record.cid,
            value: (0, repo_1.cborToLexRecord)(record.content),
            indexedAt: record.indexedAt,
            takedownRef: record.takedownRef ? record.takedownRef.toString() : null,
        };
    }
    async hasRecord(uri, cid, includeSoftDeleted = false) {
        const { ref } = this.db.db.dynamic;
        let builder = this.db.db
            .selectFrom('record')
            .select('uri')
            .where('record.uri', '=', uri.toString())
            .if(!includeSoftDeleted, (qb) => qb.where((0, util_1.notSoftDeletedClause)(ref('record'))));
        if (cid) {
            builder = builder.where('record.cid', '=', cid);
        }
        const record = await builder.executeTakeFirst();
        return !!record;
    }
    async getRecordTakedownStatus(uri) {
        const res = await this.db.db
            .selectFrom('record')
            .select('takedownRef')
            .where('uri', '=', uri.toString())
            .executeTakeFirst();
        if (!res)
            return null;
        return res.takedownRef
            ? { applied: true, ref: res.takedownRef }
            : { applied: false };
    }
    async getCurrentRecordCid(uri) {
        const res = await this.db.db
            .selectFrom('record')
            .select('cid')
            .where('uri', '=', uri.toString())
            .executeTakeFirst();
        return res ? (0, lex_data_1.parseCid)(res.cid) : null;
    }
    async getRecordBacklinks(opts) {
        const { collection, path, linkTo } = opts;
        return await this.db.db
            .selectFrom('record')
            .innerJoin('backlink', 'backlink.uri', 'record.uri')
            .where('backlink.path', '=', path)
            .where('backlink.linkTo', '=', linkTo)
            .where('record.collection', '=', collection)
            .selectAll('record')
            .execute();
    }
    // @NOTE this logic is a placeholder until we allow users to specify these constraints themselves.
    // Ensures that we don't end-up with duplicate likes, reposts, and follows from race conditions.
    async getBacklinkConflicts(uri, record) {
        const conflicts = [];
        for (const backlink of (0, exports.getBacklinks)(uri, record)) {
            const backlinks = await this.getRecordBacklinks({
                collection: uri.collection,
                path: backlink.path,
                linkTo: backlink.linkTo,
            });
            for (const { rkey } of backlinks) {
                conflicts.push(syntax_1.AtUri.make(uri.hostname, uri.collection, rkey));
            }
        }
        return conflicts;
    }
    async listExistingBlocks() {
        const cids = new repo_1.CidSet();
        let cursor = '';
        while (cursor !== undefined) {
            const res = await this.db.db
                .selectFrom('repo_block')
                .select('cid')
                .where('cid', '>', cursor)
                .orderBy('cid', 'asc')
                .limit(1000)
                .execute();
            for (const row of res) {
                cids.add((0, lex_data_1.parseCid)(row.cid));
            }
            cursor = res.at(-1)?.cid;
        }
        return cids;
    }
    async getProfileRecord() {
        const row = await this.db.db
            .selectFrom('record')
            .leftJoin('repo_block', 'repo_block.cid', 'record.cid')
            .where('record.collection', '=', index_js_1.app.bsky.actor.profile.$type)
            .where('record.rkey', '=', 'self')
            .selectAll()
            .executeTakeFirst();
        if (!row?.content)
            return null;
        return (0, repo_1.cborToLexRecord)(row.content);
    }
    async getRecordsSinceRev(rev) {
        const result = {
            count: 0,
            profile: null,
            posts: [],
            paraPosts: [],
        };
        const res = await this.db.db
            .selectFrom('record')
            .innerJoin('repo_block', 'repo_block.cid', 'record.cid')
            .select([
            'repo_block.content',
            'uri',
            'repo_block.cid',
            'record.indexedAt',
        ])
            .where('record.repoRev', '>', rev)
            .limit(10)
            .orderBy('record.repoRev', 'asc')
            .execute();
        // sanity check to ensure that the clock received is not before _all_ local records (for instance in case of account migration)
        if (res.length > 0) {
            const sanityCheckRes = await this.db.db
                .selectFrom('record')
                .selectAll()
                .where('record.repoRev', '<=', rev)
                .limit(1)
                .executeTakeFirst();
            if (!sanityCheckRes) {
                return result;
            }
        }
        for (const cur of res) {
            result.count++;
            const uri = new syntax_1.AtUri(cur.uri);
            if (uri.collection === index_js_1.app.bsky.actor.profile.$type &&
                uri.rkey === 'self') {
                result.profile = {
                    uri,
                    cid: (0, lex_data_1.parseCid)(cur.cid),
                    indexedAt: cur.indexedAt,
                    record: (0, repo_1.cborToLexRecord)(cur.content),
                };
            }
            else if (uri.collection === index_js_1.app.bsky.feed.post.$type) {
                result.posts.push({
                    uri,
                    cid: (0, lex_data_1.parseCid)(cur.cid),
                    indexedAt: cur.indexedAt,
                    record: (0, repo_1.cborToLexRecord)(cur.content),
                });
            }
            else if (uri.collection === index_js_1.com.para.post.$type) {
                result.paraPosts.push({
                    uri,
                    cid: (0, lex_data_1.parseCid)(cur.cid),
                    indexedAt: cur.indexedAt,
                    record: (0, repo_1.cborToLexRecord)(cur.content),
                });
            }
        }
        return result;
    }
}
exports.RecordReader = RecordReader;
// @NOTE in the future this can be replaced with a more generic routine that pulls backlinks based on lex docs.
// For now we just want to ensure we're tracking links from follows, blocks, likes, and reposts.
const getBacklinks = (uri, record) => {
    if (record?.['$type'] === index_js_1.app.bsky.graph.follow.$type ||
        record?.['$type'] === index_js_1.app.bsky.graph.block.$type) {
        const subject = record['subject'];
        if (typeof subject !== 'string') {
            return [];
        }
        try {
            (0, syntax_1.ensureValidDid)(subject);
        }
        catch {
            return [];
        }
        return [
            {
                uri: uri.toString(),
                path: 'subject',
                linkTo: subject,
            },
        ];
    }
    if (record?.['$type'] === index_js_1.app.bsky.feed.like.$type ||
        record?.['$type'] === index_js_1.app.bsky.feed.repost.$type) {
        const subject = record['subject'];
        if (typeof subject?.['uri'] !== 'string') {
            return [];
        }
        try {
            (0, syntax_1.ensureValidAtUri)(subject['uri']);
        }
        catch {
            return [];
        }
        return [
            {
                uri: uri.toString(),
                path: 'subject.uri',
                linkTo: subject['uri'],
            },
        ];
    }
    return [];
};
exports.getBacklinks = getBacklinks;
//# sourceMappingURL=reader.js.map
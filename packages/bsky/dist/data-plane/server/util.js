"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePostSearchQuery = exports.violatesThreadGate = exports.invalidReplyRoot = exports.getAncestorsAndSelfQb = exports.getDescendentsQb = void 0;
const kysely_1 = require("kysely");
const util_1 = require("../../views/util");
const util_2 = require("./db/util");
const getDescendentsQb = (db, opts) => {
    const { uri, depth } = opts;
    const query = db.withRecursive('descendent(uri, depth)', (cte) => {
        return cte
            .selectFrom('post')
            .select(['post.uri as uri', (0, kysely_1.sql) `1`.as('depth')])
            .where((0, kysely_1.sql) `1`, '<=', depth)
            .where('replyParent', '=', uri)
            .unionAll(cte
            .selectFrom('post')
            .innerJoin('descendent', 'descendent.uri', 'post.replyParent')
            .where('descendent.depth', '<', depth)
            .select([
            'post.uri as uri',
            (0, kysely_1.sql) `descendent.depth + 1`.as('depth'),
        ]));
    });
    return query;
};
exports.getDescendentsQb = getDescendentsQb;
const getAncestorsAndSelfQb = (db, opts) => {
    const { uri, parentHeight } = opts;
    const query = db.withRecursive('ancestor(uri, ancestorUri, height)', (cte) => {
        return cte
            .selectFrom('post')
            .select([
            'post.uri as uri',
            'post.replyParent as ancestorUri',
            (0, kysely_1.sql) `0`.as('height'),
        ])
            .where('uri', '=', uri)
            .unionAll(cte
            .selectFrom('post')
            .innerJoin('ancestor', 'ancestor.ancestorUri', 'post.uri')
            .where('ancestor.height', '<', parentHeight)
            .select([
            'post.uri as uri',
            'post.replyParent as ancestorUri',
            (0, kysely_1.sql) `ancestor.height + 1`.as('height'),
        ]));
    });
    return query;
};
exports.getAncestorsAndSelfQb = getAncestorsAndSelfQb;
const invalidReplyRoot = (reply, parent) => {
    const replyRoot = reply.root.uri;
    const replyParent = reply.parent.uri;
    // if parent is not a valid reply, transitively this is not a valid one either
    if (parent.invalidReplyRoot) {
        return true;
    }
    // replying to root post: ensure the root looks correct
    if (replyParent === replyRoot) {
        return !!parent.record.reply;
    }
    // replying to a reply: ensure the parent is a reply for the same root post
    return parent.record.reply?.root.uri !== replyRoot;
};
exports.invalidReplyRoot = invalidReplyRoot;
const violatesThreadGate = async (db, replierDid, ownerDid, rootPost, gate) => {
    const { canReply, allowFollower, allowFollowing, allowListUris = [], } = (0, util_1.parseThreadGate)(replierDid, ownerDid, rootPost, gate);
    if (canReply) {
        return false;
    }
    if (!allowFollower && !allowFollowing && !allowListUris?.length) {
        return true;
    }
    const { ref } = db.dynamic;
    const nullResult = (0, kysely_1.sql) `${null}`;
    const check = await db
        .selectFrom((0, util_2.valuesList)([replierDid]).as((0, kysely_1.sql) `subject (did)`))
        .select([
        allowFollower
            ? db
                .selectFrom('follow')
                .where('subjectDid', '=', ownerDid)
                .whereRef('creator', '=', ref('subject.did'))
                .select('subjectDid')
                .as('isFollower')
            : nullResult.as('isFollower'),
        allowFollowing
            ? db
                .selectFrom('follow')
                .where('creator', '=', ownerDid)
                .whereRef('subjectDid', '=', ref('subject.did'))
                .select('creator')
                .as('isFollowed')
            : nullResult.as('isFollowed'),
        allowListUris.length
            ? db
                .selectFrom('list_item')
                .where('list_item.listUri', 'in', allowListUris)
                .whereRef('list_item.subjectDid', '=', ref('subject.did'))
                .limit(1)
                .select('listUri')
                .as('isInList')
            : nullResult.as('isInList'),
    ])
        .executeTakeFirst();
    if (allowFollowing && check?.isFollowed) {
        return false;
    }
    else if (allowFollower && check?.isFollower) {
        return false;
    }
    else if (allowListUris.length && check?.isInList) {
        return false;
    }
    return true;
};
exports.violatesThreadGate = violatesThreadGate;
const parsePostSearchQuery = (qParam, params) => {
    // Accept individual params, but give preference to options embedded in `q`.
    let author = params?.author;
    const parts = [];
    let curr = '';
    let quoted = false;
    for (const c of qParam) {
        if (c === ' ' && !quoted) {
            curr.trim() && parts.push(curr);
            curr = '';
            continue;
        }
        if (c === '"') {
            quoted = !quoted;
        }
        curr += c;
    }
    curr.trim() && parts.push(curr);
    const qParts = [];
    for (const p of parts) {
        const tokens = p.split(':');
        if (tokens[0] === 'did') {
            author = p;
        }
        else if (tokens[0] === 'author' || tokens[0] === 'from') {
            author = tokens[1];
        }
        else {
            qParts.push(p);
        }
    }
    return {
        q: qParts.join(' '),
        author,
    };
};
exports.parsePostSearchQuery = parsePostSearchQuery;
//# sourceMappingURL=util.js.map
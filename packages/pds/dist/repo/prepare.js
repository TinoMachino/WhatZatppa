"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToOp = exports.deleteWriteToOp = exports.updateWriteToOp = exports.createWriteToOp = exports.prepareDelete = exports.prepareUpdate = exports.prepareCreate = void 0;
const common_1 = require("@atproto/common");
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const explicit_slurs_1 = require("../handle/explicit-slurs");
const index_js_1 = require("../lexicons/index.js");
const types_1 = require("./types");
// @TODO replace this with automatically fetched (& built) schemas
const knownSchemas = new Map([
    index_js_1.app.bsky.actor.profile.main,
    index_js_1.app.bsky.actor.status.main,
    index_js_1.app.bsky.feed.generator.main,
    index_js_1.app.bsky.feed.like.main,
    index_js_1.app.bsky.feed.post.main,
    index_js_1.app.bsky.feed.postgate.main,
    index_js_1.app.bsky.feed.repost.main,
    index_js_1.app.bsky.feed.threadgate.main,
    index_js_1.app.bsky.graph.block.main,
    index_js_1.app.bsky.graph.follow.main,
    index_js_1.app.bsky.graph.list.main,
    index_js_1.app.bsky.graph.listblock.main,
    index_js_1.app.bsky.graph.listitem.main,
    index_js_1.app.bsky.graph.starterpack.main,
    index_js_1.app.bsky.graph.verification.main,
    index_js_1.app.bsky.labeler.service.main,
    index_js_1.app.bsky.notification.declaration.main,
    index_js_1.chat.bsky.actor.declaration.main,
    index_js_1.com.atproto.lexicon.schema.main,
    index_js_1.com.germnetwork.declaration.main,
    index_js_1.com.para.post.main,
    index_js_1.com.para.status.main,
    index_js_1.com.para.social.postMeta.main,
    index_js_1.com.para.civic.position.main,
    index_js_1.com.para.civic.delegation.main,
    index_js_1.com.para.civic.vote.main,
    index_js_1.com.para.civic.cabildeo.main,
    index_js_1.com.para.community.board.main,
    index_js_1.com.para.community.membership.main,
    index_js_1.com.para.community.governance.main,
    index_js_1.com.para.highlight.annotation.main,
].map((schema) => [schema.$type, schema]));
const validateRecord = (record, rkey, opts) => {
    // If validation is explicitly disabled, skip it
    if (opts.validate === false) {
        return undefined;
    }
    // @TODO add support for lexicon resolution to fetch the schema dynamically
    const schema = knownSchemas.get(record.$type);
    if (!schema) {
        // If validation is explicitly requested, throw if unable to validate
        if (opts.validate === true) {
            throw new types_1.InvalidRecordError(`Unknown lexicon type: ${record.$type}`);
        }
        else {
            return 'unknown';
        }
    }
    const rkeyResult = schema.keySchema.safeValidate(rkey);
    if (!rkeyResult.success) {
        throw new types_1.InvalidRecordError(`Invalid record key for ${record.$type}: ${rkeyResult.reason.message}`, { cause: rkeyResult.reason });
    }
    const recordResult = schema.safeValidate(record, {
        path: opts.validationPath ?? ['record'],
    });
    if (!recordResult.success) {
        throw new types_1.InvalidRecordError(`Invalid ${record.$type} record: ${recordResult.reason.message}`, { cause: recordResult.reason });
    }
    return 'valid';
};
const prepareCreate = async (opts) => {
    const { cid, uri, record, blobs, validationStatus } = await prepareWrite(opts);
    return {
        action: repo_1.WriteOpAction.Create,
        uri,
        cid,
        swapCid: opts.swapCid,
        record,
        blobs,
        validationStatus,
    };
};
exports.prepareCreate = prepareCreate;
const prepareUpdate = async (opts) => {
    const { cid, uri, record, blobs, validationStatus } = await prepareWrite(opts);
    return {
        action: repo_1.WriteOpAction.Update,
        uri,
        cid,
        swapCid: opts.swapCid,
        record,
        blobs,
        validationStatus,
    };
};
exports.prepareUpdate = prepareUpdate;
async function prepareWrite(opts) {
    const record = opts.record.$type === undefined
        ? { ...opts.record, $type: opts.collection }
        : opts.record.$type === opts.collection
            ? opts.record
            : null;
    if (!record) {
        throw new types_1.InvalidRecordError(`Invalid $type: expected ${opts.collection}, got ${opts.record.$type}`);
    }
    // @NOTE the rkey will be validated against the schema later
    if (opts.rkey != null) {
        if (!(0, syntax_1.isValidRecordKey)(opts.rkey)) {
            throw new types_1.InvalidRecordError(`Invalid record key: ${opts.rkey}`);
        }
        if ((0, explicit_slurs_1.hasExplicitSlur)(opts.rkey)) {
            throw new types_1.InvalidRecordError('Unacceptable slur in record key');
        }
    }
    const nextRkey = common_1.TID.next();
    const rkey = assertCollectionConstraint({
        did: opts.did,
        collection: opts.collection,
        rkey: opts.rkey,
        record,
    }) ||
        opts.rkey ||
        nextRkey.toString();
    return {
        record,
        // @NOTE we validate before enumerating blobs, so that we can provide more
        // accurate validations error (esp. in case of legacy blobs).
        validationStatus: validateRecord(record, rkey, opts),
        blobs: Array.from((0, lex_data_1.enumBlobRefs)(record, { strict: false, allowLegacy: true }), (blob) => {
            // @NOTE as we migrated from legacy blobs to non legacy blobs, we wanted
            // to prevent the creation of legacy blobs. Note that this prevents the
            // creation of (legitimate) records that have the same shape as legacy
            // blob refs ({ cid: "<cid>", mimeType: "<mime-type>" }), but this was
            // deemed an acceptable tradeoff to prevent the creation of new legacy
            // blobs. Since that migration happened a while ago, we can probably
            // remove this check in the future, by removing the "allowLegacy" option.
            if ((0, lex_data_1.isLegacyBlobRef)(blob)) {
                throw new types_1.InvalidRecordError(`Legacy blobs are not allowed (${blob.cid})`);
            }
            return blob;
        }),
        uri: syntax_1.AtUri.make(opts.did, opts.collection, rkey),
        cid: await (0, lex_data_1.cidForCbor)((0, lex_cbor_1.encode)(record)),
    };
}
const assertCollectionConstraint = (opts) => {
    const { did, collection, rkey, record } = opts;
    if (collection === 'com.para.status') {
        if (rkey && rkey !== 'self') {
            throw new types_1.InvalidRecordError('Invalid com.para.status record key: must be "self"');
        }
        return 'self';
    }
    if (collection === 'com.para.social.postMeta') {
        return assertParaPostMetaRkey({ did, rkey, record });
    }
};
const assertParaPostMetaRkey = (opts) => {
    const post = opts.record.post;
    if (typeof post !== 'string') {
        throw new types_1.InvalidRecordError('Invalid com.para.social.postMeta record: post must be an at-uri');
    }
    let postUri;
    try {
        postUri = new syntax_1.AtUri(post);
    }
    catch {
        throw new types_1.InvalidRecordError('Invalid com.para.social.postMeta record: post must be an at-uri');
    }
    if (postUri.collection !== 'com.para.post') {
        throw new types_1.InvalidRecordError('Invalid com.para.social.postMeta record: post must reference a com.para.post uri');
    }
    if (postUri.hostname !== opts.did) {
        throw new types_1.InvalidRecordError('Invalid com.para.social.postMeta record: post must reference a post in the same repo');
    }
    if (opts.rkey && opts.rkey !== postUri.rkey) {
        throw new types_1.InvalidRecordError('Invalid com.para.social.postMeta record key: must use the rkey of its referenced com.para.post');
    }
    return postUri.rkey;
};
const prepareDelete = (opts) => {
    const { did, collection, rkey, swapCid } = opts;
    return {
        action: repo_1.WriteOpAction.Delete,
        uri: syntax_1.AtUri.make(did, collection, rkey),
        swapCid,
    };
};
exports.prepareDelete = prepareDelete;
const createWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Create,
    collection: write.uri.collectionSafe,
    rkey: write.uri.rkeySafe,
    record: write.record,
});
exports.createWriteToOp = createWriteToOp;
const updateWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Update,
    collection: write.uri.collectionSafe,
    rkey: write.uri.rkeySafe,
    record: write.record,
});
exports.updateWriteToOp = updateWriteToOp;
const deleteWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Delete,
    collection: write.uri.collectionSafe,
    rkey: write.uri.rkeySafe,
});
exports.deleteWriteToOp = deleteWriteToOp;
const writeToOp = (write) => {
    switch (write.action) {
        case repo_1.WriteOpAction.Create:
            return (0, exports.createWriteToOp)(write);
        case repo_1.WriteOpAction.Update:
            return (0, exports.updateWriteToOp)(write);
        case repo_1.WriteOpAction.Delete:
            return (0, exports.deleteWriteToOp)(write);
        default:
            throw new Error(`Unrecognized action: ${write}`);
    }
};
exports.writeToOp = writeToOp;
//# sourceMappingURL=prepare.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordResolutionError = exports.safeFetch = exports.resolveRecord = exports.IdResolver = exports.AtUri = void 0;
exports.buildRecordResolver = buildRecordResolver;
const identity_1 = require("@atproto/identity");
Object.defineProperty(exports, "IdResolver", { enumerable: true, get: function () { return identity_1.IdResolver; } });
const lex_1 = require("@atproto/lex");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
Object.defineProperty(exports, "AtUri", { enumerable: true, get: function () { return syntax_1.AtUri; } });
const fetch_node_1 = require("@atproto-labs/fetch-node");
const index_js_1 = require("./lexicons/index.js");
/**
 * Build a record resolver function.
 */
function buildRecordResolver(options = {}) {
    const { idResolver = new identity_1.IdResolver(), rpc } = options;
    return async function resolveRecord(uriStr, opts = {}) {
        const uri = typeof uriStr === 'string' ? new syntax_1.AtUri(uriStr) : uriStr;
        const did = await getDidFromUri(uri, { idResolver });
        const identityDoc = await idResolver.did
            .ensureResolve(did, opts.forceRefresh)
            .catch((err) => {
            throw new RecordResolutionError('Could not resolve DID identity data', {
                cause: err,
            });
        });
        const { pds, signingKey } = (0, identity_1.parseToAtprotoDocument)(identityDoc);
        if (!pds) {
            throw new RecordResolutionError('Incomplete DID identity data: missing pds');
        }
        if (!signingKey) {
            throw new RecordResolutionError('Incomplete DID identity data: missing signing key');
        }
        const client = new lex_1.Client(typeof rpc === 'function'
            ? { fetchHandler: rpc }
            : {
                ...rpc,
                service: rpc?.service ?? pds,
                fetch: rpc?.fetch ?? exports.safeFetch,
            });
        const proofBytes = await client
            .call(index_js_1.com.atproto.sync.getRecord, {
            did,
            collection: uri.collection,
            rkey: uri.rkey,
        })
            .catch((err) => {
            throw new RecordResolutionError('Could not fetch record proof', {
                cause: err,
            });
        });
        const verified = await verifyRecordProof(proofBytes, {
            uri: syntax_1.AtUri.make(did, uri.collection, uri.rkey),
            signingKey,
        });
        return verified;
    };
}
exports.resolveRecord = buildRecordResolver();
exports.safeFetch = (0, fetch_node_1.safeFetchWrap)({
    allowIpHost: false,
    allowImplicitRedirect: true,
    responseMaxSize: (1024 + 10) * 1024, // 1MB + 10kB, just a bit larger than max record size
});
class RecordResolutionError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'RecordResolutionError';
    }
}
exports.RecordResolutionError = RecordResolutionError;
async function getDidFromUri(uri, { idResolver }) {
    if (lex_1.l.isDidString(uri.host)) {
        return uri.host;
    }
    const resolved = await idResolver.handle.resolve(uri.host);
    if (!resolved || !lex_1.l.isDidString(resolved)) {
        throw new RecordResolutionError('Could not resolve handle found in AT-URI');
    }
    return resolved;
}
async function verifyRecordProof(proofBytes, { uri, signingKey }) {
    const { root, blocks } = await (0, repo_1.readCarWithRoot)(proofBytes).catch((err) => {
        throw new RecordResolutionError('Malformed record proof', { cause: err });
    });
    const blockstore = new repo_1.MemoryBlockstore(blocks);
    const commit = await blockstore.readObj(root, repo_1.def.commit).catch((err) => {
        throw new RecordResolutionError('Invalid commit in record proof', {
            cause: err,
        });
    });
    if (commit.did !== uri.host) {
        throw new RecordResolutionError(`Invalid repo did: ${commit.did}`);
    }
    const validSig = await (0, repo_1.verifyCommitSig)(commit, signingKey);
    if (!validSig) {
        throw new RecordResolutionError(`Invalid signature on commit: ${root.toString()}`);
    }
    const mst = repo_1.MST.load(blockstore, commit.data);
    const cid = await mst.get(`${uri.collection}/${uri.rkey}`);
    if (!cid) {
        throw new RecordResolutionError('Record not found in proof');
    }
    const record = (await blockstore.readRecord(cid));
    return { commit, uri, cid, record };
}
//# sourceMappingURL=record.js.map
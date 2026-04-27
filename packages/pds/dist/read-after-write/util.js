"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMungedResponse = exports.pipethroughReadAfterWrite = exports.getLocalLag = exports.getRepoRev = void 0;
const lex_1 = require("@atproto/lex");
const logger_1 = require("../logger");
const pipethrough_1 = require("../pipethrough");
const REPO_REV_HEADER = 'atproto-repo-rev';
const getRepoRev = (headers) => {
    return headers[REPO_REV_HEADER];
};
exports.getRepoRev = getRepoRev;
const getLocalLag = (local) => {
    let oldest = local.profile?.indexedAt;
    for (const post of local.posts) {
        if (!oldest || post.indexedAt < oldest) {
            oldest = post.indexedAt;
        }
    }
    for (const post of local.paraPosts) {
        if (!oldest || post.indexedAt < oldest) {
            oldest = post.indexedAt;
        }
    }
    if (!oldest)
        return undefined;
    return Date.now() - new Date(oldest).getTime();
};
exports.getLocalLag = getLocalLag;
const pipethroughReadAfterWrite = async (ctx, reqCtx, ns, munge) => {
    const { req, auth } = reqCtx;
    const requester = auth.credentials.did;
    const method = lex_1.l.getMain(ns);
    const streamRes = await (0, pipethrough_1.pipethrough)(ctx, req, { iss: requester });
    const rev = (0, exports.getRepoRev)(streamRes.headers);
    if (!rev)
        return streamRes;
    if ((0, pipethrough_1.isJsonContentType)(streamRes.headers['content-type']) === false) {
        // content-type is present but not JSON, we can't munge this
        return streamRes;
    }
    // if the munging fails, we can't return the original response because the
    // stream will already have been read. If we end-up buffering the response,
    // we'll return the buffered response in case of an error.
    let bufferRes;
    try {
        return await ctx.actorStore.read(requester, async (store) => {
            const local = await store.record.getRecordsSinceRev(rev);
            if (local.count === 0)
                return streamRes;
            const { buffer } = (bufferRes = await (0, pipethrough_1.asPipeThroughBuffer)(streamRes));
            const lex = (0, lex_1.lexParseJsonBytes)(buffer, { strict: false });
            const result = method.output.schema.safeValidate(lex, { strict: false });
            // We won't perform munging with invalid upstream data
            if (!result.success)
                return bufferRes;
            const parsedRes = result.value;
            const localViewer = ctx.localViewer(store);
            const data = await munge(localViewer, parsedRes, local, requester);
            return (0, exports.formatMungedResponse)(data, (0, exports.getLocalLag)(local));
        });
    }
    catch (err) {
        // The error occurred while reading the stream, this is non-recoverable
        if (!bufferRes && !streamRes.stream.readable)
            throw err;
        logger_1.readStickyLogger.warn({ err, requester }, 'error in read after write munge');
        return bufferRes ?? streamRes;
    }
};
exports.pipethroughReadAfterWrite = pipethroughReadAfterWrite;
const formatMungedResponse = (body, lag) => ({
    encoding: 'application/json',
    body,
    headers: lag !== undefined
        ? {
            'Atproto-Upstream-Lag': lag.toString(10),
        }
        : undefined,
});
exports.formatMungedResponse = formatMungedResponse;
//# sourceMappingURL=util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipethroughUpstreamError = exports.PROTECTED_METHODS = exports.PRIVILEGED_METHODS = exports.CHAT_BSKY_METHODS = exports.LxmSet = exports.parseProxyHeader = exports.proxyHandler = void 0;
exports.pipethrough = pipethrough;
exports.computeProxyTo = computeProxyTo;
exports.parseProxyInfo = parseProxyInfo;
exports.isJsonContentType = isJsonContentType;
exports.asPipeThroughBuffer = asPipeThroughBuffer;
exports.normalizeLxm = normalizeLxm;
const node_stream_1 = require("node:stream");
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const xrpc_utils_1 = require("@atproto-labs/xrpc-utils");
const auth_scope_1 = require("./auth-scope");
const index_js_1 = require("./lexicons/index.js");
const logger_1 = require("./logger");
const proxyHandler = (ctx) => {
    const performAuth = ctx.authVerifier.authorization({
        authorize: (permissions, { params }) => permissions.assertRpc(params),
    });
    return async (req, res, next) => {
        // /!\ Hot path
        try {
            if (req.method !== 'GET' &&
                req.method !== 'HEAD' &&
                req.method !== 'POST') {
                throw new xrpc_server_1.XRPCError(xrpc_server_1.ResponseType.InvalidRequest, 'XRPC requests only supports GET and POST');
            }
            const body = req.method === 'POST' ? req : undefined;
            if (body != null && !body.readable) {
                // Body was already consumed by a previous middleware
                throw new xrpc_server_1.InternalServerError('Request body is not readable');
            }
            const lxm = (0, xrpc_server_1.parseReqNsid)(req);
            if (exports.PROTECTED_METHODS.has(lxm)) {
                throw new xrpc_server_1.InvalidRequestError('Bad token method', 'InvalidToken');
            }
            const { url: origin, did: aud } = await parseProxyInfo(ctx, req, lxm);
            const authResult = await performAuth({ req, res, params: { lxm, aud } });
            const { credentials } = (0, xrpc_server_1.excludeErrorResult)(authResult);
            if (credentials.type === 'access' &&
                !(0, auth_scope_1.isAccessPrivileged)(credentials.scope) &&
                exports.PRIVILEGED_METHODS.has(lxm)) {
                throw new xrpc_server_1.InvalidRequestError('Bad token method', 'InvalidToken');
            }
            const headers = {
                'accept-encoding': req.headers['accept-encoding'] || 'identity',
                'accept-language': req.headers['accept-language'],
                'atproto-accept-labelers': req.headers['atproto-accept-labelers'],
                'x-bsky-topics': req.headers['x-bsky-topics'],
                'content-type': body && req.headers['content-type'],
                'content-encoding': body && req.headers['content-encoding'],
                'content-length': body && req.headers['content-length'],
                authorization: `Bearer ${await ctx.serviceAuthJwt(credentials.did, aud, lxm)}`,
            };
            const dispatchOptions = {
                origin,
                method: req.method,
                path: req.originalUrl,
                body,
                headers,
            };
            await pipethroughStream(ctx, req, dispatchOptions, (upstream) => {
                res.status(upstream.statusCode);
                for (const [name, val] of responseHeaders(upstream.headers)) {
                    res.setHeader(name, val);
                }
                // Note that we should not need to manually handle errors here (e.g. by
                // destroying the response), as the http server will handle them for us.
                res.on('error', logResponseError);
                // Tell undici to write the upstream response directly to the response
                return res;
            });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.proxyHandler = proxyHandler;
async function pipethrough(ctx, req, options) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        // pipethrough() is used from within xrpcServer handlers, which means that
        // the request body either has been parsed or is a readable stream that has
        // been piped for decoding & size limiting. Because of this, forwarding the
        // request body requires re-encoding it. Since we currently do not use
        // pipethrough() with procedures, proxying of request body is not
        // implemented.
        throw new xrpc_server_1.InternalServerError(`Proxying of ${req.method} requests is not supported`);
    }
    const lxm = (0, xrpc_server_1.parseReqNsid)(req);
    const { url: origin, did: aud } = await parseProxyInfo(ctx, req, lxm);
    const dispatchOptions = {
        origin,
        method: req.method,
        path: req.originalUrl,
        headers: {
            'accept-language': req.headers['accept-language'],
            'atproto-accept-labelers': req.headers['atproto-accept-labelers'],
            'x-bsky-topics': req.headers['x-bsky-topics'],
            // Because we sometimes need to interpret the response (e.g. during
            // read-after-write, through asPipeThroughBuffer()), we need to ask the
            // upstream server for an encoding that both the requester and the PDS can
            // understand. Since we might have to do the decoding ourselves, we will
            // use our own preferences (and weight) to negotiate the encoding.
            'accept-encoding': (0, xrpc_utils_1.buildProxiedContentEncoding)(req.headers['accept-encoding'], ctx.cfg.proxy.preferCompressed),
            authorization: options?.iss
                ? `Bearer ${await ctx.serviceAuthJwt(options.iss, options.aud ?? aud, options.lxm ?? lxm)}`
                : undefined,
        },
        // Use a high water mark to buffer more data while performing async
        // operations before this stream is consumed. This is especially useful
        // while processing read-after-write operations.
        highWaterMark: 2 * 65536, // twice the default (64KiB)
    };
    const { headers, body } = await pipethroughRequest(ctx, req, dispatchOptions);
    return {
        encoding: safeString(headers['content-type']) ?? 'application/json',
        headers: Object.fromEntries(responseHeaders(headers)),
        stream: body,
    };
}
// Request setup/formatting
// -------------------
function computeProxyTo(ctx, req, lxm) {
    const proxyToHeader = req.header('atproto-proxy');
    if (proxyToHeader)
        return proxyToHeader;
    const service = defaultService(ctx, lxm);
    if (service.serviceInfo) {
        return `${service.serviceInfo.did}#${service.serviceId}`;
    }
    throw new xrpc_server_1.InvalidRequestError(`No service configured for ${lxm}`);
}
async function parseProxyInfo(ctx, req, lxm) {
    // /!\ Hot path
    const proxyToHeader = req.header('atproto-proxy');
    if (proxyToHeader)
        return (0, exports.parseProxyHeader)(ctx, proxyToHeader);
    const { serviceInfo } = defaultService(ctx, lxm);
    if (serviceInfo)
        return serviceInfo;
    throw new xrpc_server_1.InvalidRequestError(`No service configured for ${lxm}`);
}
const parseProxyHeader = async (
// Using subset of AppContext for testing purposes
ctx, proxyTo) => {
    // /!\ Hot path
    const hashIndex = proxyTo.indexOf('#');
    if (hashIndex === 0) {
        throw new xrpc_server_1.InvalidRequestError('no did specified in proxy header');
    }
    if (hashIndex === -1 || hashIndex === proxyTo.length - 1) {
        throw new xrpc_server_1.InvalidRequestError('no service id specified in proxy header');
    }
    // More than one hash
    if (proxyTo.indexOf('#', hashIndex + 1) !== -1) {
        throw new xrpc_server_1.InvalidRequestError('invalid proxy header format');
    }
    // Basic validation
    if (proxyTo.includes(' ')) {
        throw new xrpc_server_1.InvalidRequestError('proxy header cannot contain spaces');
    }
    const did = proxyTo.slice(0, hashIndex);
    // Special case a configured appview, while still proxying correctly any other appview
    if (ctx.cfg.bskyAppView &&
        proxyTo === `${ctx.cfg.bskyAppView.did}#bsky_appview`) {
        return { did, url: ctx.cfg.bskyAppView.url };
    }
    const didDoc = await ctx.idResolver.did.resolve(did);
    if (!didDoc) {
        throw new xrpc_server_1.InvalidRequestError('could not resolve proxy did');
    }
    const serviceId = proxyTo.slice(hashIndex);
    const url = (0, common_1.getServiceEndpoint)(didDoc, { id: serviceId });
    if (!url) {
        throw new xrpc_server_1.InvalidRequestError('could not resolve proxy did service url');
    }
    return { did, url };
};
exports.parseProxyHeader = parseProxyHeader;
/**
 * Utility function that wraps the undici stream() function and handles request
 * and response errors by wrapping them in XRPCError instances. This function is
 * more efficient than "pipethroughRequest" when a writable stream to pipe the
 * upstream response to is available.
 */
async function pipethroughStream(ctx, req, dispatchOptions, successStreamFactory) {
    return new Promise((resolve, reject) => {
        void ctx.proxyAgent
            .stream(dispatchOptions, (upstream) => {
            if (upstream.statusCode >= 400) {
                const passThrough = new node_stream_1.PassThrough();
                void tryParsingError(upstream.headers, passThrough).then((parsed) => {
                    const xrpcError = new PipethroughUpstreamError(upstream, parsed, {
                        cause: dispatchOptions,
                    });
                    reject(xrpcError);
                }, reject);
                return passThrough;
            }
            const writable = successStreamFactory(upstream);
            // As soon as the control was passed to the writable stream (i.e. by
            // returning the writable hereafter), pipethroughStream() is considered
            // to have succeeded. Any error occurring while writing upstream data to
            // the writable stream should be handled through the stream's error
            // state (i.e. successStreamFactory() must ensure that error events on
            // the returned writable will be handled).
            resolve();
            return writable;
        })
            // The following catch block will be triggered with either network errors
            // or writable stream errors. In the latter case, the promise will already
            // be resolved, and reject()ing it there after will have no effect. Those
            // error would still be logged by the successStreamFactory() function.
            .catch(handleUpstreamRequestError.bind(req))
            .catch(reject);
    });
}
/**
 * Utility function that wraps the undici request() function and handles request
 * and response errors by wrapping them in XRPCError instances.
 */
async function pipethroughRequest(ctx, req, dispatchOptions) {
    // HandlerPipeThroughStream requires a readable stream to be returned, so we
    // use the (less efficient) request() function instead.
    const upstream = await ctx.proxyAgent
        .request(dispatchOptions)
        .catch(handleUpstreamRequestError.bind(req));
    if (upstream.statusCode >= 400) {
        const parsed = await tryParsingError(upstream.headers, upstream.body);
        throw new PipethroughUpstreamError(upstream, parsed, {
            cause: dispatchOptions,
        });
    }
    return upstream;
}
function handleUpstreamRequestError(err, message = 'Upstream service unreachable') {
    const logger = isPinoHttpRequest(this) ? this.log : logger_1.httpLogger;
    logger.error({ err }, message);
    throw new xrpc_server_1.XRPCError(xrpc_server_1.ResponseType.UpstreamFailure, message, undefined, {
        cause: err,
    });
}
function isPinoHttpRequest(req) {
    return typeof req.log?.error === 'function';
}
// Request parsing/forwarding
// -------------------
function isJsonContentType(contentType) {
    if (!contentType)
        return undefined;
    return /application\/(?:\w+\+)?json/i.test(contentType);
}
async function tryParsingError(headers, readable) {
    if (isJsonContentType(headers['content-type']) === false) {
        // We don't known how to parse non JSON content types so we can discard the
        // whole response.
        // Since we don't care about the response, we would normally just destroy
        // the stream. However, if the underlying HTTP connection is an HTTP/1.1
        // connection, this also destroys the underlying (keep-alive) TCP socket. In
        // order to avoid destroying the TCP socket, while avoiding the cost of
        // consuming too much IO, we give it a chance to finish first.
        // @NOTE we need to listen (and ignore) "error" events, otherwise the
        // process could crash (since we drain the stream asynchronously here). This
        // is performed through the "finished" call below.
        const to = setTimeout(() => {
            readable.destroy();
        }, 100);
        (0, node_stream_1.finished)(readable, (_err) => {
            clearTimeout(to);
        });
        readable.resume();
        return {};
    }
    try {
        const buffer = await bufferUpstreamResponse(readable, headers['content-encoding']);
        const errInfo = JSON.parse(buffer.toString('utf8'));
        return {
            error: safeString(errInfo?.['error']),
            message: safeString(errInfo?.['message']),
        };
    }
    catch (err) {
        // Failed to read, decode, buffer or parse. No big deal.
        return {};
    }
}
async function bufferUpstreamResponse(readable, contentEncoding) {
    try {
        return await (0, common_1.streamToNodeBuffer)((0, common_1.decodeStream)(readable, contentEncoding));
    }
    catch (err) {
        if (!readable.destroyed)
            readable.destroy();
        throw new xrpc_server_1.XRPCError(xrpc_server_1.ResponseType.UpstreamFailure, err instanceof TypeError ? err.message : 'unable to decode request body', undefined, { cause: err });
    }
}
async function asPipeThroughBuffer(input) {
    return {
        buffer: await bufferUpstreamResponse(input.stream, input.headers?.['content-encoding']),
        headers: (0, common_1.omit)(input.headers, ['content-encoding', 'content-length']),
        encoding: input.encoding,
    };
}
// Response parsing/forwarding
// -------------------
const RES_HEADERS_TO_FORWARD = [
    'atproto-repo-rev',
    'atproto-content-labelers',
    'retry-after',
];
function* responseHeaders(headers, includeContentHeaders = true) {
    if (includeContentHeaders) {
        const length = headers['content-length'];
        if (length)
            yield ['content-length', length];
        const encoding = headers['content-encoding'];
        if (encoding)
            yield ['content-encoding', encoding];
        const type = headers['content-type'];
        if (type)
            yield ['content-type', type];
        const language = headers['content-language'];
        if (language)
            yield ['content-language', language];
    }
    for (let i = 0; i < RES_HEADERS_TO_FORWARD.length; i++) {
        const name = RES_HEADERS_TO_FORWARD[i];
        const val = headers[name];
        if (val != null) {
            const value = Array.isArray(val) ? val.join(',') : val;
            yield [name, value];
        }
    }
}
// Utils
// -------------------
/**
 * Performs lexicon method matching on a set of methods,
 * taking into account that they are treated case-insensitively.
 */
class LxmSet {
    constructor(items) {
        Object.defineProperty(this, "inner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "original", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inner = new Set(Array.from(items, normalizeLxm));
        this.original = items;
    }
    has(lxm) {
        return this.inner.has(normalizeLxm(lxm));
    }
    *[Symbol.iterator]() {
        yield* this.original;
    }
}
exports.LxmSet = LxmSet;
function normalizeLxm(lxm) {
    return lxm.toLowerCase();
}
exports.CHAT_BSKY_METHODS = new LxmSet([
    index_js_1.chat.bsky.actor.deleteAccount.$lxm,
    index_js_1.chat.bsky.actor.exportAccountData.$lxm,
    index_js_1.chat.bsky.convo.deleteMessageForSelf.$lxm,
    index_js_1.chat.bsky.convo.getConvo.$lxm,
    index_js_1.chat.bsky.convo.getConvoForMembers.$lxm,
    index_js_1.chat.bsky.convo.getLog.$lxm,
    index_js_1.chat.bsky.convo.getMessages.$lxm,
    index_js_1.chat.bsky.convo.leaveConvo.$lxm,
    index_js_1.chat.bsky.convo.listConvos.$lxm,
    index_js_1.chat.bsky.convo.muteConvo.$lxm,
    index_js_1.chat.bsky.convo.sendMessage.$lxm,
    index_js_1.chat.bsky.convo.sendMessageBatch.$lxm,
    index_js_1.chat.bsky.convo.unmuteConvo.$lxm,
    index_js_1.chat.bsky.convo.updateRead.$lxm,
]);
exports.PRIVILEGED_METHODS = new LxmSet([
    ...exports.CHAT_BSKY_METHODS,
    index_js_1.com.atproto.server.createAccount.$lxm,
]);
// These endpoints are related to account management and must be used directly,
// not proxied or service-authed. Service auth may be utilized between PDS and
// entryway for these methods.
exports.PROTECTED_METHODS = new LxmSet([
    index_js_1.com.atproto.admin.sendEmail.$lxm,
    index_js_1.com.atproto.identity.requestPlcOperationSignature.$lxm,
    index_js_1.com.atproto.identity.signPlcOperation.$lxm,
    index_js_1.com.atproto.identity.updateHandle.$lxm,
    index_js_1.com.atproto.server.activateAccount.$lxm,
    index_js_1.com.atproto.server.confirmEmail.$lxm,
    index_js_1.com.atproto.server.createAppPassword.$lxm,
    index_js_1.com.atproto.server.deactivateAccount.$lxm,
    index_js_1.com.atproto.server.getAccountInviteCodes.$lxm,
    index_js_1.com.atproto.server.getSession.$lxm,
    index_js_1.com.atproto.server.listAppPasswords.$lxm,
    index_js_1.com.atproto.server.requestAccountDelete.$lxm,
    index_js_1.com.atproto.server.requestEmailConfirmation.$lxm,
    index_js_1.com.atproto.server.requestEmailUpdate.$lxm,
    index_js_1.com.atproto.server.revokeAppPassword.$lxm,
    index_js_1.com.atproto.server.updateEmail.$lxm,
]);
const defaultService = (ctx, nsid) => {
    switch (nsid) {
        case index_js_1.tools.ozone.communication.createTemplate.$lxm:
        case index_js_1.tools.ozone.communication.deleteTemplate.$lxm:
        case index_js_1.tools.ozone.communication.listTemplates.$lxm:
        case index_js_1.tools.ozone.communication.updateTemplate.$lxm:
        case index_js_1.tools.ozone.moderation.cancelScheduledActions.$lxm:
        case index_js_1.tools.ozone.moderation.emitEvent.$lxm:
        case index_js_1.tools.ozone.moderation.getAccountTimeline.$lxm:
        case index_js_1.tools.ozone.moderation.getEvent.$lxm:
        case index_js_1.tools.ozone.moderation.getRecord.$lxm:
        case index_js_1.tools.ozone.moderation.getRepo.$lxm:
        case index_js_1.tools.ozone.moderation.listScheduledActions.$lxm:
        case index_js_1.tools.ozone.moderation.queryEvents.$lxm:
        case index_js_1.tools.ozone.moderation.queryStatuses.$lxm:
        case index_js_1.tools.ozone.moderation.scheduleAction.$lxm:
        case index_js_1.tools.ozone.moderation.searchRepos.$lxm:
        case index_js_1.tools.ozone.safelink.addRule.$lxm:
        case index_js_1.tools.ozone.safelink.queryEvents.$lxm:
        case index_js_1.tools.ozone.safelink.queryRules.$lxm:
        case index_js_1.tools.ozone.safelink.removeRule.$lxm:
        case index_js_1.tools.ozone.safelink.updateRule.$lxm:
        case index_js_1.tools.ozone.team.addMember.$lxm:
        case index_js_1.tools.ozone.team.deleteMember.$lxm:
        case index_js_1.tools.ozone.team.listMembers.$lxm:
        case index_js_1.tools.ozone.team.updateMember.$lxm:
        case index_js_1.tools.ozone.verification.grantVerifications.$lxm:
        case index_js_1.tools.ozone.verification.listVerifications.$lxm:
        case index_js_1.tools.ozone.verification.revokeVerifications.$lxm:
            return {
                serviceId: 'atproto_labeler',
                serviceInfo: ctx.cfg.modService,
            };
        case index_js_1.com.atproto.moderation.createReport.$lxm:
            return {
                serviceId: 'atproto_labeler',
                serviceInfo: ctx.cfg.reportService,
            };
        default:
            return {
                serviceId: 'bsky_appview',
                serviceInfo: ctx.cfg.bskyAppView,
            };
    }
};
const safeString = (str) => {
    return typeof str === 'string' ? str : undefined;
};
function logResponseError(err) {
    logger_1.httpLogger.warn({ err }, 'error forwarding upstream response');
}
class PipethroughUpstreamError extends xrpc_server_1.XRPCError {
    constructor(upstream, payload, options) {
        const status = upstream.statusCode === 500
            ? xrpc_server_1.ResponseType.UpstreamFailure
            : upstream.statusCode;
        super(status, payload.message, payload.error, options);
        Object.defineProperty(this, "upstream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: upstream
        });
    }
    get headers() {
        return Object.fromEntries(responseHeaders(this.upstream.headers, false));
    }
    get error() {
        return this.customErrorName ?? this.typeName;
    }
}
exports.PipethroughUpstreamError = PipethroughUpstreamError;
//# sourceMappingURL=pipethrough.js.map
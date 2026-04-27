"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BskyAppView = exports.Redis = exports.Database = exports.BackgroundQueue = exports.AppContext = exports.ServerConfig = void 0;
const node_events_1 = __importDefault(require("node:events"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const etcd3_1 = require("etcd3");
const express_1 = __importDefault(require("express"));
const http_terminator_1 = require("http-terminator");
const common_1 = require("@atproto/common");
const identity_1 = require("@atproto/identity");
const lex_1 = require("@atproto/lex");
const xrpc_server_1 = require("@atproto/xrpc-server");
const api_1 = __importStar(require("./api"));
const blob_dispatcher_1 = require("./api/blob-dispatcher");
const auth_verifier_1 = require("./auth-verifier");
const bsync_1 = require("./bsync");
const context_1 = require("./context");
const courier_1 = require("./courier");
const client_1 = require("./data-plane/client");
const error = __importStar(require("./error"));
const index_1 = require("./feature-gates/index");
const hydrator_1 = require("./hydration/hydrator");
const imageServer = __importStar(require("./image/server"));
const uri_1 = require("./image/uri");
const kws_1 = require("./kws");
const logger_1 = require("./logger");
const rolodex_1 = require("./rolodex");
const stash_1 = require("./stash");
const views_1 = require("./views");
const util_1 = require("./views/util");
var config_1 = require("./config");
Object.defineProperty(exports, "ServerConfig", { enumerable: true, get: function () { return config_1.ServerConfig; } });
var context_2 = require("./context");
Object.defineProperty(exports, "AppContext", { enumerable: true, get: function () { return context_2.AppContext; } });
__exportStar(require("./data-plane"), exports);
var background_1 = require("./data-plane/server/background");
Object.defineProperty(exports, "BackgroundQueue", { enumerable: true, get: function () { return background_1.BackgroundQueue; } });
var db_1 = require("./data-plane/server/db");
Object.defineProperty(exports, "Database", { enumerable: true, get: function () { return db_1.Database; } });
var redis_1 = require("./redis");
Object.defineProperty(exports, "Redis", { enumerable: true, get: function () { return redis_1.Redis; } });
class BskyAppView {
    constructor(opts) {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "terminator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ctx = opts.ctx;
        this.app = opts.app;
    }
    static create(opts) {
        const { config, signingKey } = opts;
        const app = (0, express_1.default)();
        app.set('trust proxy', true);
        app.use((0, cors_1.default)({ maxAge: common_1.DAY / common_1.SECOND }));
        app.use(logger_1.loggerMiddleware);
        app.use((0, compression_1.default)());
        // used solely for handle resolution: identity lookups occur on dataplane
        const idResolver = new identity_1.IdResolver({
            plcUrl: config.didPlcUrl,
            backupNameservers: config.handleResolveNameservers,
        });
        const imgUriBuilderUrl = config.cdnUrl ||
            (config.publicUrl ? `${config.publicUrl}/img` : undefined);
        if (!imgUriBuilderUrl) {
            throw new Error('No image URI builder URL could be determined');
        }
        const imgUriBuilder = new uri_1.ImageUriBuilder(imgUriBuilderUrl);
        const videoUriBuilder = new util_1.VideoUriBuilder({
            playlistUrlPattern: config.videoPlaylistUrlPattern ||
                `${config.publicUrl}/vid/%s/%s/playlist.m3u8`,
            thumbnailUrlPattern: config.videoThumbnailUrlPattern ||
                `${config.publicUrl}/vid/%s/%s/thumbnail.jpg`,
        });
        const searchClient = config.searchUrl
            ? new lex_1.Client({
                service: config.searchUrl,
            }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: config.debugMode,
            })
            : undefined;
        const suggestionsClient = config.suggestionsUrl
            ? new lex_1.Client({
                service: config.suggestionsUrl,
                headers: config.suggestionsApiKey
                    ? { authorization: `Bearer ${config.suggestionsApiKey}` }
                    : undefined,
            }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: config.debugMode,
            })
            : undefined;
        const topicsClient = config.topicsUrl
            ? new lex_1.Client({
                service: config.topicsUrl,
                headers: config.topicsApiKey
                    ? { authorization: `Bearer ${config.topicsApiKey}` }
                    : undefined,
            }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: config.debugMode,
            })
            : undefined;
        const etcd = config.etcdHosts.length
            ? new etcd3_1.Etcd3({ hosts: config.etcdHosts })
            : undefined;
        const dataplaneHostList = etcd && config.dataplaneUrlsEtcdKeyPrefix
            ? new client_1.EtcdHostList(etcd, config.dataplaneUrlsEtcdKeyPrefix, config.dataplaneUrls)
            : new client_1.BasicHostList(config.dataplaneUrls);
        const featureGatesClient = new index_1.FeatureGatesClient({
            growthBookApiHost: config.growthBookApiHost,
            growthBookClientKey: config.growthBookClientKey,
            eventProxyTrackingEndpoint: config.eventProxyTrackingEndpoint,
        });
        const dataplane = (0, client_1.createDataPlaneClient)(dataplaneHostList, {
            httpVersion: config.dataplaneHttpVersion,
            rejectUnauthorized: !config.dataplaneIgnoreBadTls,
        });
        const hydrator = new hydrator_1.Hydrator(dataplane, config.labelsFromIssuerDids, {
            debugFieldAllowedDids: config.debugFieldAllowedDids,
            featureGatesClient,
        });
        const views = new views_1.Views({
            imgUriBuilder: imgUriBuilder,
            videoUriBuilder: videoUriBuilder,
            indexedAtEpoch: config.indexedAtEpoch,
            threadTagsBumpDown: [...config.threadTagsBumpDown],
            threadTagsHide: [...config.threadTagsHide],
            visibilityTagHide: config.visibilityTagHide,
            visibilityTagRankPrefix: config.visibilityTagRankPrefix,
        });
        const bsyncClient = (0, bsync_1.createBsyncClient)({
            baseUrl: config.bsyncUrl,
            httpVersion: config.bsyncHttpVersion ?? '2',
            nodeOptions: { rejectUnauthorized: !config.bsyncIgnoreBadTls },
            interceptors: config.bsyncApiKey ? [(0, bsync_1.authWithApiKey)(config.bsyncApiKey)] : [],
        });
        const stashClient = (0, stash_1.createStashClient)(bsyncClient);
        const courierClient = config.courierUrl
            ? (0, courier_1.createCourierClient)({
                baseUrl: config.courierUrl,
                httpVersion: config.courierHttpVersion ?? '2',
                nodeOptions: { rejectUnauthorized: !config.courierIgnoreBadTls },
                interceptors: config.courierApiKey
                    ? [(0, courier_1.authWithApiKey)(config.courierApiKey)]
                    : [],
            })
            : undefined;
        const rolodexClient = config.rolodexUrl
            ? (0, rolodex_1.createRolodexClient)({
                baseUrl: config.rolodexUrl,
                httpVersion: config.rolodexHttpVersion ?? '2',
                nodeOptions: { rejectUnauthorized: !config.rolodexIgnoreBadTls },
                interceptors: config.rolodexApiKey
                    ? [(0, rolodex_1.authWithApiKey)(config.rolodexApiKey)]
                    : [],
            })
            : undefined;
        const kwsClient = config.kws ? (0, kws_1.createKwsClient)(config.kws) : undefined;
        const entrywayJwtPublicKey = config.entrywayJwtPublicKeyHex
            ? (0, auth_verifier_1.createPublicKeyObject)(config.entrywayJwtPublicKeyHex)
            : undefined;
        const authVerifier = new auth_verifier_1.AuthVerifier(dataplane, {
            ownDid: config.serverDid,
            alternateAudienceDids: config.alternateAudienceDids,
            modServiceDid: config.modServiceDid,
            adminPasses: config.adminPasswords,
            entrywayJwtPublicKey,
        });
        const blobDispatcher = (0, blob_dispatcher_1.createBlobDispatcher)(config);
        const ctx = new context_1.AppContext({
            cfg: config,
            etcd,
            dataplane,
            dataplaneHostList,
            searchClient,
            suggestionsClient,
            topicsClient,
            hydrator,
            views,
            signingKey,
            idResolver,
            bsyncClient,
            stashClient,
            courierClient,
            rolodexClient,
            authVerifier,
            featureGatesClient,
            blobDispatcher,
            kwsClient,
        });
        const server = (0, xrpc_server_1.createServer)([], {
            validateResponse: config.debugMode,
            payload: {
                jsonLimit: 100 * 1024, // 100kb
                textLimit: 100 * 1024, // 100kb
                blobLimit: 5 * 1024 * 1024, // 5mb
            },
        });
        (0, api_1.default)(server, ctx);
        app.use(api_1.health.createRouter(ctx));
        app.use(api_1.wellKnown.createRouter(ctx));
        app.use(api_1.blobResolver.createMiddleware(ctx));
        app.use(imageServer.createMiddleware(ctx, { prefix: '/img/' }));
        if (config.dataplaneUrls.length > 0 || config.dataplaneUrlsEtcdKeyPrefix) {
            app.use(api_1.sitemap.createRouter(ctx));
        }
        app.use(server.router);
        app.use(error.handler);
        app.use('/external', api_1.external.createRouter(ctx));
        return new BskyAppView({ ctx, app });
    }
    async start() {
        if (this.ctx.dataplaneHostList instanceof client_1.EtcdHostList) {
            await this.ctx.dataplaneHostList.connect();
        }
        this.ctx.featureGatesClient.start(); // lazy, no await
        const server = this.app.listen(this.ctx.cfg.port);
        this.server = server;
        server.keepAliveTimeout = 90000;
        this.terminator = (0, http_terminator_1.createHttpTerminator)({ server });
        await node_events_1.default.once(server, 'listening');
        const { port } = server.address();
        this.ctx.cfg.assignPort(port);
        return server;
    }
    async destroy() {
        this.ctx.featureGatesClient.destroy();
        await this.terminator?.terminate();
        await this.ctx.etcd?.close();
    }
}
exports.BskyAppView = BskyAppView;
exports.default = BskyAppView;
//# sourceMappingURL=index.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const plc = __importStar(require("@did-plc/lib"));
const nodemailer = __importStar(require("nodemailer"));
const ui8 = __importStar(require("uint8arrays"));
const undici = __importStar(require("undici"));
const aws_1 = require("@atproto/aws");
const crypto = __importStar(require("@atproto/crypto"));
const identity_1 = require("@atproto/identity");
const lex_1 = require("@atproto/lex");
const oauth_provider_1 = require("@atproto/oauth-provider");
const xrpc_server_1 = require("@atproto/xrpc-server");
const fetch_node_1 = require("@atproto-labs/fetch-node");
const account_manager_1 = require("./account-manager/account-manager");
const oauth_store_1 = require("./account-manager/oauth-store");
const scope_reference_getter_1 = require("./account-manager/scope-reference-getter");
const actor_store_1 = require("./actor-store/actor-store");
const proxy_1 = require("./api/proxy");
const auth_verifier_1 = require("./auth-verifier");
const background_1 = require("./background");
const bsky_app_view_1 = require("./bsky-app-view");
const crawlers_1 = require("./crawlers");
const did_cache_1 = require("./did-cache");
const disk_blobstore_1 = require("./disk-blobstore");
const image_url_builder_1 = require("./image/image-url-builder");
const logger_1 = require("./logger");
const mailer_1 = require("./mailer");
const moderation_1 = require("./mailer/moderation");
const viewer_1 = require("./read-after-write/viewer");
const redis_1 = require("./redis");
const sequencer_1 = require("./sequencer");
class AppContext {
    constructor(opts) {
        Object.defineProperty(this, "actorStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "blobstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mailer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "moderationMailer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "didCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plcClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sequencer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redisScratch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "crawlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bskyAppView", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "moderationClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reportingClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entrywayClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entrywayAdminClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "proxyAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "safeFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authVerifier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "oauthProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plcRotationKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.actorStore = opts.actorStore;
        this.blobstore = opts.blobstore;
        this.localViewer = opts.localViewer;
        this.mailer = opts.mailer;
        this.moderationMailer = opts.moderationMailer;
        this.didCache = opts.didCache;
        this.idResolver = opts.idResolver;
        this.plcClient = opts.plcClient;
        this.accountManager = opts.accountManager;
        this.sequencer = opts.sequencer;
        this.backgroundQueue = opts.backgroundQueue;
        this.redisScratch = opts.redisScratch;
        this.crawlers = opts.crawlers;
        this.bskyAppView = opts.bskyAppView;
        this.moderationClient = opts.moderationClient;
        this.reportingClient = opts.reportingClient;
        this.entrywayClient = opts.entrywayClient;
        this.entrywayAdminClient = opts.entrywayAdminClient;
        this.proxyAgent = opts.proxyAgent;
        this.safeFetch = opts.safeFetch;
        this.authVerifier = opts.authVerifier;
        this.oauthProvider = opts.oauthProvider;
        this.plcRotationKey = opts.plcRotationKey;
        this.cfg = opts.cfg;
    }
    static async fromConfig(cfg, secrets, overrides) {
        const blobstore = cfg.blobstore.provider === 's3'
            ? aws_1.S3BlobStore.creator({
                bucket: cfg.blobstore.bucket,
                region: cfg.blobstore.region,
                endpoint: cfg.blobstore.endpoint,
                forcePathStyle: cfg.blobstore.forcePathStyle,
                credentials: cfg.blobstore.credentials,
                uploadTimeoutMs: cfg.blobstore.uploadTimeoutMs,
            })
            : disk_blobstore_1.DiskBlobStore.creator(cfg.blobstore.location, cfg.blobstore.tempLocation);
        const mailTransport = cfg.email !== null
            ? nodemailer.createTransport(cfg.email.smtpUrl)
            : nodemailer.createTransport({ jsonTransport: true });
        const mailer = new mailer_1.ServerMailer(mailTransport, cfg);
        const modMailTransport = cfg.moderationEmail !== null
            ? nodemailer.createTransport(cfg.moderationEmail.smtpUrl)
            : nodemailer.createTransport({ jsonTransport: true });
        const moderationMailer = new moderation_1.ModerationMailer(modMailTransport, cfg);
        const didCache = new did_cache_1.DidSqliteCache(cfg.db.didCacheDbLoc, cfg.identity.cacheStaleTTL, cfg.identity.cacheMaxTTL, cfg.db.disableWalAutoCheckpoint);
        await didCache.migrateOrThrow();
        const idResolver = new identity_1.IdResolver({
            plcUrl: cfg.identity.plcUrl,
            didCache,
            timeout: cfg.identity.resolverTimeout,
            backupNameservers: cfg.identity.handleBackupNameservers,
        });
        const plcClient = new plc.Client(cfg.identity.plcUrl);
        const backgroundQueue = new background_1.BackgroundQueue();
        const crawlers = new crawlers_1.Crawlers(backgroundQueue, cfg.service.hostname, cfg.crawlers);
        const sequencer = new sequencer_1.Sequencer(cfg.db.sequencerDbLoc, crawlers, undefined, cfg.db.disableWalAutoCheckpoint);
        const redisScratch = cfg.redis
            ? (0, redis_1.getRedisClient)(cfg.redis.address, cfg.redis.password)
            : undefined;
        const bskyAppView = cfg.bskyAppView
            ? new bsky_app_view_1.BskyAppView({
                ...cfg.bskyAppView,
                validateResponse: cfg.service.devMode,
            })
            : undefined;
        const moderationClient = cfg.modService
            ? new lex_1.Client({ service: cfg.modService.url }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: cfg.service.devMode,
            })
            : undefined;
        const reportingClient = cfg.reportService
            ? new lex_1.Client({ service: cfg.reportService.url }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: cfg.service.devMode,
            })
            : undefined;
        const entrywayClient = cfg.entryway
            ? new lex_1.Client({ service: cfg.entryway.url }, {
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: cfg.service.devMode,
            })
            : undefined;
        const entrywayAdminClient = cfg.entryway && secrets.entrywayAdminToken
            ? new lex_1.Client({ service: cfg.entryway.url }, {
                headers: {
                    authorization: basicAuthHeader('admin', secrets.entrywayAdminToken),
                },
                // Trust internal services to send us well-formed responses
                strictResponseProcessing: false,
                validateResponse: cfg.service.devMode,
            })
            : undefined;
        const jwtSecretKey = (0, auth_verifier_1.createSecretKeyObject)(secrets.jwtSecret);
        const jwtPublicKey = cfg.entryway
            ? (0, auth_verifier_1.createPublicKeyObject)(cfg.entryway.jwtPublicKeyHex)
            : null;
        const imageUrlBuilder = new image_url_builder_1.ImageUrlBuilder(cfg.service.hostname, bskyAppView);
        const actorStore = new actor_store_1.ActorStore(cfg.actorStore, {
            blobstore,
            backgroundQueue,
        });
        const accountManager = new account_manager_1.AccountManager(idResolver, jwtSecretKey, cfg.service.did, cfg.identity.serviceHandleDomains, cfg.db);
        await accountManager.migrateOrThrow();
        const plcRotationKey = secrets.plcRotationKey.provider === 'kms'
            ? await aws_1.KmsKeypair.load({
                keyId: secrets.plcRotationKey.keyId,
            })
            : await crypto.Secp256k1Keypair.import(secrets.plcRotationKey.privateKeyHex);
        const localViewer = viewer_1.LocalViewer.creator(accountManager, imageUrlBuilder, bskyAppView);
        // An agent for performing HTTP requests based on user provided URLs.
        const proxyAgentBase = new undici.Agent({
            allowH2: cfg.proxy.allowHTTP2, // This is experimental
            headersTimeout: cfg.proxy.headersTimeout,
            maxResponseSize: cfg.proxy.maxResponseSize,
            bodyTimeout: cfg.proxy.bodyTimeout,
            factory: cfg.proxy.disableSsrfProtection
                ? undefined
                : (origin, opts) => {
                    const { protocol, hostname } = origin instanceof URL ? origin : new URL(origin);
                    if (protocol !== 'https:') {
                        throw new Error(`Forbidden protocol "${protocol}"`);
                    }
                    if ((0, fetch_node_1.isUnicastIp)(hostname) === false) {
                        throw new Error('Hostname resolved to non-unicast address');
                    }
                    return new undici.Pool(origin, opts);
                },
            connect: {
                lookup: cfg.proxy.disableSsrfProtection ? undefined : fetch_node_1.unicastLookup,
            },
        });
        const proxyAgent = cfg.proxy.maxRetries > 0
            ? new undici.RetryAgent(proxyAgentBase, {
                statusCodes: [], // Only retry on socket errors
                methods: ['GET', 'HEAD'],
                maxRetries: cfg.proxy.maxRetries,
            })
            : proxyAgentBase;
        /**
         * A fetch() function that protects against SSRF attacks, large responses &
         * known bad domains. This function can safely be used to fetch user
         * provided URLs (unless "disableSsrfProtection" is true, of course).
         *
         * @note **DO NOT** wrap `safeFetch` with any logging or other transforms as
         * this might prevent the use of explicit `redirect: "follow"` init from
         * working. See {@link safeFetchWrap}.
         */
        const safeFetch = (0, fetch_node_1.safeFetchWrap)({
            allowIpHost: false,
            allowImplicitRedirect: false,
            responseMaxSize: cfg.fetch.maxResponseSize,
            ssrfProtection: !cfg.fetch.disableSsrfProtection,
            // @NOTE Since we are using NodeJS <= 20, unicastFetchWrap would normally
            // *not* be using a keep-alive agent if it we are providing a fetch
            // function that is different from `globalThis.fetch`. However, since the
            // fetch function below is indeed calling `globalThis.fetch` without
            // altering any argument, we can safely force the use of the keep-alive
            // agent. This would not be the case if we used "loggedFetch" as that
            // function does wrap the input & init arguments into a Request object,
            // which, on NodeJS<=20, results in init.dispatcher *not* being used.
            dangerouslyForceKeepAliveAgent: true,
            fetch: function (input, init) {
                const method = init?.method ?? (input instanceof Request ? input.method : 'GET');
                const uri = input instanceof Request ? input.url : String(input);
                logger_1.fetchLogger.info({ method, uri }, 'fetch');
                return globalThis.fetch.call(this, input, init);
            },
        });
        const oauthProvider = cfg.oauth.provider
            ? new oauth_provider_1.OAuthProvider({
                issuer: cfg.oauth.issuer,
                keyset: [await oauth_provider_1.JoseKey.fromKeyLike(jwtSecretKey, undefined, 'HS256')],
                store: new oauth_store_1.OAuthStore(accountManager, actorStore, imageUrlBuilder, backgroundQueue, mailer, sequencer, plcClient, plcRotationKey, cfg.service.publicUrl, cfg.identity.recoveryDidKey),
                redis: redisScratch,
                dpopSecret: secrets.dpopSecret,
                inviteCodeRequired: cfg.invites.required,
                availableUserDomains: cfg.identity.serviceHandleDomains,
                hcaptcha: cfg.oauth.provider.hcaptcha,
                branding: cfg.oauth.provider.branding,
                safeFetch,
                lexResolver: new oauth_provider_1.LexResolver({
                    fetch: safeFetch,
                    plcDirectoryUrl: cfg.identity.plcUrl,
                    hooks: {
                        onResolveAuthority: ({ nsid }) => {
                            logger_1.lexiconResolverLogger.debug({ nsid: nsid.toString() }, 'Resolving lexicon DID authority');
                            // Override the lexicon did resolution to point to a custom PDS
                            return cfg.lexicon.didAuthority;
                        },
                        onResolveAuthorityResult({ nsid, did }) {
                            logger_1.lexiconResolverLogger.info({ nsid: nsid.toString(), did }, 'Resolved lexicon DID');
                        },
                        onResolveAuthorityError({ nsid, err }) {
                            logger_1.lexiconResolverLogger.error({ nsid: nsid.toString(), err }, 'Lexicon DID resolution error');
                        },
                        onFetchResult({ uri, cid }) {
                            logger_1.lexiconResolverLogger.info({ uri: uri.toString(), cid: cid.toString() }, 'Fetched lexicon');
                        },
                        onFetchError({ err, uri }) {
                            logger_1.lexiconResolverLogger.error({ uri: uri.toString(), err }, 'Lexicon fetch error');
                        },
                    },
                }),
                metadata: {
                    protected_resources: [new URL(cfg.oauth.issuer).origin],
                },
                // If the PDS is both an authorization server & resource server (no
                // entryway), we can afford to check the token validity on every
                // request. This allows revoked tokens to be rejected immediately.
                // This also allows JWT to be shorter since some claims (notably the
                // "scope" claim) do not need to be included in the token.
                accessTokenMode: oauth_provider_1.AccessTokenMode.stateful,
                getClientInfo(clientId) {
                    return {
                        isTrusted: cfg.oauth.provider?.trustedClients?.includes(clientId),
                    };
                },
            })
            : undefined;
        const scopeRefGetter = entrywayClient
            ? new scope_reference_getter_1.ScopeReferenceGetter(entrywayClient, redisScratch)
            : undefined;
        const oauthVerifier = oauthProvider ?? // OAuthProvider extends OAuthVerifier
            new oauth_provider_1.OAuthVerifier({
                issuer: cfg.oauth.issuer,
                keyset: [await oauth_provider_1.JoseKey.fromKeyLike(jwtPublicKey, undefined, 'ES256K')],
                dpopSecret: secrets.dpopSecret,
                redis: redisScratch,
                onDecodeToken: async ({ payload, dpopProof }) => {
                    // @TODO drop this once oauth provider no longer accepts DPoP proof with
                    // query or fragment in "htu" claim.
                    if (dpopProof?.htu.match(/[?#]/)) {
                        logger_1.oauthLogger.info({ htu: dpopProof.htu, client_id: payload.client_id }, 'DPoP proof "htu" contains query or fragment');
                    }
                    if (scopeRefGetter) {
                        payload.scope = await scopeRefGetter.dereference(payload.scope);
                    }
                    return payload;
                },
            });
        const authVerifier = new auth_verifier_1.AuthVerifier(accountManager, idResolver, oauthVerifier, {
            publicUrl: cfg.service.publicUrl,
            jwtKey: jwtPublicKey ?? jwtSecretKey,
            adminPass: secrets.adminPassword,
            dids: {
                pds: cfg.service.did,
                entryway: cfg.entryway?.did,
                modService: cfg.modService?.did,
            },
        });
        return new AppContext({
            actorStore,
            blobstore,
            localViewer,
            mailer,
            moderationMailer,
            didCache,
            idResolver,
            plcClient,
            accountManager,
            sequencer,
            backgroundQueue,
            redisScratch,
            crawlers,
            bskyAppView,
            moderationClient,
            reportingClient,
            entrywayClient,
            entrywayAdminClient,
            proxyAgent,
            safeFetch,
            authVerifier,
            oauthProvider,
            plcRotationKey,
            cfg,
            ...(overrides ?? {}),
        });
    }
    async appviewAuthHeaders(did, lxm) {
        (0, node_assert_1.default)(this.bskyAppView);
        return this.serviceAuthHeaders(did, this.bskyAppView.did, lxm);
    }
    async entrywayAuthHeaders(req, did, lxm) {
        (0, node_assert_1.default)(this.cfg.entryway);
        const headers = await this.serviceAuthHeaders(did, this.cfg.entryway.did, lxm);
        return (0, proxy_1.forwardedFor)(req, headers);
    }
    entrywayPassthruHeaders(req) {
        return (0, proxy_1.forwardedFor)(req, (0, proxy_1.authPassthru)(req));
    }
    async serviceAuthHeaders(did, aud, lxm) {
        const keypair = await this.actorStore.keypair(did);
        return (0, xrpc_server_1.createServiceAuthHeaders)({
            iss: did,
            aud,
            lxm,
            keypair,
        });
    }
    async serviceAuthJwt(did, aud, lxm) {
        const keypair = await this.actorStore.keypair(did);
        return (0, xrpc_server_1.createServiceJwt)({
            iss: did,
            aud,
            lxm,
            keypair,
        });
    }
}
exports.AppContext = AppContext;
const basicAuthHeader = (username, password) => {
    const encoded = ui8.toString(ui8.fromString(`${username}:${password}`, 'utf8'), 'base64pad');
    return `Basic ${encoded}`;
};
exports.default = AppContext;
//# sourceMappingURL=context.js.map
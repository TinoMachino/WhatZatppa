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
exports.TestNetwork = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const get_port_1 = __importDefault(require("get-port"));
const uint8arrays = __importStar(require("uint8arrays"));
const common_web_1 = require("@atproto/common-web");
const xrpc_server_1 = require("@atproto/xrpc-server");
const bsky_1 = require("./bsky");
const const_1 = require("./const");
const introspect_1 = require("./introspect");
const network_no_appview_1 = require("./network-no-appview");
const ozone_1 = require("./ozone");
const pds_1 = require("./pds");
const plc_1 = require("./plc");
const service_profile_lexicon_1 = require("./service-profile-lexicon");
const service_profile_ozone_1 = require("./service-profile-ozone");
const util_1 = require("./util");
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin-pass';
class TestNetwork extends network_no_appview_1.TestNetworkNoAppView {
    constructor(plc, pds, bsky, ozone, introspect) {
        super(plc, pds);
        Object.defineProperty(this, "plc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: plc
        });
        Object.defineProperty(this, "pds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pds
        });
        Object.defineProperty(this, "bsky", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bsky
        });
        Object.defineProperty(this, "ozone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ozone
        });
        Object.defineProperty(this, "introspect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: introspect
        });
    }
    static async create(params = {}) {
        const redisHost = process.env.REDIS_HOST;
        const dbPostgresUrl = params.dbPostgresUrl || process.env.DB_POSTGRES_URL;
        (0, node_assert_1.default)(dbPostgresUrl, 'Missing postgres url for tests');
        (0, node_assert_1.default)(redisHost, 'Missing redis host for tests');
        const dbPostgresSchema = params.dbPostgresSchema || process.env.DB_POSTGRES_SCHEMA;
        const plc = await plc_1.TestPlc.create(params.plc ?? {});
        const bskyPort = params.bsky?.port ?? (await (0, get_port_1.default)());
        const pdsPort = params.pds?.port ?? (await (0, get_port_1.default)());
        const ozonePort = params.ozone?.port ?? (await (0, get_port_1.default)());
        const thirdPartyPds = await pds_1.TestPds.create({
            didPlcUrl: plc.url,
            ...params.pds,
            inviteRequired: false,
            port: await (0, get_port_1.default)(),
        });
        const ozoneUrl = `http://localhost:${ozonePort}`;
        // @TODO (?) rework the ServiceProfile to live on a separate PDS instead of
        // requiring to migrate to the main PDS
        const ozoneServiceProfile = await service_profile_ozone_1.OzoneServiceProfile.create(thirdPartyPds, ozoneUrl);
        const lexiconAuthorityProfile = await service_profile_lexicon_1.LexiconAuthorityProfile.create(thirdPartyPds);
        const bsky = await bsky_1.TestBsky.create({
            port: bskyPort,
            plcUrl: plc.url,
            pdsPort,
            rolodexUrl: process.env.BSKY_ROLODEX_URL,
            rolodexIgnoreBadTls: true,
            repoProvider: `ws://localhost:${pdsPort}`,
            dbPostgresSchema: `appview_${dbPostgresSchema}`,
            dbPostgresUrl,
            redisHost,
            modServiceDid: ozoneServiceProfile.did,
            labelsFromIssuerDids: [ozoneServiceProfile.did, const_1.EXAMPLE_LABELER],
            // Using a static private key results in a static DID, which is useful for e2e tests with the social-app repo.
            privateKey: '3f916c70dc69e4c5e83877f013325b11ecac31742e6a42f5c4fb240d0703d9d5=',
            ...params.bsky,
        });
        const pds = await pds_1.TestPds.create({
            port: pdsPort,
            didPlcUrl: plc.url,
            bskyAppViewUrl: bsky.url,
            bskyAppViewDid: bsky.ctx.cfg.serverDid,
            modServiceUrl: ozoneUrl,
            modServiceDid: ozoneServiceProfile.did,
            lexiconDidAuthority: lexiconAuthorityProfile.did,
            ...params.pds,
        });
        // mock before any events start flowing from pds so that we don't miss e.g. any handle resolutions.
        (0, util_1.mockNetworkUtilities)(pds, bsky);
        const ozone = await ozone_1.TestOzone.create({
            port: ozonePort,
            plcUrl: plc.url,
            signingKey: ozoneServiceProfile.key,
            serverDid: ozoneServiceProfile.did,
            dbPostgresSchema: `ozone_${dbPostgresSchema || 'db'}`,
            dbPostgresUrl,
            appviewUrl: bsky.url,
            appviewDid: bsky.ctx.cfg.serverDid,
            appviewPushEvents: true,
            pdsUrl: pds.url,
            pdsDid: pds.ctx.cfg.service.did,
            verifierDid: ozoneServiceProfile.did,
            verifierUrl: pds.url,
            verifierPassword: 'temp',
            ...params.ozone,
        });
        await ozoneServiceProfile.migrateTo(pds);
        await ozoneServiceProfile.createRecords();
        await lexiconAuthorityProfile.migrateTo(pds);
        await lexiconAuthorityProfile.createRecords();
        await ozone.addAdminDid(ozoneServiceProfile.did);
        await ozone.createPolicies();
        await thirdPartyPds.processAll();
        await pds.processAll();
        await ozone.processAll();
        await bsky.sub.processAll();
        await thirdPartyPds.close();
        // Weird but if we do this before pds.processAll() somehow appview loses this user and tests in different parts fail because appview doesn't return this user in various contexts anymore
        const ozoneVerifierPassword = await ozoneServiceProfile.createAppPasswordForVerification();
        if (ozone.daemon.ctx.cfg.verifier) {
            ozone.daemon.ctx.cfg.verifier.password = ozoneVerifierPassword;
        }
        let introspect = undefined;
        if (params.introspect?.port) {
            introspect = await introspect_1.IntrospectServer.start(params.introspect.port, plc, pds, bsky, ozone);
        }
        return new TestNetwork(plc, pds, bsky, ozone, introspect);
    }
    async processFullSubscription(timeout = 5000) {
        const sub = this.bsky.sub;
        const start = Date.now();
        const lastSeq = await this.pds.ctx.sequencer.curr();
        if (!lastSeq)
            return;
        while (Date.now() - start < timeout) {
            await sub.processAll();
            const runnerCursor = await sub.runner.getCursor();
            // if subscription claims to be done, ensure we are at the most recent cursor from PDS, else wait to process again
            // (the subscription may claim to be finished before the PDS has even emitted it's event)
            if (runnerCursor && runnerCursor >= lastSeq) {
                return;
            }
            await (0, common_web_1.wait)(5);
        }
        throw new Error(`Sequence was not processed within ${timeout}ms`);
    }
    async processAll(timeout) {
        await this.pds.processAll();
        await this.ozone.processAll();
        await this.processFullSubscription(timeout);
    }
    async serviceHeaders(did, lxm, aud) {
        const keypair = await this.pds.ctx.actorStore.keypair(did);
        const jwt = await (0, xrpc_server_1.createServiceJwt)({
            iss: did,
            aud: aud ?? this.bsky.ctx.cfg.serverDid,
            lxm,
            keypair,
        });
        return { authorization: `Bearer ${jwt}` };
    }
    async adminHeaders({ username = ADMIN_USERNAME, password = ADMIN_PASSWORD, }) {
        return {
            authorization: 'Basic ' +
                uint8arrays.toString(uint8arrays.fromString(`${username}:${password}`, 'utf8'), 'base64pad'),
        };
    }
    async close() {
        await Promise.all(this.feedGens.map((fg) => fg.close()));
        await this.ozone.close();
        await this.bsky.close();
        await this.pds.close();
        await this.plc.close();
        await this.introspect?.close();
    }
}
exports.TestNetwork = TestNetwork;
//# sourceMappingURL=network.js.map
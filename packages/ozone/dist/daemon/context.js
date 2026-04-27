"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaemonContext = void 0;
const api_1 = require("@atproto/api");
const common_1 = require("@atproto/common");
const crypto_1 = require("@atproto/crypto");
const identity_1 = require("@atproto/identity");
const xrpc_server_1 = require("@atproto/xrpc-server");
const background_1 = require("../background");
const db_1 = require("../db");
const mod_service_1 = require("../mod-service");
const strike_1 = require("../mod-service/strike");
const service_1 = require("../scheduled-action/service");
const service_2 = require("../setting/service");
const team_1 = require("../team");
const util_1 = require("../util");
const event_pusher_1 = require("./event-pusher");
const event_reverser_1 = require("./event-reverser");
const materialized_view_refresher_1 = require("./materialized-view-refresher");
const scheduled_action_processor_1 = require("./scheduled-action-processor");
const strike_expiry_processor_1 = require("./strike-expiry-processor");
const team_profile_synchronizer_1 = require("./team-profile-synchronizer");
const verification_listener_1 = require("./verification-listener");
class DaemonContext {
    constructor(opts) {
        Object.defineProperty(this, "opts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: opts
        });
    }
    static async fromConfig(cfg, secrets, overrides) {
        const db = new db_1.Database({
            url: cfg.db.postgresUrl,
            schema: cfg.db.postgresSchema,
        });
        const signingKey = await crypto_1.Secp256k1Keypair.import(secrets.signingKeyHex);
        const signingKeyId = await (0, util_1.getSigningKeyId)(db, signingKey.did());
        const idResolver = new identity_1.IdResolver({
            plcUrl: cfg.identity.plcUrl,
        });
        const appviewAgent = new api_1.AtpAgent({ service: cfg.appview.url });
        const createAuthHeaders = (aud, lxm) => (0, xrpc_server_1.createServiceAuthHeaders)({
            iss: `${cfg.service.did}#atproto_labeler`,
            aud,
            lxm,
            keypair: signingKey,
        });
        const eventPusher = new event_pusher_1.EventPusher(db, createAuthHeaders, {
            appview: cfg.appview.pushEvents ? cfg.appview : undefined,
            pds: cfg.pds ?? undefined,
        });
        const backgroundQueue = new background_1.BackgroundQueue(db);
        const settingService = service_2.SettingService.creator();
        const strikeService = strike_1.StrikeService.creator();
        const modService = mod_service_1.ModerationService.creator(signingKey, signingKeyId, cfg, backgroundQueue, idResolver, eventPusher, appviewAgent, createAuthHeaders, strikeService);
        const scheduledActionService = service_1.ScheduledActionService.creator();
        const teamService = team_1.TeamService.creator(appviewAgent, cfg.appview.did, createAuthHeaders);
        const teamProfileSynchronizer = new team_profile_synchronizer_1.TeamProfileSynchronizer(backgroundQueue, teamService(db), cfg.db.teamProfileRefreshIntervalMs);
        const eventReverser = new event_reverser_1.EventReverser(db, modService);
        const materializedViewRefresher = new materialized_view_refresher_1.MaterializedViewRefresher(backgroundQueue, cfg.db.materializedViewRefreshIntervalMs);
        const scheduledActionProcessor = new scheduled_action_processor_1.ScheduledActionProcessor(db, cfg.service.did, settingService, modService, scheduledActionService);
        const strikeExpiryProcessor = new strike_expiry_processor_1.StrikeExpiryProcessor(db, strikeService);
        // Only spawn the listener if verifier config exists and a jetstream URL is provided
        const verificationListener = cfg.verifier && cfg.jetstreamUrl
            ? new verification_listener_1.VerificationListener(db, cfg.jetstreamUrl, cfg.verifier?.issuersToIndex)
            : undefined;
        return new DaemonContext({
            db,
            cfg,
            backgroundQueue,
            signingKey,
            eventPusher,
            eventReverser,
            materializedViewRefresher,
            teamProfileSynchronizer,
            scheduledActionProcessor,
            strikeExpiryProcessor,
            verificationListener,
            ...(overrides ?? {}),
        });
    }
    get db() {
        return this.opts.db;
    }
    get cfg() {
        return this.opts.cfg;
    }
    get backgroundQueue() {
        return this.opts.backgroundQueue;
    }
    get eventPusher() {
        return this.opts.eventPusher;
    }
    get eventReverser() {
        return this.opts.eventReverser;
    }
    get materializedViewRefresher() {
        return this.opts.materializedViewRefresher;
    }
    get teamProfileSynchronizer() {
        return this.opts.teamProfileSynchronizer;
    }
    get scheduledActionProcessor() {
        return this.opts.scheduledActionProcessor;
    }
    get strikeExpiryProcessor() {
        return this.opts.strikeExpiryProcessor;
    }
    get verificationListener() {
        return this.opts.verificationListener;
    }
    async start() {
        this.eventPusher.start();
        this.eventReverser.start();
        this.materializedViewRefresher.start();
        this.teamProfileSynchronizer.start();
        this.scheduledActionProcessor.start();
        this.strikeExpiryProcessor.start();
        this.verificationListener?.start();
    }
    async processAll() {
        // Sequential because the materialized view values depend on the events.
        await this.eventPusher.processAll();
        await this.materializedViewRefresher.run();
        await this.teamProfileSynchronizer.run();
    }
    async destroy() {
        try {
            await (0, common_1.allFulfilled)([
                this.eventReverser.destroy(),
                this.eventPusher.destroy(),
                this.materializedViewRefresher.destroy(),
                this.teamProfileSynchronizer.destroy(),
                this.scheduledActionProcessor.destroy(),
                this.strikeExpiryProcessor.destroy(),
                this.verificationListener?.stop(),
            ]);
        }
        finally {
            await this.backgroundQueue.destroy();
            await this.db.close();
        }
    }
}
exports.DaemonContext = DaemonContext;
//# sourceMappingURL=context.js.map
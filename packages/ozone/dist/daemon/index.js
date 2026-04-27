"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OzoneDaemon = exports.StrikeExpiryProcessor = exports.ScheduledActionProcessor = exports.EventReverser = exports.BlobDiverter = exports.EventPusher = void 0;
const context_1 = require("./context");
var event_pusher_1 = require("./event-pusher");
Object.defineProperty(exports, "EventPusher", { enumerable: true, get: function () { return event_pusher_1.EventPusher; } });
var blob_diverter_1 = require("./blob-diverter");
Object.defineProperty(exports, "BlobDiverter", { enumerable: true, get: function () { return blob_diverter_1.BlobDiverter; } });
var event_reverser_1 = require("./event-reverser");
Object.defineProperty(exports, "EventReverser", { enumerable: true, get: function () { return event_reverser_1.EventReverser; } });
var scheduled_action_processor_1 = require("./scheduled-action-processor");
Object.defineProperty(exports, "ScheduledActionProcessor", { enumerable: true, get: function () { return scheduled_action_processor_1.ScheduledActionProcessor; } });
var strike_expiry_processor_1 = require("./strike-expiry-processor");
Object.defineProperty(exports, "StrikeExpiryProcessor", { enumerable: true, get: function () { return strike_expiry_processor_1.StrikeExpiryProcessor; } });
class OzoneDaemon {
    constructor(ctx) {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ctx
        });
    }
    static async create(cfg, secrets, overrides) {
        const ctx = await context_1.DaemonContext.fromConfig(cfg, secrets, overrides);
        return new OzoneDaemon(ctx);
    }
    async start() {
        await this.ctx.start();
    }
    async processAll() {
        await this.ctx.processAll();
    }
    async destroy() {
        await this.ctx.destroy();
    }
}
exports.OzoneDaemon = OzoneDaemon;
//# sourceMappingURL=index.js.map
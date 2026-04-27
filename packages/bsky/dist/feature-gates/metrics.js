"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsClient = void 0;
const logger_1 = require("../logger");
class MetricsClient {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "maxBatchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
        Object.defineProperty(this, "started", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "flushInterval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    start() {
        if (this.started)
            return;
        this.started = true;
        this.flushInterval = setInterval(() => {
            this.flush();
        }, 10000);
    }
    stop() {
        if (this.flushInterval) {
            clearInterval(this.flushInterval);
            this.flushInterval = null;
        }
        this.flush();
    }
    track(event, payload, metadata = {}) {
        this.start();
        const e = {
            source: 'appview',
            time: Date.now(),
            event,
            payload,
            metadata,
        };
        this.queue.push(e);
        if (this.queue.length > this.maxBatchSize) {
            this.flush();
        }
    }
    flush() {
        if (!this.queue.length)
            return;
        const events = this.queue.splice(0, this.queue.length);
        this.sendBatch(events);
    }
    async sendBatch(events) {
        if (!this.config.trackingEndpoint)
            return;
        try {
            const res = await fetch(this.config.trackingEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events }),
                keepalive: true,
            });
            if (!res.ok) {
                const errorText = await res.text().catch(() => 'Unknown error');
                logger_1.featureGatesLogger.error({ err: new Error(`${res.status} Failed to fetch - ${errorText}`) }, 'Failed to send metrics');
            }
            else {
                // Drain response body to allow connection reuse.
                await res.text().catch(() => { });
            }
        }
        catch (err) {
            logger_1.featureGatesLogger.error({ err }, 'Failed to send metrics');
        }
    }
}
exports.MetricsClient = MetricsClient;
//# sourceMappingURL=metrics.js.map
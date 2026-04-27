"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawlers = void 0;
const lex_1 = require("@atproto/lex");
const index_js_1 = require("./lexicons/index.js");
const logger_js_1 = require("./logger.js");
const NOTIFY_THRESHOLD = 20 * 60e3;
class Crawlers {
    constructor(backgroundQueue, hostname, crawlers) {
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: backgroundQueue
        });
        Object.defineProperty(this, "hostname", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: hostname
        });
        Object.defineProperty(this, "crawlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: crawlers
        });
        Object.defineProperty(this, "lastNotified", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -Infinity
        });
    }
    notifyOfUpdate() {
        const now = Date.now();
        if (this.lastNotified < now - NOTIFY_THRESHOLD) {
            this.lastNotified = now;
            this.requestCrawl();
        }
        else {
            // @TODO We should probably actually schedule (setTimeout) a crawl for
            // when the threshold is met, instead of just waiting for the next update
            // to trigger it. Not doing this now as it requires cleanup logic on
            // shutdown.
        }
    }
    requestCrawl() {
        for (const crawler of this.crawlers) {
            this.backgroundQueue.add(async () => {
                try {
                    await (0, lex_1.xrpc)(crawler, index_js_1.com.atproto.sync.requestCrawl, {
                        validateRequest: false,
                        validateResponse: false,
                        strictResponseProcessing: false,
                        body: { hostname: this.hostname },
                    });
                }
                catch (err) {
                    logger_js_1.crawlerLogger.warn({ err, crawler }, 'failed to request crawl');
                }
            });
        }
    }
}
exports.Crawlers = Crawlers;
//# sourceMappingURL=crawlers.js.map
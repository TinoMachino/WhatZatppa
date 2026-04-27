"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleIndexer = void 0;
class SimpleIndexer {
    constructor() {
        Object.defineProperty(this, "identityHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "recordHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "errorHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    identity(fn) {
        this.identityHandler = fn;
        return this;
    }
    record(fn) {
        this.recordHandler = fn;
        return this;
    }
    error(fn) {
        this.errorHandler = fn;
        return this;
    }
    async onEvent(evt, opts) {
        if (evt.type === 'record') {
            await this.recordHandler?.(evt, opts);
        }
        else {
            await this.identityHandler?.(evt, opts);
        }
        await opts.ack();
    }
    onError(err) {
        if (this.errorHandler) {
            this.errorHandler(err);
        }
        else {
            throw err;
        }
    }
}
exports.SimpleIndexer = SimpleIndexer;
//# sourceMappingURL=simple-indexer.js.map
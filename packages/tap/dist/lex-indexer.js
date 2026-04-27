"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexIndexer = void 0;
const lex_1 = require("@atproto/lex");
class LexIndexer {
    constructor() {
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "otherHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "identityHandler", {
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
    handlerKey(collection, action) {
        return `${collection}:${action}`;
    }
    register(action, ns, handler) {
        const schema = (0, lex_1.getMain)(ns);
        const key = this.handlerKey(schema.$type, action);
        if (this.handlers.has(key)) {
            throw new Error(`Handler already registered for ${key}`);
        }
        this.handlers.set(key, { schema, handler });
        return this;
    }
    create(ns, handler) {
        return this.register('create', ns, handler);
    }
    update(ns, handler) {
        return this.register('update', ns, handler);
    }
    delete(ns, handler) {
        return this.register('delete', ns, handler);
    }
    put(ns, handler) {
        this.register('create', ns, handler);
        this.register('update', ns, handler);
        return this;
    }
    other(fn) {
        if (this.otherHandler) {
            throw new Error(`Handler already registered for "other"`);
        }
        this.otherHandler = fn;
        return this;
    }
    identity(fn) {
        if (this.identityHandler) {
            throw new Error(`Handler already registered for "identity"`);
        }
        this.identityHandler = fn;
        return this;
    }
    error(fn) {
        if (this.errorHandler) {
            throw new Error(`Handler already registered for "error"`);
        }
        this.errorHandler = fn;
        return this;
    }
    async onEvent(evt, opts) {
        if (evt.type === 'identity') {
            await this.identityHandler?.(evt, opts);
        }
        else {
            await this.handleRecordEvent(evt, opts);
        }
        await opts.ack();
    }
    async handleRecordEvent(evt, opts) {
        const { collection, action } = evt;
        const key = this.handlerKey(collection, action);
        const registered = this.handlers.get(key);
        if (!registered) {
            await this.otherHandler?.(evt, opts);
            return;
        }
        if (action === 'create' || action === 'update') {
            const match = registered.schema.safeValidate(evt.record);
            if (!match.success) {
                const uriStr = `at://${evt.did}/${evt.collection}/${evt.rkey}`;
                throw new Error(`Record validation failed for ${uriStr}`, {
                    cause: match.reason,
                });
            }
        }
        await registered.handler(evt, opts);
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
exports.LexIndexer = LexIndexer;
//# sourceMappingURL=lex-indexer.js.map
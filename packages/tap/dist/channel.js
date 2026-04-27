"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapChannel = void 0;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const ws_client_1 = require("@atproto/ws-client");
const types_1 = require("./types");
const util_1 = require("./util");
class TapChannel {
    constructor(url, handler, wsOpts = {}) {
        Object.defineProperty(this, "ws", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "abortController", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new AbortController()
        });
        Object.defineProperty(this, "destroyDefer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, common_1.createDeferrable)()
        });
        Object.defineProperty(this, "bufferedAcks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.handler = handler;
        const { adminPassword, ...rest } = wsOpts;
        let headers = rest.headers;
        if (adminPassword) {
            headers ?? (headers = {});
            headers['Authorization'] = (0, util_1.formatAdminAuthHeader)(adminPassword);
        }
        this.ws = new ws_client_1.WebSocketKeepAlive({
            getUrl: async () => url,
            onReconnect: () => {
                this.flushBufferedAcks();
            },
            signal: this.abortController.signal,
            ...rest,
            headers,
        });
    }
    async ackEvent(id) {
        if (this.ws.isConnected()) {
            try {
                await this.sendAck(id);
            }
            catch {
                await this.bufferAndSendAck(id);
            }
        }
        else {
            await this.bufferAndSendAck(id);
        }
    }
    async sendAck(id) {
        await this.ws.send(JSON.stringify({ type: 'ack', id }));
    }
    // resolves after the ack has been actually sent
    async bufferAndSendAck(id) {
        const defer = (0, common_1.createDeferrable)();
        this.bufferedAcks.push({
            id,
            defer,
        });
        await defer.complete;
    }
    async flushBufferedAcks() {
        while (this.bufferedAcks.length > 0) {
            try {
                const ack = this.bufferedAcks.at(0);
                if (!ack) {
                    return;
                }
                await this.sendAck(ack.id);
                ack.defer.resolve();
                this.bufferedAcks = this.bufferedAcks.slice(1);
            }
            catch (cause) {
                const error = new Error(`failed to send ack for event ${this.bufferedAcks[0]}`, { cause });
                this.handler.onError(error);
                return;
            }
        }
    }
    async start() {
        this.abortController.signal.throwIfAborted();
        try {
            for await (const chunk of this.ws) {
                // @NOTE types are wrong. chunks are actually string (at least in tests)
                await this.processWsEvent(chunk);
            }
        }
        catch (err) {
            if (!(0, util_1.isCausedBySignal)(err, this.abortController.signal)) {
                throw err;
            }
        }
        finally {
            this.destroyDefer.resolve();
        }
    }
    async processWsEvent(chunk) {
        let evt;
        try {
            const data = typeof chunk === 'string'
                ? (0, lex_1.lexParse)(chunk, { strict: true })
                : (0, lex_1.lexParseJsonBytes)(chunk, { strict: true });
            evt = (0, types_1.parseTapEvent)(data);
        }
        catch (cause) {
            const error = new Error(`Failed to parse message`, { cause });
            this.handler.onError(error);
            return;
        }
        try {
            await this.handler.onEvent(evt, {
                signal: this.abortController.signal,
                ack: async () => {
                    await this.ackEvent(evt.id);
                },
            });
        }
        catch (cause) {
            // Don't ack on error - let Tap retry
            const error = new Error(`Failed to process event ${evt.id}`, { cause });
            this.handler.onError(error);
            return;
        }
    }
    async destroy() {
        this.abortController.abort();
        await this.destroyDefer.complete;
    }
    async [Symbol.asyncDispose]() {
        await this.destroy();
    }
}
exports.TapChannel = TapChannel;
//# sourceMappingURL=channel.js.map
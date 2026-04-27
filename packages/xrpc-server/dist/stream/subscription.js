"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const lex_data_1 = require("@atproto/lex-data");
const ws_client_1 = require("@atproto/ws-client");
const stream_1 = require("./stream");
class Subscription {
    constructor(opts) {
        Object.defineProperty(this, "opts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: opts
        });
    }
    async *[Symbol.asyncIterator]() {
        const ws = new ws_client_1.WebSocketKeepAlive({
            ...this.opts,
            getUrl: async () => {
                const params = (await this.opts.getParams?.()) ?? {};
                const query = encodeQueryParams(params);
                return `${this.opts.service}/xrpc/${this.opts.method}?${query}`;
            },
        });
        for await (const chunk of ws) {
            const message = (0, stream_1.ensureChunkIsMessage)(chunk);
            const t = message.header.t;
            const typedBody = (0, lex_data_1.isPlainObject)(message.body)
                ? t !== undefined
                    ? {
                        ...message.body,
                        $type: t.startsWith('#') ? this.opts.method + t : t,
                    }
                    : message.body
                : undefined;
            const result = this.opts.validate(typedBody);
            if (result !== undefined) {
                yield result;
            }
        }
    }
}
exports.Subscription = Subscription;
exports.default = Subscription;
function encodeQueryParams(obj) {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
        const encoded = encodeQueryParam(value);
        if (Array.isArray(encoded)) {
            encoded.forEach((enc) => params.append(key, enc));
        }
        else {
            params.set(key, encoded);
        }
    });
    return params.toString();
}
// Adapted from xrpc, but without any lex-specific knowledge
function encodeQueryParam(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return value.toString();
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    if (typeof value === 'undefined') {
        return '';
    }
    if (typeof value === 'object') {
        if (value instanceof Date) {
            return value.toISOString();
        }
        else if (Array.isArray(value)) {
            return value.flatMap(encodeQueryParam);
        }
        else if (!value) {
            return '';
        }
    }
    throw new Error(`Cannot encode ${typeof value}s into query params`);
}
//# sourceMappingURL=subscription.js.map
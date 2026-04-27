"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleStoreRedis = exports.defaultDecoder = exports.defaultEncoder = void 0;
const defaultEncoder = (value) => JSON.stringify(value);
exports.defaultEncoder = defaultEncoder;
const defaultDecoder = (value) => JSON.parse(value);
exports.defaultDecoder = defaultDecoder;
class SimpleStoreRedis {
    constructor(redis, options) {
        Object.defineProperty(this, "redis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: redis
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        if (!options.keyPrefix) {
            throw new TypeError(`keyPrefix must be a non-empty string`);
        }
        if (options.ttl != null && options.ttl <= 0) {
            throw new TypeError(`ttl must be greater than 0`);
        }
    }
    encodeKey(key) {
        return `${this.options.keyPrefix}${key}`;
    }
    async get(key, options) {
        const eKey = this.encodeKey(key);
        const eValue = await this.redis.get(eKey);
        if (eValue == null)
            return undefined;
        options?.signal?.throwIfAborted();
        const { decode = exports.defaultDecoder } = this.options;
        return decode(eValue, key);
    }
    async set(key, value) {
        const eKey = this.encodeKey(key);
        const { encode = exports.defaultEncoder, ttl } = this.options;
        const eValue = await encode(value, key);
        if (ttl)
            await this.redis.set(eKey, eValue, 'PX', ttl);
        else
            await this.redis.set(eKey, eValue);
    }
    async del(key) {
        const eKey = this.encodeKey(key);
        await this.redis.del(eKey);
    }
}
exports.SimpleStoreRedis = SimpleStoreRedis;
//# sourceMappingURL=index.js.map
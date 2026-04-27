import type { Redis } from 'ioredis';
import { Awaitable, GetOptions, SimpleStore, Value } from '@atproto-labs/simple-store';
export type { Awaitable, GetOptions, SimpleStore, Value };
export type Encoder<K extends string, V extends Value> = (value: V, key: K) => Awaitable<string>;
export type Decoder<K extends string, V extends Value> = (value: string, key: K) => Awaitable<V>;
export declare const defaultEncoder: Encoder<any, Value>;
export declare const defaultDecoder: Decoder<any, Value>;
export type SimpleStoreRedisOptions<K extends string, V extends Value> = {
    keyPrefix: string;
    /** In milliseconds */
    ttl?: number;
    /** @default JSON.stringify */
    encode?: Encoder<K, V>;
    /** @default JSON.parse */
    decode?: Decoder<K, V>;
};
export declare class SimpleStoreRedis<K extends string, V extends Value> implements SimpleStore<K, V> {
    protected readonly redis: Redis;
    protected readonly options: SimpleStoreRedisOptions<K, V>;
    constructor(redis: Redis, options: SimpleStoreRedisOptions<K, V>);
    protected encodeKey(key: K): string;
    get(key: K, options?: GetOptions): Promise<V | undefined>;
    set(key: K, value: V): Promise<void>;
    del(key: K): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map
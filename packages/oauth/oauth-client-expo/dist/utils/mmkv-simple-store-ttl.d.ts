import { Configuration } from 'react-native-mmkv';
import type { SimpleStore, Value } from '@atproto-labs/simple-store';
import { MMKVSimpleStore, MMKVSimpleStoreOptions } from './mmkv-simple-store';
export type MMKVSimpleStoreTTLOptions<V extends Value> = MMKVSimpleStoreOptions<V> & {
    clearInterval?: null | false | number;
    expiresAt: (value: V) => null | number;
};
/**
 * A {@link SimpleStore} implementation based on {@link MMKVSimpleStore} that
 * supports expiring entries after a certain time.
 */
export declare class MMKVSimpleStoreTTL<V extends Value> extends MMKVSimpleStore<V> implements Disposable, SimpleStore<string, V> {
    #private;
    constructor({ clearInterval, expiresAt, encode, decode, ...config }: MMKVSimpleStoreTTLOptions<V> & Configuration);
    [Symbol.dispose](): void;
    set(key: string, value: V): void;
    get(key: string): V | undefined;
    del(key: string): void;
    clear(): void;
    getExpirationTime(key: string): number | undefined;
    isExpired(key: string): boolean;
    clearExpired(): void;
}
//# sourceMappingURL=mmkv-simple-store-ttl.d.ts.map
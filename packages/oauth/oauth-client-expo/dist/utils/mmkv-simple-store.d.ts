import { Configuration } from 'react-native-mmkv';
import type { SimpleStore, Value } from '@atproto-labs/simple-store';
export type MMKVSimpleStoreOptions<V extends Value> = {
    decode: (value: string) => V;
    encode: (value: V) => string;
};
/**
 * A {@link SimpleStore} implementation using {@link MMKV} for storage.
 */
export declare class MMKVSimpleStore<V extends Value> implements SimpleStore<string, V> {
    #private;
    constructor({ decode, encode, ...config }: MMKVSimpleStoreOptions<V> & Configuration);
    set(key: string, value: V): void;
    get(key: string): V | undefined;
    del(key: string): void;
    clear(): void;
}
//# sourceMappingURL=mmkv-simple-store.d.ts.map
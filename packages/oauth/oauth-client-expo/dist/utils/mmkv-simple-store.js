import { MMKV } from 'react-native-mmkv';
/**
 * A {@link SimpleStore} implementation using {@link MMKV} for storage.
 */
export class MMKVSimpleStore {
    #store;
    #encode;
    #decode;
    constructor({ decode, encode, ...config }) {
        this.#store = new MMKV(config);
        this.#decode = decode;
        this.#encode = encode;
    }
    set(key, value) {
        const encoded = this.#encode.call(null, value);
        this.#store.set(key, encoded);
    }
    get(key) {
        const value = this.#store.getString(key);
        if (value === undefined)
            return undefined;
        return this.#decode.call(null, value);
    }
    del(key) {
        this.#store.delete(key);
    }
    clear() {
        this.#store.clearAll();
    }
}
//# sourceMappingURL=mmkv-simple-store.js.map
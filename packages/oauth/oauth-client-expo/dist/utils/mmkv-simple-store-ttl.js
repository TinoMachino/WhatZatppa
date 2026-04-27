import { MMKV } from 'react-native-mmkv';
import { MMKVSimpleStore } from './mmkv-simple-store';
/**
 * A {@link SimpleStore} implementation based on {@link MMKVSimpleStore} that
 * supports expiring entries after a certain time.
 */
export class MMKVSimpleStoreTTL extends MMKVSimpleStore {
    #store;
    #expiresAt;
    #clearTimer;
    constructor({ clearInterval = 60 * 1e3, expiresAt, encode, decode, ...config }) {
        super({ ...config, encode, decode });
        this.#store = new MMKV({ ...config, id: `${config.id}.exp` });
        this.#expiresAt = expiresAt;
        if (clearInterval) {
            this.#clearTimer = setInterval(() => this.clearExpired(), clearInterval);
        }
        this.clearExpired();
    }
    [Symbol.dispose]() {
        clearInterval(this.#clearTimer);
        this.clearExpired();
    }
    set(key, value) {
        super.set(key, value);
        const expirationDate = this.#expiresAt.call(null, value);
        if (expirationDate == null)
            this.#store.delete(key);
        else
            this.#store.set(key, expirationDate);
    }
    get(key) {
        if (this.isExpired(key)) {
            this.del(key);
            return undefined;
        }
        return super.get(key);
    }
    del(key) {
        super.del(key);
        this.#store.delete(key);
    }
    clear() {
        super.clear();
        this.#store.clearAll();
    }
    getExpirationTime(key) {
        return this.#store.getNumber(key) ?? undefined;
    }
    isExpired(key) {
        const expirationTime = this.getExpirationTime(key);
        return expirationTime != null && expirationTime < Date.now();
    }
    clearExpired() {
        for (const key of this.#store.getAllKeys() ?? []) {
            if (this.isExpired(key)) {
                this.del(key);
            }
        }
    }
}
//# sourceMappingURL=mmkv-simple-store-ttl.js.map
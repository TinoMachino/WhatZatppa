import { Key, } from '@atproto/oauth-client';
import { default as NativeModule } from '../ExpoAtprotoOAuthClientModule';
export class ExpoKey extends Key {
    async createJwt(header, payload) {
        return NativeModule.createJwt(JSON.stringify(header), JSON.stringify(payload), toNativeJwk(this.jwk));
    }
    async verifyJwt(token, options = {}) {
        return NativeModule.verifyJwt(token, toNativeJwk(this.jwk), options);
    }
    static async generate(algs) {
        if (algs.includes('ES256')) {
            const jwk = await NativeModule.generatePrivateJwk('ES256');
            return new ExpoKey({ ...jwk, key_ops: ['sign'] });
        }
        throw TypeError(`No supported algorithm found in: ${algs.join(', ')}`);
    }
}
function toNativeJwk(jwk) {
    return {
        kty: jwk.kty,
        crv: jwk.crv,
        kid: jwk.kid,
        x: jwk.x,
        y: jwk.y,
        d: jwk.d,
        alg: jwk.alg,
    };
}
//# sourceMappingURL=expo-key.js.map
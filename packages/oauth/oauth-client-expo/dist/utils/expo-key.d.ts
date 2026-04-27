import { type Jwk, type JwtHeader, type JwtPayload, Key, type SignedJwt, type VerifyOptions, type VerifyResult } from '@atproto/oauth-client';
import type { NativeJwk } from '../ExpoAtprotoOAuthClientModule';
export type ExpoJwk = Jwk & NativeJwk & {
    key_ops: ['sign'];
};
export declare class ExpoKey extends Key<ExpoJwk> {
    createJwt(header: JwtHeader, payload: JwtPayload): Promise<SignedJwt>;
    verifyJwt<C extends string = never>(token: SignedJwt, options?: VerifyOptions<C>): Promise<VerifyResult<C>>;
    static generate(algs: string[]): Promise<ExpoKey>;
}
//# sourceMappingURL=expo-key.d.ts.map
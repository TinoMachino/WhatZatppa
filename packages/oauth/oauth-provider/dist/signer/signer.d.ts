import { JwtPayload, JwtPayloadGetter, JwtSignHeader, Keyset, SignedJwt, VerifyOptions } from '@atproto/jwk';
import { OmitKey, RequiredKey } from '../lib/util/type.js';
import { AccessTokenPayload } from './access-token-payload.js';
import { ApiTokenPayload } from './api-token-payload.js';
export type SignPayload = JwtPayload & {
    iss?: never;
};
export { Keyset };
export type { JwtPayloadGetter, JwtSignHeader, SignedJwt, VerifyOptions };
export declare class Signer {
    readonly issuer: string;
    readonly keyset: Keyset;
    constructor(issuer: string, keyset: Keyset);
    verify<C extends string = never>(token: SignedJwt, options?: Omit<VerifyOptions<C>, 'issuer'>): Promise<import("@atproto/jwk").VerifyResult<C> & {
        key: import("@atproto/jwk").Key<{
            kty: "RSA";
            n: string;
            e: string;
            alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            'x5t#S256'?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
            p?: string | undefined;
            q?: string | undefined;
            dp?: string | undefined;
            dq?: string | undefined;
            qi?: string | undefined;
            oth?: {
                d?: string | undefined;
                r?: string | undefined;
                t?: string | undefined;
            }[] | undefined;
        } | {
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
            alg?: "ES256" | "ES384" | "ES512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            'x5t#S256'?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } | {
            kty: "EC";
            crv: "secp256k1";
            x: string;
            y: string;
            alg?: "ES256K" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            'x5t#S256'?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } | {
            kty: "OKP";
            crv: "Ed25519" | "Ed448";
            x: string;
            alg?: "EdDSA" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            'x5t#S256'?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } | {
            kty: "oct";
            k: string;
            alg?: "HS256" | "HS384" | "HS512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            'x5t#S256'?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
        }>;
    }>;
    sign(signHeader: JwtSignHeader, payload: SignPayload | JwtPayloadGetter<SignPayload>): Promise<SignedJwt>;
    createAccessToken(payload: OmitKey<AccessTokenPayload, 'iss'>): Promise<SignedJwt>;
    verifyAccessToken<C extends string = never>(token: SignedJwt, options?: Omit<VerifyOptions<C>, 'issuer' | 'typ'>): Promise<{
        protectedHeader: import("zod").objectOutputType<{
            alg: import("zod").ZodString;
            jku: import("zod").ZodOptional<import("zod").ZodString>;
            jwk: import("zod").ZodOptional<import("zod").ZodObject<{
                kty: import("zod").ZodString;
                crv: import("zod").ZodOptional<import("zod").ZodString>;
                x: import("zod").ZodOptional<import("zod").ZodString>;
                y: import("zod").ZodOptional<import("zod").ZodString>;
                e: import("zod").ZodOptional<import("zod").ZodString>;
                n: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                kty: string;
                n?: string | undefined;
                e?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
            }, {
                kty: string;
                n?: string | undefined;
                e?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
            }>>;
            kid: import("zod").ZodOptional<import("zod").ZodString>;
            x5u: import("zod").ZodOptional<import("zod").ZodString>;
            x5c: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            x5t: import("zod").ZodOptional<import("zod").ZodString>;
            'x5t#S256': import("zod").ZodOptional<import("zod").ZodString>;
            typ: import("zod").ZodOptional<import("zod").ZodString>;
            cty: import("zod").ZodOptional<import("zod").ZodString>;
            crit: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, import("zod").ZodTypeAny, "passthrough">;
        payload: RequiredKey<AccessTokenPayload, C>;
    }>;
    createEphemeralToken(payload: OmitKey<ApiTokenPayload, 'iss' | 'aud' | 'iat'>): Promise<`${string}.${string}.${string}`>;
    verifyEphemeralToken<C extends string = never>(token: SignedJwt, options?: Omit<VerifyOptions<C>, 'issuer' | 'audience' | 'typ'>): Promise<{
        protectedHeader: import("zod").objectOutputType<{
            alg: import("zod").ZodString;
            jku: import("zod").ZodOptional<import("zod").ZodString>;
            jwk: import("zod").ZodOptional<import("zod").ZodObject<{
                kty: import("zod").ZodString;
                crv: import("zod").ZodOptional<import("zod").ZodString>;
                x: import("zod").ZodOptional<import("zod").ZodString>;
                y: import("zod").ZodOptional<import("zod").ZodString>;
                e: import("zod").ZodOptional<import("zod").ZodString>;
                n: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                kty: string;
                n?: string | undefined;
                e?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
            }, {
                kty: string;
                n?: string | undefined;
                e?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
            }>>;
            kid: import("zod").ZodOptional<import("zod").ZodString>;
            x5u: import("zod").ZodOptional<import("zod").ZodString>;
            x5c: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            x5t: import("zod").ZodOptional<import("zod").ZodString>;
            'x5t#S256': import("zod").ZodOptional<import("zod").ZodString>;
            typ: import("zod").ZodOptional<import("zod").ZodString>;
            cty: import("zod").ZodOptional<import("zod").ZodString>;
            crit: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, import("zod").ZodTypeAny, "passthrough">;
        payload: RequiredKey<ApiTokenPayload, C>;
    }>;
}
//# sourceMappingURL=signer.d.ts.map
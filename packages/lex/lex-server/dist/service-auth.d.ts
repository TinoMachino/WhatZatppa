import { AtprotoDid, AtprotoDidDocument } from '@atproto/did';
import { DidString } from '@atproto/lex-schema';
import { CreateDidResolverOptions } from '@atproto-labs/did-resolver';
import type { LexRouterAuth } from './lex-router.js';
/**
 * Callback function to check and record nonce uniqueness.
 *
 * Used to prevent replay attacks by ensuring each nonce is only used once.
 * The implementation must track nonces for at least the `maxAge` duration
 * (default 5 minutes before and after the current time).
 *
 * @param nonce - The nonce string from the JWT token
 * @returns Promise resolving to `true` if the nonce is unique (first time seen),
 *          `false` if it has been seen before
 *
 * @example
 * ```typescript
 * // Using Redis for nonce tracking
 * const checkNonce: UniqueNonceChecker = async (nonce) => {
 *   const key = `nonce:${nonce}`
 *   const result = await redis.setnx(key, '1')
 *   if (result === 1) {
 *     await redis.expire(key, 600) // 10 minutes TTL
 *     return true
 *   }
 *   return false
 * }
 * ```
 */
export type UniqueNonceChecker = (nonce: string) => Promise<boolean>;
/**
 * Configuration options for AT Protocol service authentication.
 *
 * Service auth is used for server-to-server communication in the AT Protocol,
 * where one service authenticates to another using signed JWT tokens tied to
 * the caller's DID.
 *
 * @example
 * ```typescript
 * const options: ServiceAuthOptions = {
 *   audience: 'did:web:api.example.com',
 *   unique: async (nonce) => nonceStore.checkAndAdd(nonce),
 *   maxAge: 300, // 5 minutes
 *   // Optional DID resolver options
 *   plcDirectoryUrl: 'https://plc.directory'
 * }
 * ```
 */
export type ServiceAuthOptions = CreateDidResolverOptions & {
    /**
     * Expected audience ("aud") claim in the JWT token.
     *
     * This should be the DID of your service. The token must include this
     * value in its `aud` claim to be accepted. Set to `null` to skip
     * audience verification (not recommended for production).
     */
    audience: null | DidString;
    /**
     * Function to check and record nonce uniqueness.
     *
     * This is critical for preventing replay attacks. The value checked here
     * must be unique within `maxAge` seconds before and after the current time.
     *
     * @param nonce - The nonce to check
     * @returns Promise resolving to `true` if unique, `false` if seen before
     */
    unique: UniqueNonceChecker;
    /**
     * Maximum age of the JWT token in seconds.
     *
     * Tokens with `iat` (issued at) or `exp` (expiry) timestamps outside
     * this window from the current time will be rejected.
     *
     * @default 300 (5 minutes)
     */
    maxAge?: number;
};
/**
 * Credentials returned after successful service authentication.
 *
 * Contains the verified DID, resolved DID document, and parsed JWT token.
 * These are available in handler context as `ctx.credentials`.
 *
 * @example
 * ```typescript
 * router.add(protectedMethod, {
 *   handler: async (ctx) => {
 *     const { did, didDocument, jwt } = ctx.credentials
 *     console.log('Request from:', did)
 *     console.log('Token expires:', new Date(jwt.payload.exp * 1000))
 *     return { body: { callerDid: did } }
 *   },
 *   auth: serviceAuth({ audience: myDid, unique: checkNonce })
 * })
 * ```
 */
export type ServiceAuthCredentials = {
    /** The verified AT Protocol DID of the caller. */
    did: AtprotoDid;
    /** The resolved DID document of the caller. */
    didDocument: AtprotoDidDocument;
    /** The parsed and validated JWT token. */
    jwt: ParsedJwt;
};
/**
 * Creates an authentication handler for verifying AT Protocol service auth JWTs.
 *
 * Service auth is the standard authentication mechanism for server-to-server
 * communication in the AT Protocol. It uses JWT bearer tokens signed by the
 * caller's DID signing key, with the signature verified against the public
 * key in the caller's DID document.
 *
 * The handler performs the following validations:
 * - Extracts and parses the Bearer token from the Authorization header
 * - Validates JWT structure and claims (aud, exp, iat, lxm, nonce)
 * - Resolves the issuer's DID document
 * - Verifies the JWT signature against the `#atproto` verification method
 * - Checks nonce uniqueness to prevent replay attacks
 *
 * @param options - Configuration options for service auth
 * @returns An auth handler function for use with {@link LexRouter.add}
 *
 * @example Basic usage
 * ```typescript
 * import { LexRouter, serviceAuth } from '@atproto/lex-server'
 *
 * const router = new LexRouter()
 *
 * const auth = serviceAuth({
 *   audience: 'did:web:api.example.com',
 *   unique: async (nonce) => {
 *     // Check if nonce has been seen, return true if unique
 *     const isNew = await redis.setnx(`nonce:${nonce}`, '1')
 *     if (isNew) await redis.expire(`nonce:${nonce}`, 600)
 *     return isNew
 *   }
 * })
 *
 * router.add(myMethod, {
 *   handler: async (ctx) => {
 *     console.log('Authenticated as:', ctx.credentials.did)
 *     return { body: { success: true } }
 *   },
 *   auth
 * })
 * ```
 */
export declare function serviceAuth({ audience, maxAge, unique, ...options }: ServiceAuthOptions): LexRouterAuth<ServiceAuthCredentials>;
/**
 * Options for parsing and validating a JWT token.
 */
export type ParseJwtOptions = {
    /** Maximum age in seconds for token validity window. */
    maxAge: number;
    /** Expected audience claim, or null to skip audience verification. */
    audience: null | DidString;
    /** Function to check nonce uniqueness. */
    unique: UniqueNonceChecker;
    /** Expected lexicon method NSID for the `lxm` claim. */
    lxm: string;
};
/**
 * A parsed and partially validated JWT token.
 *
 * Contains the decoded header and payload, along with the raw bytes
 * needed for signature verification.
 *
 * @example
 * ```typescript
 * const jwt: ParsedJwt = {
 *   header: { alg: 'ES256K', typ: 'JWT' },
 *   payload: {
 *     iss: 'did:plc:abc123',
 *     aud: 'did:web:api.example.com',
 *     exp: 1704067200,
 *     iat: 1704066900,
 *     lxm: 'com.atproto.sync.getBlob'
 *   },
 *   message: new Uint8Array([...]),
 *   signature: new Uint8Array([...])
 * }
 * ```
 */
export type ParsedJwt = {
    /** The decoded JWT header containing algorithm and type. */
    header: HeaderObject;
    /** The decoded JWT payload containing claims. */
    payload: PayloadObject;
    /** The raw header.payload bytes for signature verification. */
    message: Uint8Array;
    /** The decoded signature bytes. */
    signature: Uint8Array;
};
type HeaderObject = {
    alg: string;
    typ?: string;
};
type PayloadObject = {
    iss: DidString;
    aud: DidString;
    exp: number;
    iat?: number;
    nbf?: number;
    lxm?: string;
    nonce?: string;
};
export declare function isPayloadObject(obj: unknown): obj is PayloadObject;
export {};
//# sourceMappingURL=service-auth.d.ts.map
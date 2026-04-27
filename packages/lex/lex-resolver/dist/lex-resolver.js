"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexResolver = exports.NSID = exports.AtUri = void 0;
const tslib_1 = require("tslib");
const promises_1 = require("node:dns/promises");
const crypto = tslib_1.__importStar(require("@atproto/crypto"));
const lex_client_1 = require("@atproto/lex-client");
const lex_document_1 = require("@atproto/lex-document");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
Object.defineProperty(exports, "AtUri", { enumerable: true, get: function () { return syntax_1.AtUri; } });
Object.defineProperty(exports, "NSID", { enumerable: true, get: function () { return syntax_1.NSID; } });
const did_resolver_1 = require("@atproto-labs/did-resolver");
const lex_resolver_error_js_1 = require("./lex-resolver-error.js");
const index_js_1 = require("./lexicons/index.js");
/**
 * Resolves Lexicon documents from the AT Protocol network.
 *
 * The {@link LexResolver} handles the complete process of resolving a lexicon
 * by NSID:
 * 1. **Authority Resolution**: Looks up the `_lexicon.<authority>` DNS TXT record
 *    to find the DID that controls lexicons for that namespace
 * 2. **DID Resolution**: Resolves the DID document to find the PDS endpoint and
 *    signing key
 * 3. **Record Fetch**: Fetches the lexicon record from the PDS with cryptographic
 *    proof verification
 * 4. **Validation**: Validates the lexicon document structure
 *
 * @example Basic usage - resolve a lexicon by NSID
 * ```typescript
 * import { LexResolver } from '@atproto/lex-resolver'
 *
 * const resolver = new LexResolver({})
 *
 * // Get a lexicon document by its NSID
 * const result = await resolver.get('app.bsky.feed.post')
 * console.log(result.lexicon) // The parsed lexicon document
 * console.log(result.uri)     // AT URI where it was found
 * console.log(result.cid)     // Content identifier for verification
 * ```
 *
 * @example Two-step resolution for more control
 * ```typescript
 * import { LexResolver } from '@atproto/lex-resolver'
 *
 * const resolver = new LexResolver({})
 *
 * // Step 1: Resolve the authority to get the AT URI
 * const uri = await resolver.resolve('app.bsky.feed.post')
 * console.log(uri.toString()) // 'at://did:plc:xxx/com.atproto.lexicon.schema/app.bsky.feed.post'
 *
 * // Step 2: Fetch the lexicon from the URI
 * const result = await resolver.fetch(uri)
 * console.log(result.lexicon)
 * ```
 *
 * @example Using hooks for caching
 * ```typescript
 * import { LexResolver, LexResolverFetchResult } from '@atproto/lex-resolver'
 *
 * const cache = new Map<string, LexResolverFetchResult>()
 *
 * const resolver = new LexResolver({
 *   hooks: {
 *     onFetch({ uri }) {
 *       return cache.get(uri.toString())
 *     },
 *     onFetchResult({ uri, cid, lexicon }) {
 *       cache.set(uri.toString(), { cid, lexicon })
 *     }
 *   }
 * })
 * ```
 *
 * @example Error handling
 * ```typescript
 * import { LexResolver, LexResolverError } from '@atproto/lex-resolver'
 *
 * const resolver = new LexResolver({})
 *
 * try {
 *   const result = await resolver.get('com.example.unknown')
 * } catch (error) {
 *   if (error instanceof LexResolverError) {
 *     console.error(`Failed to resolve ${error.nsid}: ${error.description}`)
 *   }
 * }
 * ```
 */
class LexResolver {
    options;
    didResolver;
    constructor(options) {
        this.options = options;
        this.didResolver = (0, did_resolver_1.createDidResolver)(options);
    }
    /**
     * Gets a lexicon document by its NSID.
     *
     * This is the primary method for resolving lexicons. It combines
     * {@link resolve} and {@link fetch} into a single operation, handling
     * authority resolution, DID lookup, and record fetching.
     *
     * @param nsidStr - The NSID to resolve, either as a string or NSID object
     * @param options - Optional DID resolution options (e.g., signal for cancellation)
     * @returns The resolved lexicon result containing URI, CID, and lexicon document
     * @throws {LexResolverError} If resolution fails at any stage
     *
     * @example
     * ```typescript
     * // Resolve using string NSID
     * const result = await resolver.get('app.bsky.feed.post')
     *
     * // Resolve using NSID object
     * import { NSID } from '@atproto/syntax'
     * const nsid = NSID.from('app.bsky.feed.post')
     * const result = await resolver.get(nsid)
     *
     * // With abort signal for cancellation
     * const controller = new AbortController()
     * const result = await resolver.get('app.bsky.feed.post', {
     *   signal: controller.signal
     * })
     * ```
     */
    async get(nsidStr, options) {
        const uri = await this.resolve(nsidStr);
        return this.fetch(uri, options);
    }
    /**
     * Resolves the authority for an NSID and returns the AT URI for the lexicon.
     *
     * This method performs the first stage of lexicon resolution:
     * 1. Parses the NSID to extract the authority domain
     * 2. Looks up the `_lexicon.<authority>` DNS TXT record
     * 3. Extracts the DID from the TXT record (format: `did=<did>`)
     * 4. Constructs the AT URI for the lexicon record
     *
     * Use this when you need the URI without fetching the actual document,
     * or when you want to implement custom fetching logic.
     *
     * @param nsidStr - The NSID to resolve, either as a string or NSID object
     * @returns The AT URI pointing to the lexicon record
     * @throws {LexResolverError} If authority resolution fails (e.g., DNS lookup fails)
     *
     * @example
     * ```typescript
     * // Resolve to get the AT URI
     * const uri = await resolver.resolve('app.bsky.feed.post')
     * console.log(uri.toString())
     * // Output: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/com.atproto.lexicon.schema/app.bsky.feed.post'
     *
     * // The URI can then be used with fetch() or stored for later use
     * const result = await resolver.fetch(uri)
     * ```
     */
    async resolve(nsidStr) {
        const nsid = syntax_1.NSID.from(nsidStr);
        const did = (await this.options.hooks?.onResolveAuthority?.({ nsid })) ??
            (await this.resolveLexiconAuthority(nsid).then(async (did) => {
                await this.options.hooks?.onResolveAuthorityResult?.({ nsid, did });
                return did;
            }, async (err) => {
                await this.options.hooks?.onResolveAuthorityError?.({ nsid, err });
                throw err;
            }));
        return syntax_1.AtUri.make(did, 'com.atproto.lexicon.schema', nsid.toString());
    }
    // @TODO This class could be made compatible with browsers by making the
    // following method abstract and/or by allowing the caller to inject a DNS
    // resolver implementation (based on DNS-over-HTTPS or similar), instead of
    // using the Node.js built-in resolver.
    async resolveLexiconAuthority(nsid) {
        try {
            return await getDomainTxtDid(`_lexicon.${nsid.authority}`);
        }
        catch (cause) {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `Failed to resolve lexicon DID authority for ${nsid}`, { cause });
        }
    }
    /**
     * Fetches a lexicon document from a specific AT URI.
     *
     * This method performs the second stage of lexicon resolution:
     * 1. Resolves the DID from the URI to find the PDS endpoint
     * 2. Fetches the record from the PDS using `com.atproto.sync.getRecord`
     * 3. Verifies the cryptographic proof (commit signature)
     * 4. Validates the lexicon document structure
     * 5. Ensures the document ID matches the URI rkey
     *
     * Use this when you already have an AT URI (e.g., from {@link resolve})
     * and want to fetch the lexicon document.
     *
     * @param uriStr - The AT URI to fetch, either as a string or AtUri object
     * @param options - Optional DID resolution options (e.g., signal for cancellation, noCache)
     * @returns The resolved lexicon result containing URI, CID, and lexicon document
     * @throws {LexResolverError} If fetching or validation fails
     *
     * @example
     * ```typescript
     * // Fetch from a known URI
     * const result = await resolver.fetch(
     *   'at://did:plc:xyz/com.atproto.lexicon.schema/app.bsky.feed.post'
     * )
     *
     * // Fetch with no-cache to bypass any upstream caching
     * const result = await resolver.fetch(uri, { noCache: true })
     *
     * // Fetch with abort signal
     * const controller = new AbortController()
     * const result = await resolver.fetch(uri, { signal: controller.signal })
     * ```
     */
    async fetch(uriStr, options) {
        const uri = typeof uriStr === 'string' ? new syntax_1.AtUri(uriStr) : uriStr;
        const { lexicon, cid } = (await this.options.hooks?.onFetch?.({ uri })) ??
            (await this.fetchLexiconUri(uri, options).then(async (res) => {
                await this.options.hooks?.onFetchResult?.({ uri, ...res });
                return res;
            }, async (err) => {
                await this.options.hooks?.onFetchError?.({ uri, err });
                throw err;
            }));
        return { uri, cid, lexicon };
    }
    async fetchLexiconUri(uri, options) {
        const { did, nsid } = parseLexiconUri(uri);
        const { pds, key } = await this.didResolver
            .resolve(did, options)
            .then(did_resolver_1.extractAtprotoData)
            .catch((cause) => {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `Failed to resolve DID document for ${did}`, { cause });
        });
        if (!key || !pds || !URL.canParse(pds.serviceEndpoint)) {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `No atproto PDS service endpoint or signing key found in ${did} DID document`);
        }
        const agent = (0, lex_client_1.buildAgent)({
            service: pds.serviceEndpoint,
            fetch: this.options.fetch,
        });
        const collection = 'com.atproto.lexicon.schema';
        const rkey = nsid.toString();
        const { cid, record } = await (0, lex_client_1.xrpc)(agent, index_js_1.com.atproto.sync.getRecord, {
            signal: options?.signal,
            headers: options?.noCache ? { 'Cache-Control': 'no-cache' } : undefined,
            params: { did, collection, rkey },
        }).then(({ body }) => {
            return verifyRecordProof(body, did, key, collection, rkey).catch((cause) => {
                throw new lex_resolver_error_js_1.LexResolverError(nsid, `Failed to verify Lexicon record proof at ${uri}`, { cause });
            });
        }, (cause) => {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `Failed to fetch Record ${uri}`, {
                cause,
            });
        });
        const validationResult = lex_document_1.lexiconDocumentSchema.safeParse(record);
        if (!validationResult.success) {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `Invalid Lexicon document at ${uri}`, {
                cause: validationResult.reason,
            });
        }
        const lexicon = validationResult.value;
        if (lexicon.id !== uri.rkey) {
            throw new lex_resolver_error_js_1.LexResolverError(nsid, `Invalid document id "${lexicon.id}" at ${uri}`);
        }
        return { lexicon, cid };
    }
}
exports.LexResolver = LexResolver;
function parseLexiconUri(uri) {
    // Validate input URI
    const nsid = syntax_1.NSID.from(uri.rkey);
    try {
        const did = uri.host;
        (0, did_resolver_1.assertDid)(did);
        return { did, nsid };
    }
    catch (cause) {
        throw new lex_resolver_error_js_1.LexResolverError(nsid, `URI host is not a DID ${uri}`, { cause });
    }
}
async function getDomainTxtDid(domain) {
    const didLines = (await (0, promises_1.resolveTxt)(domain))
        .map((chunks) => chunks.join(''))
        .filter((i) => i.startsWith('did='));
    if (didLines.length === 1) {
        const did = didLines[0].slice(4);
        (0, did_resolver_1.assertDid)(did);
        return did;
    }
    throw didLines.length > 1
        ? new Error('Multiple DIDs found in DNS TXT records')
        : new Error('No DID found in DNS TXT records');
}
async function verifyRecordProof(car, did, key, collection, rkey) {
    const { root, blocks } = await (0, repo_1.readCarWithRoot)(car);
    const blockstore = new repo_1.MemoryBlockstore(blocks);
    const commit = await blockstore.readObj(root, repo_1.def.commit);
    if (commit.did !== did) {
        throw new Error(`Invalid repo did: ${commit.did}`);
    }
    const signingKey = getDidKeyFromMultibase(key);
    const validSig = await (0, repo_1.verifyCommitSig)(commit, signingKey);
    if (!validSig) {
        throw new Error(`Invalid signature on commit: ${root.toString()}`);
    }
    const mst = repo_1.MST.load(blockstore, commit.data);
    const cid = await mst.get(`${collection}/${rkey}`);
    if (!cid)
        throw new Error('Record not found in proof');
    const record = await blockstore.readRecord(cid);
    if (record?.$type !== collection) {
        throw new Error(`Invalid record type: expected ${collection}, got ${record?.$type}`);
    }
    return { cid, record };
}
function getDidKeyFromMultibase(key) {
    switch (key.type) {
        case 'EcdsaSecp256r1VerificationKey2019': {
            const keyBytes = crypto.multibaseToBytes(key.publicKeyMultibase);
            return crypto.formatDidKey(crypto.P256_JWT_ALG, keyBytes);
        }
        case 'EcdsaSecp256k1VerificationKey2019': {
            const keyBytes = crypto.multibaseToBytes(key.publicKeyMultibase);
            return crypto.formatDidKey(crypto.SECP256K1_JWT_ALG, keyBytes);
        }
        case 'Multikey': {
            const { jwtAlg, keyBytes } = crypto.parseMultikey(key.publicKeyMultibase);
            return crypto.formatDidKey(jwtAlg, keyBytes);
        }
        default: {
            // Should never happen
            throw new Error(`Unsupported verification method type: ${key.type}`);
        }
    }
}
//# sourceMappingURL=lex-resolver.js.map
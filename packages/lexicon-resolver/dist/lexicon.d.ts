import { Cid } from '@atproto/lex';
import { LexiconDocument } from '@atproto/lex-document';
import { Commit } from '@atproto/repo';
import { AtUri, DidString, NSID, NsidString } from '@atproto/syntax';
import * as lexiconsSchema from './lexicons/com/atproto/lexicon/schema.js';
import { BuildRecordResolverOptions, ResolveRecordOptions } from './record.js';
export type LexiconDocumentRecord = lexiconsSchema.Main & LexiconDocument;
export declare const LEXICON_SCHEMA_NSID = "com.atproto.lexicon.schema";
/**
 * Resolve Lexicon from an NSID
 */
export type LexiconResolver = (nsid: NSID | NsidString) => Promise<LexiconResolution>;
/**
 * Resolve Lexicon from an NSID using Lexicon DID authority and record resolution
 */
export type AtprotoLexiconResolver = (nsid: NSID | NsidString, options?: ResolveLexiconOptions) => Promise<LexiconResolution>;
export type BuildLexiconResolverOptions = BuildRecordResolverOptions;
export type ResolveLexiconOptions = ResolveRecordOptions & {
    didAuthority?: DidString;
};
export type LexiconResolution = {
    commit: Commit;
    uri: AtUri;
    cid: Cid;
    nsid: NSID;
    lexicon: LexiconDocumentRecord;
};
export { AtUri, NSID };
export type { Cid, Commit, DidString, LexiconDocument, NsidString };
/**
 * Build a Lexicon resolver function.
 */
export declare function buildLexiconResolver(options?: BuildLexiconResolverOptions): AtprotoLexiconResolver;
export declare const resolveLexicon: AtprotoLexiconResolver;
/**
 * Resolve the DID authority for a Lexicon from the network using DNS, based on its NSID.
 * @param input NSID or string representing one for which to lookup its Lexicon DID authority.
 */
export declare function resolveLexiconDidAuthority(input: NSID | NsidString): Promise<DidString | undefined>;
export declare class LexiconResolutionError extends Error {
    readonly nsid: NSID;
    readonly description: string;
    constructor(nsid: NSID, description?: string, options?: ErrorOptions);
    static from(input: NSID | string, description?: string, options?: ErrorOptions): LexiconResolutionError;
}
//# sourceMappingURL=lexicon.d.ts.map
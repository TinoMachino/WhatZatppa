import { LexResolver } from '@atproto/lex-resolver';
import { Nsid } from '@atproto/oauth-scopes';
import { CachedGetter } from '@atproto-labs/simple-store';
import { LexiconData, LexiconStore } from './lexicon-store.js';
/**
 * This utility class handles the retrieval and caching of lexicon
 * data. In particular, it handles failed retrieval attempts by returning cached
 * data.
 *
 * @private
 */
export declare class LexiconGetter extends CachedGetter<Nsid, LexiconData> {
    constructor(store: LexiconStore, lexResolver: LexResolver);
}
//# sourceMappingURL=lexicon-getter.d.ts.map
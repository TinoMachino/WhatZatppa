"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexiconGetter = void 0;
const lex_resolver_1 = require("@atproto/lex-resolver");
const simple_store_1 = require("@atproto-labs/simple-store");
const constants_js_1 = require("../constants.js");
/**
 * This utility class handles the retrieval and caching of lexicon
 * data. In particular, it handles failed retrieval attempts by returning cached
 * data.
 *
 * @private
 */
class LexiconGetter extends simple_store_1.CachedGetter {
    constructor(store, lexResolver) {
        super(async (input, options, storedData) => {
            const now = new Date();
            const result = await lexResolver.get(input, options).catch((err) => {
                // We swallow LexiconResolutionError errors, returning potentially
                // "null" values here to avoid hammering the resolver with requests
                // for the same lexicon that is known to be unavailable. The getter
                // should be called again based on the isStale() function below.
                if (err instanceof lex_resolver_1.LexResolverError)
                    return undefined;
                // Unexpected error are propagated
                throw err;
            });
            return {
                // Keep original createdAt, if available
                createdAt: storedData?.createdAt ?? now,
                // Always update updatedAt
                updatedAt: now,
                // Update the data with fresh data, if available, or keep cached
                // values (if any) otherwise.
                lastSucceededAt: result ? now : storedData?.lastSucceededAt ?? null,
                uri: result ? result.uri.toString() : storedData?.uri ?? null,
                lexicon: result ? result.lexicon : storedData?.lexicon ?? null,
            };
        }, {
            set: async (nsid, data) => store.storeLexicon(nsid, data),
            get: async (nsid) => (await store.findLexicon(nsid)) ?? undefined,
            del: async (nsid) => store.deleteLexicon(nsid),
        }, {
            isStale: (nsid, data) => {
                const timeSinceLastUpdate = Date.now() - data.updatedAt.getTime();
                return timeSinceLastUpdate >= constants_js_1.LEXICON_REFRESH_FREQUENCY;
            },
        });
    }
}
exports.LexiconGetter = LexiconGetter;
//# sourceMappingURL=lexicon-getter.js.map
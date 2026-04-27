import { Awaitable } from '../lib/util/type.js';
import { LexiconData, LexiconDocument } from './lexicon-data.js';
export type { Awaitable, LexiconData, LexiconDocument };
export interface LexiconStore {
    findLexicon(nsid: string): Awaitable<LexiconData | null>;
    storeLexicon(nsid: string, data: LexiconData): Awaitable<void>;
    deleteLexicon(nsid: string): Awaitable<void>;
}
export declare const isLexiconStore: <V extends Partial<LexiconStore>>(value: V) => value is V & import("../lib/util/type.js").RequiredDefined<LexiconStore>;
export declare function ifLexiconStore<V extends Partial<LexiconStore>>(implementation?: V): (V & LexiconStore) | undefined;
export declare function asLexiconStore<V extends Partial<LexiconStore>>(implementation?: V): V & LexiconStore;
//# sourceMappingURL=lexicon-store.d.ts.map
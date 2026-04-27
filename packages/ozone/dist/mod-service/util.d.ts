import AtpAgent from '@atproto/api';
import { Keypair } from '@atproto/crypto';
import { IdResolver } from '@atproto/identity';
import { LabelRow } from '../db/schema/label';
import { DbRef } from '../db/types';
import { Label } from '../lexicon/types/com/atproto/label/defs';
export type SignedLabel = Label & {
    sig: Uint8Array;
};
export declare const formatLabel: (row: LabelRow) => Label;
export declare const formatLabelRow: (label: Label, signingKeyId?: number) => Omit<LabelRow, "id">;
export declare const signLabel: (label: Label, signingKey: Keypair) => Promise<SignedLabel>;
export declare const isSafeUrl: (url: URL) => boolean;
export declare const getPdsAgentForRepo: (idResolver: IdResolver, did: string, devMode?: boolean) => Promise<{
    url: import("url").URL;
    agent: null;
} | {
    url: import("url").URL;
    agent: AtpAgent;
}>;
export declare const dateFromDatetime: (datetime: Date) => string;
export declare const dateFromDbDatetime: (dateRef: DbRef) => import("kysely").RawBuilder<string>;
//# sourceMappingURL=util.d.ts.map
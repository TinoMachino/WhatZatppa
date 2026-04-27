import { Timestamp } from '@bufbuild/protobuf';
import { AtUriString, Cid, InferInput, InferOutput, LexValue, RecordSchema, Schema, TypedLexMap } from '@atproto/lex';
import { Record as RecordEntry } from '../proto/bsky_pb';
export declare class HydrationMap<K, T> extends Map<K, T | null> implements Merges {
    merge(map: HydrationMap<K, T>): this;
}
export interface Merges {
    merge<T extends this>(map: T): this;
}
export type RecordInfo<T extends TypedLexMap> = {
    record: T;
    cid: string;
    sortedAt: Date;
    indexedAt: Date;
    takedownRef: string | undefined;
};
export declare const mergeMaps: <V extends HydrationMap<any, any>>(mapA?: V, mapB?: V) => V | undefined;
export declare const mergeNestedMaps: <K, V extends HydrationMap<any, any>>(mapA?: HydrationMap<K, V>, mapB?: HydrationMap<K, V>) => HydrationMap<K, V> | undefined;
export declare const mergeManyMaps: <K, T>(...maps: HydrationMap<K, T>[]) => HydrationMap<K, T> | undefined;
export type ItemRef = {
    uri: AtUriString;
    cid?: string;
};
export declare function parseRecord<TSchema extends RecordSchema>(recordSchema: TSchema, recordEntry: RecordEntry, includeTakedowns: boolean): RecordInfo<InferInput<TSchema>> | undefined;
/**
 * Decodes binary data containing a JSON representation of a Lex value, and
 * validates it against the provided schema, in parse mode (i.e., allowing
 * coercion & defaults).
 *
 * Returns undefined if the input is empty (from dataplane's empty value
 * convention), or if the validation fails.
 */
export declare const parseJsonBytes: <TSchema extends Schema<LexValue>>(schema: TSchema, bytes: Uint8Array | undefined) => InferOutput<TSchema> | undefined;
export declare const parseString: <T extends string | undefined>(str: undefined | string) => T | undefined;
export declare const parseCid: (cidStr: string | undefined) => Cid | null;
export declare const parseDate: (timestamp: Timestamp | undefined) => Date | undefined;
export declare const urisByCollection: <T extends string>(uris: Iterable<T>) => Map<string, T[]>;
export declare const split: <T>(items: T[], predicate: (item: T) => boolean) => [T[], T[]];
export declare const safeTakedownRef: (obj?: {
    takenDown: boolean;
    takedownRef: string;
}) => string | undefined;
export declare const isActivitySubscriptionEnabled: ({ post, reply, }: {
    post: boolean;
    reply: boolean;
}) => boolean;
//# sourceMappingURL=util.d.ts.map
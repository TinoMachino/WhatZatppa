/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import { ErrorFrame } from '@atproto/xrpc-server';
import type * as ComAtprotoLabelDefs from './defs.js';
export type QueryParams = {
    /** The last known event seq number to backfill from. */
    cursor?: number;
};
export type OutputSchema = $Typed<Labels> | $Typed<Info> | {
    $type: string;
};
export type HandlerError = ErrorFrame<'FutureCursor'>;
export type HandlerOutput = HandlerError | OutputSchema;
export interface Labels {
    $type?: 'com.atproto.label.subscribeLabels#labels';
    seq: number;
    labels: ComAtprotoLabelDefs.Label[];
}
export declare function isLabels<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.label.subscribeLabels", "labels">;
export declare function validateLabels<V>(v: V): ValidationResult<Labels & V>;
export interface Info {
    $type?: 'com.atproto.label.subscribeLabels#info';
    name: 'OutdatedCursor' | (string & {});
    message?: string;
}
export declare function isInfo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.label.subscribeLabels", "info">;
export declare function validateInfo<V>(v: V): ValidationResult<Info & V>;
//# sourceMappingURL=subscribeLabels.d.ts.map
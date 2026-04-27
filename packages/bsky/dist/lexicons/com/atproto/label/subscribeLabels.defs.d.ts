import { l } from '@atproto/lex';
import * as LabelDefs from './defs.defs.js';
declare const $nsid = "com.atproto.label.subscribeLabels";
export { $nsid };
/** Subscribe to stream of labels (and negations). Public endpoint implemented by mod services. Uses same sequencing scheme as repo event stream. */
declare const main: l.Subscription<"com.atproto.label.subscribeLabels", l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.IntegerSchema>;
}>, l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Labels, Labels>>, l.TypedRefSchema<l.TypedObjectValidator<Info, Info>>], false>, readonly ["FutureCursor"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Message = l.InferSubscriptionMessage<typeof main>;
export declare const $lxm: "com.atproto.label.subscribeLabels", $params: l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.IntegerSchema>;
}>, $message: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Labels, Labels>>, l.TypedRefSchema<l.TypedObjectValidator<Info, Info>>], false>;
type Labels = {
    $type?: 'com.atproto.label.subscribeLabels#labels';
    seq: number;
    labels: LabelDefs.Label[];
};
export type { Labels };
declare const labels: l.TypedObjectSchema<"com.atproto.label.subscribeLabels#labels", l.Validator<Labels, Labels>>;
export { labels };
type Info = {
    $type?: 'com.atproto.label.subscribeLabels#info';
    name: 'OutdatedCursor' | l.UnknownString;
    message?: string;
};
export type { Info };
declare const info: l.TypedObjectSchema<"com.atproto.label.subscribeLabels#info", l.Validator<Info, Info>>;
export { info };
//# sourceMappingURL=subscribeLabels.defs.d.ts.map
import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getTrends";
export { $nsid };
/** Get the current trends on the network */
declare const main: l.Query<"app.bsky.unspecced.getTrends", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    trends: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendView, UnspeccedDefs.TrendView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getTrends", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    trends: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendView, UnspeccedDefs.TrendView>>>;
}>>;
//# sourceMappingURL=getTrends.defs.d.ts.map
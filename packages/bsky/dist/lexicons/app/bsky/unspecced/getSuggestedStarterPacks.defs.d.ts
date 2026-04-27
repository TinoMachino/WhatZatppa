import { l } from '@atproto/lex';
import * as GraphDefs from '../graph/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getSuggestedStarterPacks";
export { $nsid };
/** Get a list of suggested starterpacks */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedStarterPacks", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackView, GraphDefs.StarterPackView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedStarterPacks", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackView, GraphDefs.StarterPackView>>>;
}>>;
//# sourceMappingURL=getSuggestedStarterPacks.defs.d.ts.map
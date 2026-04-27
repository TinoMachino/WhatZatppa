import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.searchStarterPacks";
export { $nsid };
/** Find starter packs matching search criteria. Does not require auth. */
declare const main: l.Query<"app.bsky.graph.searchStarterPacks", l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackViewBasic, GraphDefs.StarterPackViewBasic>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.searchStarterPacks", $params: l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackViewBasic, GraphDefs.StarterPackViewBasic>>>;
}>>;
//# sourceMappingURL=searchStarterPacks.defs.d.ts.map
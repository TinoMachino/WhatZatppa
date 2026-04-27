import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getStarterPacks";
export { $nsid };
/** Get views for a list of starter packs. */
declare const main: l.Query<"app.bsky.graph.getStarterPacks", l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackViewBasic, GraphDefs.StarterPackViewBasic>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getStarterPacks", $params: l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackViewBasic, GraphDefs.StarterPackViewBasic>>>;
}>>;
//# sourceMappingURL=getStarterPacks.defs.d.ts.map
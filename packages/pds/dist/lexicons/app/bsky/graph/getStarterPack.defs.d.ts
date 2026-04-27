import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getStarterPack";
export { $nsid };
/** Gets a view of a starter pack. */
declare const main: l.Query<"app.bsky.graph.getStarterPack", l.ParamsSchema<{
    readonly starterPack: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    starterPack: l.RefSchema<l.Validator<GraphDefs.StarterPackView, GraphDefs.StarterPackView>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getStarterPack", $params: l.ParamsSchema<{
    readonly starterPack: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    starterPack: l.RefSchema<l.Validator<GraphDefs.StarterPackView, GraphDefs.StarterPackView>>;
}>>;
//# sourceMappingURL=getStarterPack.defs.d.ts.map
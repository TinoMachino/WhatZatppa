import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getActorStarterPacks";
export { $nsid };
/** Get a list of starter packs created by the actor. */
declare const main: l.Query<"app.bsky.graph.getActorStarterPacks", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
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
export declare const $lxm: "app.bsky.graph.getActorStarterPacks", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    starterPacks: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.StarterPackViewBasic, GraphDefs.StarterPackViewBasic>>>;
}>>;
//# sourceMappingURL=getActorStarterPacks.defs.d.ts.map
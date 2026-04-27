import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.graph.getBlocks";
export { $nsid };
/** Enumerates which accounts the requesting account is currently blocking. Requires auth. */
declare const main: l.Query<"app.bsky.graph.getBlocks", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    blocks: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getBlocks", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    blocks: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>;
//# sourceMappingURL=getBlocks.defs.d.ts.map
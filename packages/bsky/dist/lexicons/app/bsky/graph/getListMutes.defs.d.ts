import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getListMutes";
export { $nsid };
/** Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth. */
declare const main: l.Query<"app.bsky.graph.getListMutes", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    lists: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getListMutes", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    lists: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>>;
}>>;
//# sourceMappingURL=getListMutes.defs.d.ts.map
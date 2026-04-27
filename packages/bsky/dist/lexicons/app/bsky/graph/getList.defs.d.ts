import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getList";
export { $nsid };
/** Gets a 'view' (with additional context) of a specified list. */
declare const main: l.Query<"app.bsky.graph.getList", l.ParamsSchema<{
    readonly list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    list: l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>;
    items: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListItemView, GraphDefs.ListItemView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getList", $params: l.ParamsSchema<{
    readonly list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    list: l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>;
    items: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListItemView, GraphDefs.ListItemView>>>;
}>>;
//# sourceMappingURL=getList.defs.d.ts.map
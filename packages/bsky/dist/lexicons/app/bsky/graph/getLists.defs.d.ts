import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getLists";
export { $nsid };
/** Enumerates the lists created by a specified account (actor). */
declare const main: l.Query<"app.bsky.graph.getLists", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly purposes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        knownValues: ["modlist", "curatelist"];
    }>>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    lists: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getLists", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly purposes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        knownValues: ["modlist", "curatelist"];
    }>>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    lists: l.ArraySchema<l.RefSchema<l.Validator<GraphDefs.ListView, GraphDefs.ListView>>>;
}>>;
//# sourceMappingURL=getLists.defs.d.ts.map
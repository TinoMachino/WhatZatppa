import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getListsWithMembership";
export { $nsid };
/** Enumerates the lists created by the session user, and includes membership information about `actor` in those lists. Only supports curation and moderation lists (no reference lists, used in starter packs). Requires auth. */
declare const main: l.Query<"app.bsky.graph.getListsWithMembership", l.ParamsSchema<{
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
    listsWithMembership: l.ArraySchema<l.RefSchema<l.Validator<ListWithMembership, ListWithMembership>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getListsWithMembership", $params: l.ParamsSchema<{
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
    listsWithMembership: l.ArraySchema<l.RefSchema<l.Validator<ListWithMembership, ListWithMembership>>>;
}>>;
/** A list and an optional list item indicating membership of a target user to that list. */
type ListWithMembership = {
    $type?: 'app.bsky.graph.getListsWithMembership#listWithMembership';
    list: GraphDefs.ListView;
    listItem?: GraphDefs.ListItemView;
};
export type { ListWithMembership };
/** A list and an optional list item indicating membership of a target user to that list. */
declare const listWithMembership: l.TypedObjectSchema<"app.bsky.graph.getListsWithMembership#listWithMembership", l.Validator<ListWithMembership, ListWithMembership>>;
export { listWithMembership };
//# sourceMappingURL=getListsWithMembership.defs.d.ts.map
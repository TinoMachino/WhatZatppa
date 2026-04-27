import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getStarterPacksWithMembership";
export { $nsid };
/** Enumerates the starter packs created by the session user, and includes membership information about `actor` in those starter packs. Requires auth. */
declare const main: l.Query<"app.bsky.graph.getStarterPacksWithMembership", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    starterPacksWithMembership: l.ArraySchema<l.RefSchema<l.Validator<StarterPackWithMembership, StarterPackWithMembership>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getStarterPacksWithMembership", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    starterPacksWithMembership: l.ArraySchema<l.RefSchema<l.Validator<StarterPackWithMembership, StarterPackWithMembership>>>;
}>>;
/** A starter pack and an optional list item indicating membership of a target user to that starter pack. */
type StarterPackWithMembership = {
    $type?: 'app.bsky.graph.getStarterPacksWithMembership#starterPackWithMembership';
    starterPack: GraphDefs.StarterPackView;
    listItem?: GraphDefs.ListItemView;
};
export type { StarterPackWithMembership };
/** A starter pack and an optional list item indicating membership of a target user to that starter pack. */
declare const starterPackWithMembership: l.TypedObjectSchema<"app.bsky.graph.getStarterPacksWithMembership#starterPackWithMembership", l.Validator<StarterPackWithMembership, StarterPackWithMembership>>;
export { starterPackWithMembership };
//# sourceMappingURL=getStarterPacksWithMembership.defs.d.ts.map
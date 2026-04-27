import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getSuggestedUsersForDiscover";
export { $nsid };
/** Get a list of suggested users for the Discover page */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedUsersForDiscover", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedUsersForDiscover", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getSuggestedUsersForDiscover.defs.d.ts.map
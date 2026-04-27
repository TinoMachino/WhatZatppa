import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.searchActors";
export { $nsid };
/** Find actors (profiles) matching search criteria. Does not require auth. */
declare const main: l.Query<"app.bsky.actor.searchActors", l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.searchActors", $params: l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>;
//# sourceMappingURL=searchActors.defs.d.ts.map
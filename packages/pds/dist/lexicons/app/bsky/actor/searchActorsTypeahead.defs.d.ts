import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.searchActorsTypeahead";
export { $nsid };
/** Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth. */
declare const main: l.Query<"app.bsky.actor.searchActorsTypeahead", l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.searchActorsTypeahead", $params: l.ParamsSchema<{
    readonly term: l.OptionalSchema<l.StringSchema<{}>>;
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewBasic, ActorDefs.ProfileViewBasic>>>;
}>>;
//# sourceMappingURL=searchActorsTypeahead.defs.d.ts.map
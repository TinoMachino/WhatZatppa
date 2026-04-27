import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.contact.getMatches";
export { $nsid };
/** Returns the matched contacts (contacts that were mutually imported). Excludes dismissed matches. Requires authentication. */
declare const main: l.Query<"app.bsky.contact.getMatches", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    matches: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>, readonly ["InvalidDid", "InvalidLimit", "InvalidCursor", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.getMatches", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    matches: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
}>>;
//# sourceMappingURL=getMatches.defs.d.ts.map
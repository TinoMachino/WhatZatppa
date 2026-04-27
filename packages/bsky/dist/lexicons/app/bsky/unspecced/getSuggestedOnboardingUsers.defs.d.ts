import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getSuggestedOnboardingUsers";
export { $nsid };
/** Get a list of suggested users for onboarding */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedOnboardingUsers", l.ParamsSchema<{
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recId: l.OptionalSchema<l.StringSchema<{}>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedOnboardingUsers", $params: l.ParamsSchema<{
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actors: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recId: l.OptionalSchema<l.StringSchema<{}>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getSuggestedOnboardingUsers.defs.d.ts.map
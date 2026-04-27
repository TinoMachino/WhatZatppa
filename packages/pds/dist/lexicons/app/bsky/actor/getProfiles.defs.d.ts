import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.getProfiles";
export { $nsid };
/** Get detailed profile views of multiple actors. */
declare const main: l.Query<"app.bsky.actor.getProfiles", l.ParamsSchema<{
    readonly actors: l.ArraySchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    profiles: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewDetailed, ActorDefs.ProfileViewDetailed>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.getProfiles", $params: l.ParamsSchema<{
    readonly actors: l.ArraySchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    profiles: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileViewDetailed, ActorDefs.ProfileViewDetailed>>>;
}>>;
//# sourceMappingURL=getProfiles.defs.d.ts.map
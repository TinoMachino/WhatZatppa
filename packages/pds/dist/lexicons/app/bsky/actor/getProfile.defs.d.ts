import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.getProfile";
export { $nsid };
/** Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth. */
declare const main: l.Query<"app.bsky.actor.getProfile", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<ActorDefs.ProfileViewDetailed, ActorDefs.ProfileViewDetailed>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.getProfile", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ActorDefs.ProfileViewDetailed, ActorDefs.ProfileViewDetailed>>>;
//# sourceMappingURL=getProfile.defs.d.ts.map
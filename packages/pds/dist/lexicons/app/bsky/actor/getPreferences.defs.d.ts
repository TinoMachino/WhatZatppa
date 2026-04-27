import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.getPreferences";
export { $nsid };
/** Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth. */
declare const main: l.Query<"app.bsky.actor.getPreferences", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<ActorDefs.Preferences, ActorDefs.Preferences>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.getPreferences", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<ActorDefs.Preferences, ActorDefs.Preferences>>;
}>>;
//# sourceMappingURL=getPreferences.defs.d.ts.map
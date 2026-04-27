import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "app.bsky.actor.putPreferences";
export { $nsid };
/** Set the private preferences attached to the account. */
declare const main: l.Procedure<"app.bsky.actor.putPreferences", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<ActorDefs.Preferences, ActorDefs.Preferences>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.actor.putPreferences", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<ActorDefs.Preferences, ActorDefs.Preferences>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=putPreferences.defs.d.ts.map
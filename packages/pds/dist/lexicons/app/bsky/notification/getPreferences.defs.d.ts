import { l } from '@atproto/lex';
import * as NotificationDefs from './defs.defs.js';
declare const $nsid = "app.bsky.notification.getPreferences";
export { $nsid };
/** Get notification-related preferences for an account. Requires auth. */
declare const main: l.Query<"app.bsky.notification.getPreferences", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<NotificationDefs.Preferences, NotificationDefs.Preferences>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.getPreferences", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<NotificationDefs.Preferences, NotificationDefs.Preferences>>;
}>>;
//# sourceMappingURL=getPreferences.defs.d.ts.map
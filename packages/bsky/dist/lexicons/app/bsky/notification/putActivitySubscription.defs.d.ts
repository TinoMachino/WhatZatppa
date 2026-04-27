import { l } from '@atproto/lex';
import * as NotificationDefs from './defs.defs.js';
declare const $nsid = "app.bsky.notification.putActivitySubscription";
export { $nsid };
/** Puts an activity subscription entry. The key should be omitted for creation and provided for updates. Requires auth. */
declare const main: l.Procedure<"app.bsky.notification.putActivitySubscription", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
    activitySubscription: l.RefSchema<l.Validator<NotificationDefs.ActivitySubscription, NotificationDefs.ActivitySubscription>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
    activitySubscription: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.ActivitySubscription, NotificationDefs.ActivitySubscription>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.putActivitySubscription", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
    activitySubscription: l.RefSchema<l.Validator<NotificationDefs.ActivitySubscription, NotificationDefs.ActivitySubscription>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    subject: l.StringSchema<{
        readonly format: "did";
    }>;
    activitySubscription: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.ActivitySubscription, NotificationDefs.ActivitySubscription>>>;
}>>;
//# sourceMappingURL=putActivitySubscription.defs.d.ts.map
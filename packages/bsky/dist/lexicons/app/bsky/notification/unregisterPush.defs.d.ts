import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.unregisterPush";
export { $nsid };
/** The inverse of registerPush - inform a specified service that push notifications should no longer be sent to the given token for the requesting account. Requires auth. */
declare const main: l.Procedure<"app.bsky.notification.unregisterPush", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    serviceDid: l.StringSchema<{
        readonly format: "did";
    }>;
    token: l.StringSchema<{}>;
    platform: l.StringSchema<{
        knownValues: ["ios", "android", "web"];
    }>;
    appId: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.unregisterPush", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    serviceDid: l.StringSchema<{
        readonly format: "did";
    }>;
    token: l.StringSchema<{}>;
    platform: l.StringSchema<{
        knownValues: ["ios", "android", "web"];
    }>;
    appId: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=unregisterPush.defs.d.ts.map
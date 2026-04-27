import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getConfig";
export { $nsid };
/** Get miscellaneous runtime configuration. */
declare const main: l.Query<"app.bsky.unspecced.getConfig", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    checkEmailConfirmed: l.OptionalSchema<l.BooleanSchema>;
    liveNow: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<LiveNowConfig, LiveNowConfig>>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getConfig", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    checkEmailConfirmed: l.OptionalSchema<l.BooleanSchema>;
    liveNow: l.OptionalSchema<l.ArraySchema<l.RefSchema<l.Validator<LiveNowConfig, LiveNowConfig>>>>;
}>>;
type LiveNowConfig = {
    $type?: 'app.bsky.unspecced.getConfig#liveNowConfig';
    did: l.DidString;
    domains: string[];
};
export type { LiveNowConfig };
declare const liveNowConfig: l.TypedObjectSchema<"app.bsky.unspecced.getConfig#liveNowConfig", l.Validator<LiveNowConfig, LiveNowConfig>>;
export { liveNowConfig };
//# sourceMappingURL=getConfig.defs.d.ts.map
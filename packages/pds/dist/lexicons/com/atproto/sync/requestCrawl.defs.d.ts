import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.requestCrawl";
export { $nsid };
/** Request a service to persistently crawl hosted repos. Expected use is new PDS instances declaring their existence to Relays. Does not require auth. */
declare const main: l.Procedure<"com.atproto.sync.requestCrawl", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, readonly ["HostBanned"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.requestCrawl", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=requestCrawl.defs.d.ts.map
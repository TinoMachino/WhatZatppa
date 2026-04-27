import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.notifyOfUpdate";
export { $nsid };
/**
 * Notify a crawling service of a recent update, and that crawling should resume. Intended use is after a gap between repo stream events caused the crawling service to disconnect. Does not require auth; implemented by Relay.
 * @deprecated just use com.atproto.sync.requestCrawl
 */
declare const main: l.Procedure<"com.atproto.sync.notifyOfUpdate", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.notifyOfUpdate", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=notifyOfUpdate.defs.d.ts.map
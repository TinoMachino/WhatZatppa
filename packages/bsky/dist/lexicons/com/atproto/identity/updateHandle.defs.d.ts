import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.updateHandle";
export { $nsid };
/** Updates the current account's handle. Verifies handle validity, and updates did:plc document if necessary. Implemented by PDS, and requires auth. */
declare const main: l.Procedure<"com.atproto.identity.updateHandle", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.updateHandle", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateHandle.defs.d.ts.map
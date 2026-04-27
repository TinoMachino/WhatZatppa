import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.identity.submitPlcOperation";
export { $nsid };
/** Validates a PLC operation to ensure that it doesn't violate a service's constraints or get the identity into a bad state, then submits it to the PLC registry */
declare const main: l.Procedure<"com.atproto.identity.submitPlcOperation", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    operation: l.LexMapSchema;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.submitPlcOperation", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    operation: l.LexMapSchema;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=submitPlcOperation.defs.d.ts.map
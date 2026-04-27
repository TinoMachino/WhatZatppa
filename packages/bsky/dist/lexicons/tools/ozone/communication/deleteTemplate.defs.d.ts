import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.communication.deleteTemplate";
export { $nsid };
/** Delete a communication template. */
declare const main: l.Procedure<"tools.ozone.communication.deleteTemplate", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.communication.deleteTemplate", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteTemplate.defs.d.ts.map
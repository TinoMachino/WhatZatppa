import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.contact.removeData";
export { $nsid };
/** Removes all stored hashes used for contact matching, existing matches, and sync status. Requires authentication. */
declare const main: l.Procedure<"app.bsky.contact.removeData", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, readonly ["InvalidDid", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.removeData", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=removeData.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.uploadBlob";
export { $nsid };
/** Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS. */
declare const main: l.Procedure<"com.atproto.repo.uploadBlob", l.ParamsSchema<{}>, l.Payload<"*/*", undefined>, l.Payload<"application/json", l.ObjectSchema<{
    blob: l.BlobSchema<{}>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.uploadBlob", $params: l.ParamsSchema<{}>, $input: l.Payload<"*/*", undefined>, $output: l.Payload<"application/json", l.ObjectSchema<{
    blob: l.BlobSchema<{}>;
}>>;
//# sourceMappingURL=uploadBlob.defs.d.ts.map
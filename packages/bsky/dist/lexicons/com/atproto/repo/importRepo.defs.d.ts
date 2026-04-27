import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.importRepo";
export { $nsid };
/** Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set. */
declare const main: l.Procedure<"com.atproto.repo.importRepo", l.ParamsSchema<{}>, l.Payload<"application/vnd.ipld.car", undefined>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.importRepo", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/vnd.ipld.car", undefined>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=importRepo.defs.d.ts.map
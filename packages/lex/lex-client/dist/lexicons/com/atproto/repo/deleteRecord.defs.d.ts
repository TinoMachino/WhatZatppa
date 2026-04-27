import { l } from '@atproto/lex-schema';
import * as RepoDefs from './defs.defs.js';
declare const $nsid = "com.atproto.repo.deleteRecord";
export { $nsid };
/** Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS. */
declare const main: l.Procedure<"com.atproto.repo.deleteRecord", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
    swapRecord: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    swapCommit: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    commit: l.OptionalSchema<l.RefSchema<l.Validator<RepoDefs.CommitMeta, RepoDefs.CommitMeta>>>;
}>>, readonly ["InvalidSwap"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.deleteRecord", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    rkey: l.StringSchema<{
        readonly format: "record-key";
    }>;
    swapRecord: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    swapCommit: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    commit: l.OptionalSchema<l.RefSchema<l.Validator<RepoDefs.CommitMeta, RepoDefs.CommitMeta>>>;
}>>;
//# sourceMappingURL=deleteRecord.defs.d.ts.map
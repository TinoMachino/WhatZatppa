import { l } from '@atproto/lex';
import * as RepoDefs from './defs.defs.js';
declare const $nsid = "com.atproto.repo.createRecord";
export { $nsid };
/** Create a single new repository record. Requires auth, implemented by PDS. */
declare const main: l.Procedure<"com.atproto.repo.createRecord", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    rkey: l.OptionalSchema<l.StringSchema<{
        readonly format: "record-key";
        readonly maxLength: 512;
    }>>;
    validate: l.OptionalSchema<l.BooleanSchema>;
    record: l.LexMapSchema;
    swapCommit: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    commit: l.OptionalSchema<l.RefSchema<l.Validator<RepoDefs.CommitMeta, RepoDefs.CommitMeta>>>;
    validationStatus: l.OptionalSchema<l.StringSchema<{
        knownValues: ["valid", "unknown"];
    }>>;
}>>, readonly ["InvalidSwap"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.repo.createRecord", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    repo: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    collection: l.StringSchema<{
        readonly format: "nsid";
    }>;
    rkey: l.OptionalSchema<l.StringSchema<{
        readonly format: "record-key";
        readonly maxLength: 512;
    }>>;
    validate: l.OptionalSchema<l.BooleanSchema>;
    record: l.LexMapSchema;
    swapCommit: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    commit: l.OptionalSchema<l.RefSchema<l.Validator<RepoDefs.CommitMeta, RepoDefs.CommitMeta>>>;
    validationStatus: l.OptionalSchema<l.StringSchema<{
        knownValues: ["valid", "unknown"];
    }>>;
}>>;
//# sourceMappingURL=createRecord.defs.d.ts.map
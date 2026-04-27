import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.checkAccountStatus";
export { $nsid };
/** Returns the status of an account, especially as pertaining to import or recovery. Can be called many times over the course of an account migration. Requires auth and can only be called pertaining to oneself. */
declare const main: l.Query<"com.atproto.server.checkAccountStatus", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    activated: l.BooleanSchema;
    validDid: l.BooleanSchema;
    repoCommit: l.StringSchema<{
        readonly format: "cid";
    }>;
    repoRev: l.StringSchema<{}>;
    repoBlocks: l.IntegerSchema;
    indexedRecords: l.IntegerSchema;
    privateStateValues: l.IntegerSchema;
    expectedBlobs: l.IntegerSchema;
    importedBlobs: l.IntegerSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.checkAccountStatus", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    activated: l.BooleanSchema;
    validDid: l.BooleanSchema;
    repoCommit: l.StringSchema<{
        readonly format: "cid";
    }>;
    repoRev: l.StringSchema<{}>;
    repoBlocks: l.IntegerSchema;
    indexedRecords: l.IntegerSchema;
    privateStateValues: l.IntegerSchema;
    expectedBlobs: l.IntegerSchema;
    importedBlobs: l.IntegerSchema;
}>>;
//# sourceMappingURL=checkAccountStatus.defs.d.ts.map
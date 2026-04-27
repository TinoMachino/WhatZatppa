import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.deactivateAccount";
export { $nsid };
/** Deactivates a currently active account. Stops serving of repo, and future writes to repo until reactivated. Used to finalize account migration with the old host after the account has been activated on the new host. */
declare const main: l.Procedure<"com.atproto.server.deactivateAccount", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    deleteAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.deactivateAccount", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    deleteAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deactivateAccount.defs.d.ts.map
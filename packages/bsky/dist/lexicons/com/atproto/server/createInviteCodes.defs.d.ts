import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.createInviteCodes";
export { $nsid };
/** Create invite codes. */
declare const main: l.Procedure<"com.atproto.server.createInviteCodes", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    codeCount: l.WithDefaultSchema<l.IntegerSchema>;
    useCount: l.IntegerSchema;
    forAccounts: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    codes: l.ArraySchema<l.RefSchema<l.Validator<AccountCodes, AccountCodes>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.createInviteCodes", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    codeCount: l.WithDefaultSchema<l.IntegerSchema>;
    useCount: l.IntegerSchema;
    forAccounts: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    codes: l.ArraySchema<l.RefSchema<l.Validator<AccountCodes, AccountCodes>>>;
}>>;
type AccountCodes = {
    $type?: 'com.atproto.server.createInviteCodes#accountCodes';
    account: string;
    codes: string[];
};
export type { AccountCodes };
declare const accountCodes: l.TypedObjectSchema<"com.atproto.server.createInviteCodes#accountCodes", l.Validator<AccountCodes, AccountCodes>>;
export { accountCodes };
//# sourceMappingURL=createInviteCodes.defs.d.ts.map
import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.server.createAccount";
export { $nsid };
/** Create an account. Implemented by PDS. */
declare const main: l.Procedure<"com.atproto.server.createAccount", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.OptionalSchema<l.StringSchema<{}>>;
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    inviteCode: l.OptionalSchema<l.StringSchema<{}>>;
    verificationCode: l.OptionalSchema<l.StringSchema<{}>>;
    verificationPhone: l.OptionalSchema<l.StringSchema<{}>>;
    password: l.OptionalSchema<l.StringSchema<{}>>;
    recoveryKey: l.OptionalSchema<l.StringSchema<{}>>;
    plcOp: l.OptionalSchema<l.LexMapSchema>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    accessJwt: l.StringSchema<{}>;
    refreshJwt: l.StringSchema<{}>;
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    didDoc: l.OptionalSchema<l.LexMapSchema>;
}>>, readonly ["InvalidHandle", "InvalidPassword", "InvalidInviteCode", "HandleNotAvailable", "UnsupportedDomain", "UnresolvableDid", "IncompatibleDidDoc"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.createAccount", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.OptionalSchema<l.StringSchema<{}>>;
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    inviteCode: l.OptionalSchema<l.StringSchema<{}>>;
    verificationCode: l.OptionalSchema<l.StringSchema<{}>>;
    verificationPhone: l.OptionalSchema<l.StringSchema<{}>>;
    password: l.OptionalSchema<l.StringSchema<{}>>;
    recoveryKey: l.OptionalSchema<l.StringSchema<{}>>;
    plcOp: l.OptionalSchema<l.LexMapSchema>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    accessJwt: l.StringSchema<{}>;
    refreshJwt: l.StringSchema<{}>;
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    didDoc: l.OptionalSchema<l.LexMapSchema>;
}>>;
//# sourceMappingURL=createAccount.defs.d.ts.map
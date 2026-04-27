import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.server.createSession";
export { $nsid };
/** Create an authentication session. */
declare const main: l.Procedure<"com.atproto.server.createSession", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    identifier: l.StringSchema<{}>;
    password: l.StringSchema<{}>;
    authFactorToken: l.OptionalSchema<l.StringSchema<{}>>;
    allowTakendown: l.OptionalSchema<l.BooleanSchema>;
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
    email: l.OptionalSchema<l.StringSchema<{}>>;
    emailConfirmed: l.OptionalSchema<l.BooleanSchema>;
    emailAuthFactor: l.OptionalSchema<l.BooleanSchema>;
    active: l.OptionalSchema<l.BooleanSchema>;
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["takendown", "suspended", "deactivated"];
    }>>;
}>>, readonly ["AccountTakedown", "AuthFactorTokenRequired"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.createSession", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    identifier: l.StringSchema<{}>;
    password: l.StringSchema<{}>;
    authFactorToken: l.OptionalSchema<l.StringSchema<{}>>;
    allowTakendown: l.OptionalSchema<l.BooleanSchema>;
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
    email: l.OptionalSchema<l.StringSchema<{}>>;
    emailConfirmed: l.OptionalSchema<l.BooleanSchema>;
    emailAuthFactor: l.OptionalSchema<l.BooleanSchema>;
    active: l.OptionalSchema<l.BooleanSchema>;
    status: l.OptionalSchema<l.StringSchema<{
        knownValues: ["takendown", "suspended", "deactivated"];
    }>>;
}>>;
//# sourceMappingURL=createSession.defs.d.ts.map
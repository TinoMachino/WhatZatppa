import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.server.refreshSession";
export { $nsid };
/** Refresh an authentication session. Requires auth using the 'refreshJwt' (not the 'accessJwt'). */
declare const main: l.Procedure<"com.atproto.server.refreshSession", l.ParamsSchema<{}>, l.Payload<undefined, undefined>, l.Payload<"application/json", l.ObjectSchema<{
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
}>>, readonly ["AccountTakedown", "InvalidToken", "ExpiredToken"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.refreshSession", $params: l.ParamsSchema<{}>, $input: l.Payload<undefined, undefined>, $output: l.Payload<"application/json", l.ObjectSchema<{
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
//# sourceMappingURL=refreshSession.defs.d.ts.map
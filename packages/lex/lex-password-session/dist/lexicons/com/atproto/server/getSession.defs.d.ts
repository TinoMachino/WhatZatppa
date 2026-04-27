import { l } from '@atproto/lex-schema';
declare const $nsid = "com.atproto.server.getSession";
export { $nsid };
/** Get information about the current auth session. Requires auth. */
declare const main: l.Query<"com.atproto.server.getSession", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
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
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.getSession", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
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
//# sourceMappingURL=getSession.defs.d.ts.map
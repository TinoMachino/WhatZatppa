import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.deleteAccount";
export { $nsid };
/** Delete an actor's account with a token and password. Can only be called after requesting a deletion token. Requires auth. */
declare const main: l.Procedure<"com.atproto.server.deleteAccount", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    password: l.StringSchema<{}>;
    token: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, readonly ["ExpiredToken", "InvalidToken"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.deleteAccount", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    password: l.StringSchema<{}>;
    token: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteAccount.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ServerDefs from '../server/defs.defs.js';
declare const $nsid = "com.atproto.admin.getInviteCodes";
export { $nsid };
/** Get an admin view of invite codes. */
declare const main: l.Query<"com.atproto.admin.getInviteCodes", l.ParamsSchema<{
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["recent", "usage"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    codes: l.ArraySchema<l.RefSchema<l.Validator<ServerDefs.InviteCode, ServerDefs.InviteCode>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.getInviteCodes", $params: l.ParamsSchema<{
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["recent", "usage"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    codes: l.ArraySchema<l.RefSchema<l.Validator<ServerDefs.InviteCode, ServerDefs.InviteCode>>>;
}>>;
//# sourceMappingURL=getInviteCodes.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ServerDefs from './defs.defs.js';
declare const $nsid = "com.atproto.server.getAccountInviteCodes";
export { $nsid };
/** Get all invite codes for the current account. Requires auth. */
declare const main: l.Query<"com.atproto.server.getAccountInviteCodes", l.ParamsSchema<{
    readonly includeUsed: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly createAvailable: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    codes: l.ArraySchema<l.RefSchema<l.Validator<ServerDefs.InviteCode, ServerDefs.InviteCode>>>;
}>>, readonly ["DuplicateCreate"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.getAccountInviteCodes", $params: l.ParamsSchema<{
    readonly includeUsed: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly createAvailable: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    codes: l.ArraySchema<l.RefSchema<l.Validator<ServerDefs.InviteCode, ServerDefs.InviteCode>>>;
}>>;
//# sourceMappingURL=getAccountInviteCodes.defs.d.ts.map
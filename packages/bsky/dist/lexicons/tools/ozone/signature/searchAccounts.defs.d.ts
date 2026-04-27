import { l } from '@atproto/lex';
import * as AdminDefs from '../../../com/atproto/admin/defs.defs.js';
declare const $nsid = "tools.ozone.signature.searchAccounts";
export { $nsid };
/** Search for accounts that match one or more threat signature values. */
declare const main: l.Query<"tools.ozone.signature.searchAccounts", l.ParamsSchema<{
    readonly values: l.ArraySchema<l.StringSchema<{}>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    accounts: l.ArraySchema<l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.signature.searchAccounts", $params: l.ParamsSchema<{
    readonly values: l.ArraySchema<l.StringSchema<{}>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    accounts: l.ArraySchema<l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
}>>;
//# sourceMappingURL=searchAccounts.defs.d.ts.map
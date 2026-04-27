import { l } from '@atproto/lex';
import * as AdminDefs from './defs.defs.js';
declare const $nsid = "com.atproto.admin.searchAccounts";
export { $nsid };
/** Get list of accounts that matches your search query. */
declare const main: l.Query<"com.atproto.admin.searchAccounts", l.ParamsSchema<{
    readonly email: l.OptionalSchema<l.StringSchema<{}>>;
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
export declare const $lxm: "com.atproto.admin.searchAccounts", $params: l.ParamsSchema<{
    readonly email: l.OptionalSchema<l.StringSchema<{}>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    accounts: l.ArraySchema<l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
}>>;
//# sourceMappingURL=searchAccounts.defs.d.ts.map
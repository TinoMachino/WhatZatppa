import { l } from '@atproto/lex';
import * as AdminDefs from '../../../com/atproto/admin/defs.defs.js';
import * as SignatureDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.signature.findRelatedAccounts";
export { $nsid };
/** Get accounts that share some matching threat signatures with the root account. */
declare const main: l.Query<"tools.ozone.signature.findRelatedAccounts", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    accounts: l.ArraySchema<l.RefSchema<l.Validator<RelatedAccount, RelatedAccount>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.signature.findRelatedAccounts", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    accounts: l.ArraySchema<l.RefSchema<l.Validator<RelatedAccount, RelatedAccount>>>;
}>>;
type RelatedAccount = {
    $type?: 'tools.ozone.signature.findRelatedAccounts#relatedAccount';
    account: AdminDefs.AccountView;
    similarities?: SignatureDefs.SigDetail[];
};
export type { RelatedAccount };
declare const relatedAccount: l.TypedObjectSchema<"tools.ozone.signature.findRelatedAccounts#relatedAccount", l.Validator<RelatedAccount, RelatedAccount>>;
export { relatedAccount };
//# sourceMappingURL=findRelatedAccounts.defs.d.ts.map
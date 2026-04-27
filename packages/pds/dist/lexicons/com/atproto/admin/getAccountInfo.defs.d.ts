import { l } from '@atproto/lex';
import * as AdminDefs from './defs.defs.js';
declare const $nsid = "com.atproto.admin.getAccountInfo";
export { $nsid };
/** Get details about an account. */
declare const main: l.Query<"com.atproto.admin.getAccountInfo", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.getAccountInfo", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
//# sourceMappingURL=getAccountInfo.defs.d.ts.map
import { l } from '@atproto/lex';
import * as AdminDefs from './defs.defs.js';
declare const $nsid = "com.atproto.admin.getAccountInfos";
export { $nsid };
/** Get details about some accounts. */
declare const main: l.Query<"com.atproto.admin.getAccountInfos", l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    infos: l.ArraySchema<l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.getAccountInfos", $params: l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    infos: l.ArraySchema<l.RefSchema<l.Validator<AdminDefs.AccountView, AdminDefs.AccountView>>>;
}>>;
//# sourceMappingURL=getAccountInfos.defs.d.ts.map
import { l } from '@atproto/lex';
import * as IdentityDefs from './defs.defs.js';
declare const $nsid = "com.atproto.identity.refreshIdentity";
export { $nsid };
/** Request that the server re-resolve an identity (DID and handle). The server may ignore this request, or require authentication, depending on the role, implementation, and policy of the server. */
declare const main: l.Procedure<"com.atproto.identity.refreshIdentity", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    identifier: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<IdentityDefs.IdentityInfo, IdentityDefs.IdentityInfo>>>, readonly ["HandleNotFound", "DidNotFound", "DidDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.refreshIdentity", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    identifier: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<IdentityDefs.IdentityInfo, IdentityDefs.IdentityInfo>>>;
//# sourceMappingURL=refreshIdentity.defs.d.ts.map
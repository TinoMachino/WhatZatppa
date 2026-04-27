import { l } from '@atproto/lex';
import * as IdentityDefs from './defs.defs.js';
declare const $nsid = "com.atproto.identity.resolveIdentity";
export { $nsid };
/** Resolves an identity (DID or Handle) to a full identity (DID document and verified handle). */
declare const main: l.Query<"com.atproto.identity.resolveIdentity", l.ParamsSchema<{
    readonly identifier: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<IdentityDefs.IdentityInfo, IdentityDefs.IdentityInfo>>>, readonly ["HandleNotFound", "DidNotFound", "DidDeactivated"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.identity.resolveIdentity", $params: l.ParamsSchema<{
    readonly identifier: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<IdentityDefs.IdentityInfo, IdentityDefs.IdentityInfo>>>;
//# sourceMappingURL=resolveIdentity.defs.d.ts.map
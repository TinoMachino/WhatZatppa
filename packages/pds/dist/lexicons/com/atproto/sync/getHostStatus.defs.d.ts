import { l } from '@atproto/lex';
import * as SyncDefs from './defs.defs.js';
declare const $nsid = "com.atproto.sync.getHostStatus";
export { $nsid };
/** Returns information about a specified upstream host, as consumed by the server. Implemented by relays. */
declare const main: l.Query<"com.atproto.sync.getHostStatus", l.ParamsSchema<{
    readonly hostname: l.StringSchema<{}>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
    seq: l.OptionalSchema<l.IntegerSchema>;
    accountCount: l.OptionalSchema<l.IntegerSchema>;
    status: l.OptionalSchema<l.RefSchema<l.Validator<SyncDefs.HostStatus, SyncDefs.HostStatus>>>;
}>>, readonly ["HostNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.getHostStatus", $params: l.ParamsSchema<{
    readonly hostname: l.StringSchema<{}>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    hostname: l.StringSchema<{}>;
    seq: l.OptionalSchema<l.IntegerSchema>;
    accountCount: l.OptionalSchema<l.IntegerSchema>;
    status: l.OptionalSchema<l.RefSchema<l.Validator<SyncDefs.HostStatus, SyncDefs.HostStatus>>>;
}>>;
//# sourceMappingURL=getHostStatus.defs.d.ts.map
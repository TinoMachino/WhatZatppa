import { l } from '@atproto/lex';
import * as SyncDefs from './defs.defs.js';
declare const $nsid = "com.atproto.sync.listHosts";
export { $nsid };
/** Enumerates upstream hosts (eg, PDS or relay instances) that this service consumes from. Implemented by relays. */
declare const main: l.Query<"com.atproto.sync.listHosts", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hosts: l.ArraySchema<l.RefSchema<l.Validator<Host, Host>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.sync.listHosts", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hosts: l.ArraySchema<l.RefSchema<l.Validator<Host, Host>>>;
}>>;
type Host = {
    $type?: 'com.atproto.sync.listHosts#host';
    /**
     * hostname of server; not a URL (no scheme)
     */
    hostname: string;
    /**
     * Recent repo stream event sequence number. May be delayed from actual stream processing (eg, persisted cursor not in-memory cursor).
     */
    seq?: number;
    accountCount?: number;
    status?: SyncDefs.HostStatus;
};
export type { Host };
declare const host: l.TypedObjectSchema<"com.atproto.sync.listHosts#host", l.Validator<Host, Host>>;
export { host };
//# sourceMappingURL=listHosts.defs.d.ts.map
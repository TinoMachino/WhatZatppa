import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.server.getConfig";
export { $nsid };
/** Get details about ozone's server configuration. */
declare const main: l.Query<"tools.ozone.server.getConfig", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    appview: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    pds: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    blobDivert: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    chat: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    viewer: l.OptionalSchema<l.RefSchema<l.Validator<ViewerConfig, ViewerConfig>>>;
    verifierDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.server.getConfig", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    appview: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    pds: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    blobDivert: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    chat: l.OptionalSchema<l.RefSchema<l.Validator<ServiceConfig, ServiceConfig>>>;
    viewer: l.OptionalSchema<l.RefSchema<l.Validator<ViewerConfig, ViewerConfig>>>;
    verifierDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>;
type ServiceConfig = {
    $type?: 'tools.ozone.server.getConfig#serviceConfig';
    url?: l.UriString;
};
export type { ServiceConfig };
declare const serviceConfig: l.TypedObjectSchema<"tools.ozone.server.getConfig#serviceConfig", l.Validator<ServiceConfig, ServiceConfig>>;
export { serviceConfig };
type ViewerConfig = {
    $type?: 'tools.ozone.server.getConfig#viewerConfig';
    role?: 'tools.ozone.team.defs#roleAdmin' | 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | 'tools.ozone.team.defs#roleVerifier' | l.UnknownString;
};
export type { ViewerConfig };
declare const viewerConfig: l.TypedObjectSchema<"tools.ozone.server.getConfig#viewerConfig", l.Validator<ViewerConfig, ViewerConfig>>;
export { viewerConfig };
//# sourceMappingURL=getConfig.defs.d.ts.map
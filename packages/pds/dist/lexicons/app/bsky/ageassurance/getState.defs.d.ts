import { l } from '@atproto/lex';
import * as AgeassuranceDefs from './defs.defs.js';
declare const $nsid = "app.bsky.ageassurance.getState";
export { $nsid };
/** Returns server-computed Age Assurance state, if available, and any additional metadata needed to compute Age Assurance state client-side. */
declare const main: l.Query<"app.bsky.ageassurance.getState", l.ParamsSchema<{
    readonly countryCode: l.StringSchema<{}>;
    readonly regionCode: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    state: l.RefSchema<l.Validator<AgeassuranceDefs.State, AgeassuranceDefs.State>>;
    metadata: l.RefSchema<l.Validator<AgeassuranceDefs.StateMetadata, AgeassuranceDefs.StateMetadata>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.ageassurance.getState", $params: l.ParamsSchema<{
    readonly countryCode: l.StringSchema<{}>;
    readonly regionCode: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    state: l.RefSchema<l.Validator<AgeassuranceDefs.State, AgeassuranceDefs.State>>;
    metadata: l.RefSchema<l.Validator<AgeassuranceDefs.StateMetadata, AgeassuranceDefs.StateMetadata>>;
}>>;
//# sourceMappingURL=getState.defs.d.ts.map
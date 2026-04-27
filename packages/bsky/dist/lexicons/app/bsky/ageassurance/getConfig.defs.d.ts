import { l } from '@atproto/lex';
import * as AgeassuranceDefs from './defs.defs.js';
declare const $nsid = "app.bsky.ageassurance.getConfig";
export { $nsid };
/** Returns Age Assurance configuration for use on the client. */
declare const main: l.Query<"app.bsky.ageassurance.getConfig", l.ParamsSchema<{}>, l.Payload<"application/json", l.RefSchema<l.Validator<AgeassuranceDefs.Config, AgeassuranceDefs.Config>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.ageassurance.getConfig", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<AgeassuranceDefs.Config, AgeassuranceDefs.Config>>>;
//# sourceMappingURL=getConfig.defs.d.ts.map
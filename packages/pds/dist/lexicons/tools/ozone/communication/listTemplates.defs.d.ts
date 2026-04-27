import { l } from '@atproto/lex';
import * as CommunicationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.communication.listTemplates";
export { $nsid };
/** Get list of all communication templates. */
declare const main: l.Query<"tools.ozone.communication.listTemplates", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    communicationTemplates: l.ArraySchema<l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.communication.listTemplates", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    communicationTemplates: l.ArraySchema<l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>;
}>>;
//# sourceMappingURL=listTemplates.defs.d.ts.map
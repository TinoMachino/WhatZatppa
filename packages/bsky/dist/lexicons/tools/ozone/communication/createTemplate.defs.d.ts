import { l } from '@atproto/lex';
import * as CommunicationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.communication.createTemplate";
export { $nsid };
/** Administrative action to create a new, re-usable communication (email for now) template. */
declare const main: l.Procedure<"tools.ozone.communication.createTemplate", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    contentMarkdown: l.StringSchema<{}>;
    subject: l.StringSchema<{}>;
    lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>, readonly ["DuplicateTemplateName"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.communication.createTemplate", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    contentMarkdown: l.StringSchema<{}>;
    subject: l.StringSchema<{}>;
    lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>;
//# sourceMappingURL=createTemplate.defs.d.ts.map
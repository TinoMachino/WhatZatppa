import { l } from '@atproto/lex';
import * as CommunicationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.communication.updateTemplate";
export { $nsid };
/** Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only. */
declare const main: l.Procedure<"tools.ozone.communication.updateTemplate", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
    name: l.OptionalSchema<l.StringSchema<{}>>;
    lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    contentMarkdown: l.OptionalSchema<l.StringSchema<{}>>;
    subject: l.OptionalSchema<l.StringSchema<{}>>;
    updatedBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    disabled: l.OptionalSchema<l.BooleanSchema>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>, readonly ["DuplicateTemplateName"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.communication.updateTemplate", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    id: l.StringSchema<{}>;
    name: l.OptionalSchema<l.StringSchema<{}>>;
    lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    contentMarkdown: l.OptionalSchema<l.StringSchema<{}>>;
    subject: l.OptionalSchema<l.StringSchema<{}>>;
    updatedBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    disabled: l.OptionalSchema<l.BooleanSchema>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<CommunicationDefs.TemplateView, CommunicationDefs.TemplateView>>>;
//# sourceMappingURL=updateTemplate.defs.d.ts.map
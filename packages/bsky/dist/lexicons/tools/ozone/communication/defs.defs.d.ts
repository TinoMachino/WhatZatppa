import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.communication.defs";
export { $nsid };
type TemplateView = {
    $type?: 'tools.ozone.communication.defs#templateView';
    id: string;
    /**
     * Name of the template.
     */
    name: string;
    /**
     * Content of the template, can contain markdown and variable placeholders.
     */
    subject?: string;
    /**
     * Subject of the message, used in emails.
     */
    contentMarkdown: string;
    disabled: boolean;
    /**
     * Message language.
     */
    lang?: l.LanguageString;
    /**
     * DID of the user who last updated the template.
     */
    lastUpdatedBy: l.DidString;
    createdAt: l.DatetimeString;
    updatedAt: l.DatetimeString;
};
export type { TemplateView };
declare const templateView: l.TypedObjectSchema<"tools.ozone.communication.defs#templateView", l.Validator<TemplateView, TemplateView>>;
export { templateView };
//# sourceMappingURL=defs.defs.d.ts.map
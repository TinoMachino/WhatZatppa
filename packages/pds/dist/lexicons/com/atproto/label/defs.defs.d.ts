import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.label.defs";
export { $nsid };
/** Metadata tag on an atproto resource (eg, repo or record). */
type Label = {
    $type?: 'com.atproto.label.defs#label';
    /**
     * The AT Protocol version of the label object.
     */
    ver?: number;
    /**
     * DID of the actor who created this label.
     */
    src: l.DidString;
    /**
     * AT URI of the record, repository (account), or other resource that this label applies to.
     */
    uri: l.UriString;
    /**
     * Optionally, CID specifying the specific version of 'uri' resource this label applies to.
     */
    cid?: l.CidString;
    /**
     * The short string name of the value or type of this label.
     */
    val: string;
    /**
     * If true, this is a negation label, overwriting a previous label.
     */
    neg?: boolean;
    /**
     * Timestamp when this label was created.
     */
    cts: l.DatetimeString;
    /**
     * Timestamp at which this label expires (no longer applies).
     */
    exp?: l.DatetimeString;
    /**
     * Signature of dag-cbor encoded label.
     */
    sig?: Uint8Array;
};
export type { Label };
/** Metadata tag on an atproto resource (eg, repo or record). */
declare const label: l.TypedObjectSchema<"com.atproto.label.defs#label", l.Validator<Label, Label>>;
export { label };
/** Metadata tags on an atproto record, published by the author within the record. */
type SelfLabels = {
    $type?: 'com.atproto.label.defs#selfLabels';
    values: SelfLabel[];
};
export type { SelfLabels };
/** Metadata tags on an atproto record, published by the author within the record. */
declare const selfLabels: l.TypedObjectSchema<"com.atproto.label.defs#selfLabels", l.Validator<SelfLabels, SelfLabels>>;
export { selfLabels };
/** Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel. */
type SelfLabel = {
    $type?: 'com.atproto.label.defs#selfLabel';
    /**
     * The short string name of the value or type of this label.
     */
    val: string;
};
export type { SelfLabel };
/** Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel. */
declare const selfLabel: l.TypedObjectSchema<"com.atproto.label.defs#selfLabel", l.Validator<SelfLabel, SelfLabel>>;
export { selfLabel };
/** Declares a label value and its expected interpretations and behaviors. */
type LabelValueDefinition = {
    $type?: 'com.atproto.label.defs#labelValueDefinition';
    /**
     * The value of the label being defined. Must only include lowercase ascii and the '-' character ([a-z-]+).
     */
    identifier: string;
    /**
     * How should a client visually convey this label? 'inform' means neutral and informational; 'alert' means negative and warning; 'none' means show nothing.
     */
    severity: 'inform' | 'alert' | 'none' | l.UnknownString;
    /**
     * What should this label hide in the UI, if applied? 'content' hides all of the target; 'media' hides the images/video/audio; 'none' hides nothing.
     */
    blurs: 'content' | 'media' | 'none' | l.UnknownString;
    /**
     * The default setting for this label.
     */
    defaultSetting?: 'ignore' | 'warn' | 'hide' | l.UnknownString;
    /**
     * Does the user need to have adult content enabled in order to configure this label?
     */
    adultOnly?: boolean;
    locales: LabelValueDefinitionStrings[];
};
export type { LabelValueDefinition };
/** Declares a label value and its expected interpretations and behaviors. */
declare const labelValueDefinition: l.TypedObjectSchema<"com.atproto.label.defs#labelValueDefinition", l.Validator<LabelValueDefinition, LabelValueDefinition>>;
export { labelValueDefinition };
/** Strings which describe the label in the UI, localized into a specific language. */
type LabelValueDefinitionStrings = {
    $type?: 'com.atproto.label.defs#labelValueDefinitionStrings';
    /**
     * The code of the language these strings are written in.
     */
    lang: l.LanguageString;
    /**
     * A short human-readable name for the label.
     */
    name: string;
    /**
     * A longer description of what the label means and why it might be applied.
     */
    description: string;
};
export type { LabelValueDefinitionStrings };
/** Strings which describe the label in the UI, localized into a specific language. */
declare const labelValueDefinitionStrings: l.TypedObjectSchema<"com.atproto.label.defs#labelValueDefinitionStrings", l.Validator<LabelValueDefinitionStrings, LabelValueDefinitionStrings>>;
export { labelValueDefinitionStrings };
type LabelValue = '!hide' | '!warn' | '!no-unauthenticated' | 'porn' | 'sexual' | 'nudity' | 'graphic-media' | 'bot' | l.UnknownString;
export type { LabelValue };
declare const labelValue: l.StringSchema<{
    knownValues: ["!hide", "!warn", "!no-unauthenticated", "porn", "sexual", "nudity", "graphic-media", "bot"];
}>;
export { labelValue };
//# sourceMappingURL=defs.defs.d.ts.map
import { l } from '@atproto/lex';
import * as RichtextFacet from '../richtext/facet.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
declare const $nsid = "app.bsky.feed.generator";
export { $nsid };
/** Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository. */
type Main = {
    $type: 'app.bsky.feed.generator';
    did: l.DidString;
    displayName: string;
    description?: string;
    descriptionFacets?: RichtextFacet.Main[];
    avatar?: l.BlobRef;
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
    acceptsInteractions?: boolean;
    /**
     * Self-label values
     */
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    contentMode?: 'app.bsky.feed.defs#contentModeUnspecified' | 'app.bsky.feed.defs#contentModeVideo' | l.UnknownString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository. */
declare const main: l.RecordSchema<"any", "app.bsky.feed.generator", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.feed.generator", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        did: l.DidString;
        description?: string | undefined;
        avatar?: l.BlobRef
        /**
         * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
         */
         | undefined;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        displayName: string;
        descriptionFacets?: RichtextFacet.Main[] | undefined;
        acceptsInteractions?: boolean
        /**
         * Self-label values
         */
         | undefined;
        contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
        $type: "app.bsky.feed.generator";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        did: l.DidString;
        description?: string | undefined;
        avatar?: l.BlobRef
        /**
         * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
         */
         | undefined;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        displayName: string;
        descriptionFacets?: RichtextFacet.Main[] | undefined;
        acceptsInteractions?: boolean
        /**
         * Self-label values
         */
         | undefined;
        contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
        $type: "app.bsky.feed.generator";
    };
}, $type: "app.bsky.feed.generator";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    did: l.DidString;
    description?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    displayName: string;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    acceptsInteractions?: boolean
    /**
     * Self-label values
     */
     | undefined;
    contentMode?: ("app.bsky.feed.defs#contentModeUnspecified" | "app.bsky.feed.defs#contentModeVideo" | l.UnknownString) | undefined;
    $type: "app.bsky.feed.generator";
}>;
//# sourceMappingURL=generator.defs.d.ts.map
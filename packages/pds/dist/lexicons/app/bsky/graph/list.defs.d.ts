import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
import * as RichtextFacet from '../richtext/facet.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
declare const $nsid = "app.bsky.graph.list";
export { $nsid };
/** Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists. */
type Main = {
    $type: 'app.bsky.graph.list';
    /**
     * Defines the purpose of the list (aka, moderation-oriented or curration-oriented)
     */
    purpose: GraphDefs.ListPurpose;
    /**
     * Display name for list; can not be empty.
     */
    name: string;
    description?: string;
    descriptionFacets?: RichtextFacet.Main[];
    avatar?: l.BlobRef;
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.list", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.list", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description?: string | undefined;
        avatar?: l.BlobRef | undefined;
        name: string;
        purpose: GraphDefs.ListPurpose;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        descriptionFacets?: RichtextFacet.Main[] | undefined;
        $type: "app.bsky.graph.list";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description?: string | undefined;
        avatar?: l.BlobRef | undefined;
        name: string;
        purpose: GraphDefs.ListPurpose;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        descriptionFacets?: RichtextFacet.Main[] | undefined;
        $type: "app.bsky.graph.list";
    };
}, $type: "app.bsky.graph.list";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    description?: string | undefined;
    avatar?: l.BlobRef | undefined;
    name: string;
    purpose: GraphDefs.ListPurpose;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    descriptionFacets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.graph.list";
}>;
//# sourceMappingURL=list.defs.d.ts.map
import { l } from '@atproto/lex';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
declare const $nsid = "app.bsky.actor.profile";
export { $nsid };
/** A declaration of a Bluesky account profile. */
type Main = {
    $type: 'app.bsky.actor.profile';
    displayName?: string;
    /**
     * Free-form profile description text.
     */
    description?: string;
    /**
     * Free-form pronouns text.
     */
    pronouns?: string;
    website?: l.UriString;
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
    avatar?: l.BlobRef;
    /**
     * Larger horizontal image to display behind profile view.
     */
    banner?: l.BlobRef;
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    joinedViaStarterPack?: RepoStrongRef.Main;
    pinnedPost?: RepoStrongRef.Main;
    createdAt?: l.DatetimeString;
};
export type { Main };
/** A declaration of a Bluesky account profile. */
declare const main: l.RecordSchema<"literal:self", "app.bsky.actor.profile", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.actor.profile", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        displayName?: string
        /**
         * Free-form profile description text.
         */
         | undefined;
        description?: string
        /**
         * Free-form pronouns text.
         */
         | undefined;
        createdAt?: l.DatetimeString | undefined;
        pinnedPost?: RepoStrongRef.Main | undefined;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        pronouns?: string | undefined;
        avatar?: l.BlobRef
        /**
         * Larger horizontal image to display behind profile view.
         */
         | undefined;
        website?: l.UriString
        /**
         * Small image to be displayed next to posts from account. AKA, 'profile picture'
         */
         | undefined;
        banner?: l.BlobRef
        /**
         * Self-label values, specific to the Bluesky application, on the overall account.
         */
         | undefined;
        joinedViaStarterPack?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.actor.profile";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        displayName?: string
        /**
         * Free-form profile description text.
         */
         | undefined;
        description?: string
        /**
         * Free-form pronouns text.
         */
         | undefined;
        createdAt?: l.DatetimeString | undefined;
        pinnedPost?: RepoStrongRef.Main | undefined;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        pronouns?: string | undefined;
        avatar?: l.BlobRef
        /**
         * Larger horizontal image to display behind profile view.
         */
         | undefined;
        website?: l.UriString
        /**
         * Small image to be displayed next to posts from account. AKA, 'profile picture'
         */
         | undefined;
        banner?: l.BlobRef
        /**
         * Self-label values, specific to the Bluesky application, on the overall account.
         */
         | undefined;
        joinedViaStarterPack?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.actor.profile";
    };
}, $type: "app.bsky.actor.profile";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    displayName?: string
    /**
     * Free-form profile description text.
     */
     | undefined;
    description?: string
    /**
     * Free-form pronouns text.
     */
     | undefined;
    createdAt?: l.DatetimeString | undefined;
    pinnedPost?: RepoStrongRef.Main | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    pronouns?: string | undefined;
    avatar?: l.BlobRef
    /**
     * Larger horizontal image to display behind profile view.
     */
     | undefined;
    website?: l.UriString
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     */
     | undefined;
    banner?: l.BlobRef
    /**
     * Self-label values, specific to the Bluesky application, on the overall account.
     */
     | undefined;
    joinedViaStarterPack?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.actor.profile";
}>;
//# sourceMappingURL=profile.defs.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.defs";
export { $nsid };
type RecordDeleted = {
    $type?: 'app.bsky.notification.defs#recordDeleted';
};
export type { RecordDeleted };
declare const recordDeleted: l.TypedObjectSchema<"app.bsky.notification.defs#recordDeleted", l.Validator<RecordDeleted, RecordDeleted>>;
export { recordDeleted };
type ChatPreference = {
    $type?: 'app.bsky.notification.defs#chatPreference';
    include: 'all' | 'accepted' | l.UnknownString;
    push: boolean;
};
export type { ChatPreference };
declare const chatPreference: l.TypedObjectSchema<"app.bsky.notification.defs#chatPreference", l.Validator<ChatPreference, ChatPreference>>;
export { chatPreference };
type FilterablePreference = {
    $type?: 'app.bsky.notification.defs#filterablePreference';
    include: 'all' | 'follows' | l.UnknownString;
    list: boolean;
    push: boolean;
};
export type { FilterablePreference };
declare const filterablePreference: l.TypedObjectSchema<"app.bsky.notification.defs#filterablePreference", l.Validator<FilterablePreference, FilterablePreference>>;
export { filterablePreference };
type Preference = {
    $type?: 'app.bsky.notification.defs#preference';
    list: boolean;
    push: boolean;
};
export type { Preference };
declare const preference: l.TypedObjectSchema<"app.bsky.notification.defs#preference", l.Validator<Preference, Preference>>;
export { preference };
type Preferences = {
    $type?: 'app.bsky.notification.defs#preferences';
    chat: ChatPreference;
    follow: FilterablePreference;
    like: FilterablePreference;
    likeViaRepost: FilterablePreference;
    mention: FilterablePreference;
    quote: FilterablePreference;
    reply: FilterablePreference;
    repost: FilterablePreference;
    repostViaRepost: FilterablePreference;
    starterpackJoined: Preference;
    subscribedPost: Preference;
    unverified: Preference;
    verified: Preference;
};
export type { Preferences };
declare const preferences: l.TypedObjectSchema<"app.bsky.notification.defs#preferences", l.Validator<Preferences, Preferences>>;
export { preferences };
type ActivitySubscription = {
    $type?: 'app.bsky.notification.defs#activitySubscription';
    post: boolean;
    reply: boolean;
};
export type { ActivitySubscription };
declare const activitySubscription: l.TypedObjectSchema<"app.bsky.notification.defs#activitySubscription", l.Validator<ActivitySubscription, ActivitySubscription>>;
export { activitySubscription };
/** Object used to store activity subscription data in stash. */
type SubjectActivitySubscription = {
    $type?: 'app.bsky.notification.defs#subjectActivitySubscription';
    subject: l.DidString;
    activitySubscription: ActivitySubscription;
};
export type { SubjectActivitySubscription };
/** Object used to store activity subscription data in stash. */
declare const subjectActivitySubscription: l.TypedObjectSchema<"app.bsky.notification.defs#subjectActivitySubscription", l.Validator<SubjectActivitySubscription, SubjectActivitySubscription>>;
export { subjectActivitySubscription };
//# sourceMappingURL=defs.defs.d.ts.map
import { LexMap, TypedObjectSchema } from '@atproto/lex';
import { BsyncClient } from './bsync';
import { app } from './lexicons/index.js';
export declare const Namespaces: {
    readonly AppBskyAgeassuranceDefsEvent: TypedObjectSchema<"app.bsky.ageassurance.defs#event", import("@atproto/lex").Validator<app.bsky.ageassurance.defs.$defs.Event, app.bsky.ageassurance.defs.$defs.Event>>;
    readonly AppBskyBookmarkDefsBookmark: TypedObjectSchema<"app.bsky.bookmark.defs#bookmark", import("@atproto/lex").Validator<app.bsky.bookmark.defs.$defs.Bookmark, app.bsky.bookmark.defs.$defs.Bookmark>>;
    readonly AppBskyContactDefsNotification: TypedObjectSchema<"app.bsky.contact.defs#notification", import("@atproto/lex").Validator<app.bsky.contact.defs.$defs.Notification, app.bsky.contact.defs.$defs.Notification>>;
    readonly AppBskyDraftDefsDraftWithId: TypedObjectSchema<"app.bsky.draft.defs#draftWithId", import("@atproto/lex").Validator<app.bsky.draft.defs.$defs.DraftWithId, app.bsky.draft.defs.$defs.DraftWithId>>;
    readonly AppBskyNotificationDefsPreferences: TypedObjectSchema<"app.bsky.notification.defs#preferences", import("@atproto/lex").Validator<app.bsky.notification.defs.$defs.Preferences, app.bsky.notification.defs.$defs.Preferences>>;
    readonly AppBskyNotificationDefsSubjectActivitySubscription: TypedObjectSchema<"app.bsky.notification.defs#subjectActivitySubscription", import("@atproto/lex").Validator<app.bsky.notification.defs.$defs.SubjectActivitySubscription, app.bsky.notification.defs.$defs.SubjectActivitySubscription>>;
    readonly AppBskyUnspeccedDefsAgeAssuranceEvent: TypedObjectSchema<"app.bsky.unspecced.defs#ageAssuranceEvent", import("@atproto/lex").Validator<app.bsky.unspecced.defs.$defs.AgeAssuranceEvent, app.bsky.unspecced.defs.$defs.AgeAssuranceEvent>>;
};
export declare const createStashClient: (bsyncClient: BsyncClient) => StashClient;
export declare class StashClient {
    private readonly bsyncClient;
    constructor(bsyncClient: BsyncClient);
    create(input: CreateInput): Promise<void>;
    update(input: UpdateInput): Promise<void>;
    delete(input: DeleteInput): Promise<void>;
    private putOperation;
}
type CreateInput = {
    actorDid: string;
    namespace: TypedObjectSchema;
    key: string;
    payload: LexMap;
};
type UpdateInput = CreateInput;
type DeleteInput = {
    actorDid: string;
    namespace: TypedObjectSchema;
    key: string;
};
export {};
//# sourceMappingURL=stash.d.ts.map
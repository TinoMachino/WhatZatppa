import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.contact.defs";
export { $nsid };
/** Associates a profile with the positional index of the contact import input in the call to `app.bsky.contact.importContacts`, so clients can know which phone caused a particular match. */
type MatchAndContactIndex = {
    $type?: 'app.bsky.contact.defs#matchAndContactIndex';
    /**
     * Profile of the matched user.
     */
    match: ActorDefs.ProfileView;
    /**
     * The index of this match in the import contact input.
     */
    contactIndex: number;
};
export type { MatchAndContactIndex };
/** Associates a profile with the positional index of the contact import input in the call to `app.bsky.contact.importContacts`, so clients can know which phone caused a particular match. */
declare const matchAndContactIndex: l.TypedObjectSchema<"app.bsky.contact.defs#matchAndContactIndex", l.Validator<MatchAndContactIndex, MatchAndContactIndex>>;
export { matchAndContactIndex };
type SyncStatus = {
    $type?: 'app.bsky.contact.defs#syncStatus';
    /**
     * Last date when contacts where imported.
     */
    syncedAt: l.DatetimeString;
    /**
     * Number of existing contact matches resulting of the user imports and of their imported contacts having imported the user. Matches stop being counted when the user either follows the matched contact or dismisses the match.
     */
    matchesCount: number;
};
export type { SyncStatus };
declare const syncStatus: l.TypedObjectSchema<"app.bsky.contact.defs#syncStatus", l.Validator<SyncStatus, SyncStatus>>;
export { syncStatus };
/** A stash object to be sent via bsync representing a notification to be created. */
type Notification = {
    $type?: 'app.bsky.contact.defs#notification';
    /**
     * The DID of who this notification comes from.
     */
    from: l.DidString;
    /**
     * The DID of who this notification should go to.
     */
    to: l.DidString;
};
export type { Notification };
/** A stash object to be sent via bsync representing a notification to be created. */
declare const notification: l.TypedObjectSchema<"app.bsky.contact.defs#notification", l.Validator<Notification, Notification>>;
export { notification };
//# sourceMappingURL=defs.defs.d.ts.map
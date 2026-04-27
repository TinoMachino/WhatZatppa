import { l } from '@atproto/lex';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
import * as FeedDefs from '../feed/defs.defs.js';
declare const $nsid = "app.bsky.bookmark.defs";
export { $nsid };
/** Object used to store bookmark data in stash. */
type Bookmark = {
    $type?: 'app.bsky.bookmark.defs#bookmark';
    /**
     * A strong ref to the record to be bookmarked. Currently, only `app.bsky.feed.post` records are supported.
     */
    subject: RepoStrongRef.Main;
};
export type { Bookmark };
/** Object used to store bookmark data in stash. */
declare const bookmark: l.TypedObjectSchema<"app.bsky.bookmark.defs#bookmark", l.Validator<Bookmark, Bookmark>>;
export { bookmark };
type BookmarkView = {
    $type?: 'app.bsky.bookmark.defs#bookmarkView';
    /**
     * A strong ref to the bookmarked record.
     */
    subject: RepoStrongRef.Main;
    createdAt?: l.DatetimeString;
    item: l.$Typed<FeedDefs.BlockedPost> | l.$Typed<FeedDefs.NotFoundPost> | l.$Typed<FeedDefs.PostView> | l.Unknown$TypedObject;
};
export type { BookmarkView };
declare const bookmarkView: l.TypedObjectSchema<"app.bsky.bookmark.defs#bookmarkView", l.Validator<BookmarkView, BookmarkView>>;
export { bookmarkView };
//# sourceMappingURL=defs.defs.d.ts.map
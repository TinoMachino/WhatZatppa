import { UriString } from '@atproto/lex';
import { DidString } from '@atproto/syntax';
import { AccountManager } from '../account-manager/account-manager';
import { ActorStoreReader } from '../actor-store/actor-store-reader';
import { BskyAppView } from '../bsky-app-view';
import { ImageUrlBuilder } from '../image/image-url-builder';
import { app } from '../lexicons/index.js';
import { LocalRecords, RecordDescript } from './types';
type CommonSignedUris = 'avatar' | 'banner' | 'feed_thumbnail' | 'feed_fullsize';
export type LocalViewerCreator = (actorStoreReader: ActorStoreReader) => LocalViewer;
export declare class LocalViewer {
    readonly actorStoreReader: ActorStoreReader;
    readonly accountManager: AccountManager;
    readonly imageUrlBuilder: ImageUrlBuilder;
    readonly bskyAppView?: BskyAppView | undefined;
    constructor(actorStoreReader: ActorStoreReader, accountManager: AccountManager, imageUrlBuilder: ImageUrlBuilder, bskyAppView?: BskyAppView | undefined);
    get did(): DidString;
    static creator(accountManager: AccountManager, imageUrlBuilder: ImageUrlBuilder, bskyAppView?: BskyAppView): LocalViewerCreator;
    getImageUrl(pattern: CommonSignedUris, cid: string): UriString;
    serviceAuthHeaders(did: string, lxm: string): Promise<{
        headers: {
            authorization: string;
        };
    }>;
    getRecordsSinceRev(rev: string): Promise<LocalRecords>;
    getProfileBasic(): Promise<app.bsky.actor.defs.ProfileViewBasic | null>;
    formatAndInsertPostsInFeed(feed: app.bsky.feed.defs.FeedViewPost[], posts: RecordDescript<app.bsky.feed.post.Main>[]): Promise<app.bsky.feed.defs.FeedViewPost[]>;
    getPost(descript: RecordDescript<app.bsky.feed.post.Main>): Promise<app.bsky.feed.defs.PostView | null>;
    formatPostEmbed(post: app.bsky.feed.post.Main): Promise<{
        $type: "app.bsky.embed.images#view";
        images: app.bsky.embed.images.$defs.ViewImage[];
    } | {
        $type: "app.bsky.embed.external#view";
        external: app.bsky.embed.external.$defs.ViewExternal;
    } | {
        $type: "app.bsky.embed.record#view";
        record: import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewRecord> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewNotFound> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewBlocked> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewDetached> | import("@atproto/lex").$Typed<app.bsky.feed.defs.$defs.GeneratorView> | import("@atproto/lex").$Typed<app.bsky.graph.defs.$defs.ListView> | import("@atproto/lex").$Typed<app.bsky.labeler.defs.$defs.LabelerView> | import("@atproto/lex").$Typed<app.bsky.graph.defs.$defs.StarterPackViewBasic> | import("@atproto/lex").Unknown$TypedObject;
    } | {
        $type: "app.bsky.embed.recordWithMedia#view";
        record: app.bsky.embed.record.$defs.View;
        media: import("@atproto/lex").$Typed<app.bsky.embed.images.$defs.View> | import("@atproto/lex").$Typed<app.bsky.embed.video.$defs.View> | import("@atproto/lex").$Typed<app.bsky.embed.external.$defs.View> | import("@atproto/lex").Unknown$TypedObject;
    } | undefined>;
    formatImageEmbed(embed: app.bsky.embed.images.Main): {
        $type: "app.bsky.embed.images#view";
        images: app.bsky.embed.images.$defs.ViewImage[];
    };
    formatExternalEmbed(embed: app.bsky.embed.external.Main): {
        $type: "app.bsky.embed.external#view";
        external: app.bsky.embed.external.$defs.ViewExternal;
    };
    formatRecordEmbed(embed: app.bsky.embed.record.Main): Promise<{
        $type: "app.bsky.embed.record#view";
        record: import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewRecord> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewNotFound> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewBlocked> | import("@atproto/lex").$Typed<app.bsky.embed.record.$defs.ViewDetached> | import("@atproto/lex").$Typed<app.bsky.feed.defs.$defs.GeneratorView> | import("@atproto/lex").$Typed<app.bsky.graph.defs.$defs.ListView> | import("@atproto/lex").$Typed<app.bsky.labeler.defs.$defs.LabelerView> | import("@atproto/lex").$Typed<app.bsky.graph.defs.$defs.StarterPackViewBasic> | import("@atproto/lex").Unknown$TypedObject;
    }>;
    private formatRecordEmbedInternal;
    formatRecordWithMediaEmbed(embed: app.bsky.embed.recordWithMedia.Main): Promise<{
        $type: "app.bsky.embed.recordWithMedia#view";
        record: app.bsky.embed.record.$defs.View;
        media: import("@atproto/lex").$Typed<app.bsky.embed.images.$defs.View> | import("@atproto/lex").$Typed<app.bsky.embed.video.$defs.View> | import("@atproto/lex").$Typed<app.bsky.embed.external.$defs.View> | import("@atproto/lex").Unknown$TypedObject;
    } | undefined>;
    updateProfileViewBasic<T extends app.bsky.actor.defs.ProfileViewDetailed | app.bsky.actor.defs.ProfileViewBasic | app.bsky.actor.defs.ProfileView>(view: T, record: app.bsky.actor.profile.Main): T;
    updateProfileView<T extends app.bsky.actor.defs.ProfileViewDetailed | app.bsky.actor.defs.ProfileViewBasic | app.bsky.actor.defs.ProfileView>(view: T, record: app.bsky.actor.profile.Main): T;
    updateProfileDetailed<T extends app.bsky.actor.defs.ProfileViewDetailed>(view: T, record: app.bsky.actor.profile.Main): T;
}
export {};
//# sourceMappingURL=viewer.d.ts.map
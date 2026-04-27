import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type Post = Selectable<DatabaseSchemaType['post']>;
type PostEmbedImage = DatabaseSchemaType['post_embed_image'];
type PostEmbedExternal = DatabaseSchemaType['post_embed_external'];
type PostEmbedRecord = DatabaseSchemaType['post_embed_record'];
type PostEmbedVideo = DatabaseSchemaType['post_embed_video'];
type PostSubscription = Selectable<DatabaseSchemaType['post_subscription']>;
type PostAncestor = {
    uri: string;
    height: number;
};
type PostDescendent = {
    uri: string;
    depth: number;
    cid: string;
    creator: string;
    sortAt: string;
};
type IndexedPost = {
    post: Post;
    facets?: {
        type: 'mention' | 'link';
        value: string;
    }[];
    embeds?: (PostEmbedImage[] | PostEmbedExternal | PostEmbedRecord | PostEmbedVideo)[];
    ancestors?: PostAncestor[];
    descendents?: PostDescendent[];
    threadgate?: app.bsky.feed.threadgate.Main;
    postSubscriptions?: PostSubscription[];
};
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.feed.post", import("@atproto/lex").Validator<Omit<app.bsky.feed.post.$defs.Main, "$type">, Omit<app.bsky.feed.post.$defs.Main, "$type">>>, IndexedPost>;
export default makePlugin;
//# sourceMappingURL=post.d.ts.map
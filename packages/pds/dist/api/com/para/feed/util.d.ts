import { AtUri } from '@atproto/syntax';
import { AppContext } from '../../../../context';
import { PostView } from '../../../../lexicon/types/com/para/feed/getAuthorFeed';
import { Record as ParaPostRecord } from '../../../../lexicon/types/com/para/post';
import { RecordDescript } from '../../../../read-after-write';
export declare const toPostView: (descript: RecordDescript<ParaPostRecord>) => PostView;
export declare const insertLocalPostsInFeed: (feed: PostView[], paraPosts: RecordDescript<ParaPostRecord>[]) => PostView[];
export declare const resolveLocalActorDid: (ctx: AppContext, actor: string) => Promise<string | undefined>;
export declare const resolveDidUri: (ctx: AppContext, uri: string) => Promise<AtUri>;
//# sourceMappingURL=util.d.ts.map
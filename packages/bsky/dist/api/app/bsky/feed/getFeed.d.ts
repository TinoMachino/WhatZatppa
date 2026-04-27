import { Headers as HeadersMap, Server } from '@atproto/xrpc-server';
import { AppContext } from '../../../../context';
import { FeedItem } from '../../../../hydration/feed';
export default function (server: Server, ctx: AppContext): void;
export type AlgoResponse = {
    feedItems: AlgoResponseItem[];
    resHeaders?: HeadersMap;
    cursor?: string;
    reqId?: string;
};
export type AlgoResponseItem = FeedItem & {
    feedContext?: string;
};
//# sourceMappingURL=getFeed.d.ts.map
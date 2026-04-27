import { Server } from '@atproto/xrpc-server';
import { AppContext } from '../../../../context';
import { DataPlaneClient } from '../../../../data-plane';
import { Actor } from '../../../../hydration/actor';
import { FeedItem } from '../../../../hydration/feed';
import { HydrateCtx, Hydrator } from '../../../../hydration/hydrator';
import { app } from '../../../../lexicons/index.js';
import { Views } from '../../../../views';
export default function (server: Server, ctx: AppContext): void;
export declare const skeleton: (inputs: {
    ctx: Context;
    params: Params;
}) => Promise<Skeleton>;
type Context = {
    hydrator: Hydrator;
    views: Views;
    dataplane: DataPlaneClient;
};
type Params = app.bsky.feed.getAuthorFeed.$Params & {
    hydrateCtx: HydrateCtx;
};
type Skeleton = {
    actor: Actor;
    items: FeedItem[];
    filter: app.bsky.feed.getAuthorFeed.$Params['filter'];
    cursor?: string;
};
export {};
//# sourceMappingURL=getAuthorFeed.d.ts.map
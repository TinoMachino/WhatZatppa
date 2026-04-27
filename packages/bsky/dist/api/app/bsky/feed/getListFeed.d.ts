import { Server } from '@atproto/xrpc-server';
import { AppContext } from '../../../../context';
import { DataPlaneClient } from '../../../../data-plane';
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
type Params = app.bsky.feed.getListFeed.$Params & {
    hydrateCtx: HydrateCtx;
};
type Skeleton = {
    items: FeedItem[];
    cursor?: string;
};
export {};
//# sourceMappingURL=getListFeed.d.ts.map
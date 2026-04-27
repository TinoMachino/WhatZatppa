/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, type FetchHandler, type FetchHandlerOptions } from '@atproto/xrpc';
import * as ComAtprotoSyncGetRecord from './types/com/atproto/sync/getRecord.js';
export * as ComAtprotoSyncGetRecord from './types/com/atproto/sync/getRecord.js';
export declare class AtpBaseClient extends XrpcClient {
    com: ComNS;
    constructor(options: FetchHandler | FetchHandlerOptions);
    /** @deprecated use `this` instead */
    get xrpc(): XrpcClient;
}
export declare class ComNS {
    _client: XrpcClient;
    atproto: ComAtprotoNS;
    constructor(client: XrpcClient);
}
export declare class ComAtprotoNS {
    _client: XrpcClient;
    sync: ComAtprotoSyncNS;
    constructor(client: XrpcClient);
}
export declare class ComAtprotoSyncNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    getRecord(params?: ComAtprotoSyncGetRecord.QueryParams, opts?: ComAtprotoSyncGetRecord.CallOptions): Promise<ComAtprotoSyncGetRecord.Response>;
}
//# sourceMappingURL=index.d.ts.map
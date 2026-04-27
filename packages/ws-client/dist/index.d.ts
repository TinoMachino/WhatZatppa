import { ClientOptions, WebSocket } from 'ws';
export declare class WebSocketKeepAlive {
    opts: ClientOptions & {
        getUrl: () => Promise<string>;
        maxReconnectSeconds?: number;
        signal?: AbortSignal;
        heartbeatIntervalMs?: number;
        onReconnect?: () => void;
        onReconnectError?: (error: unknown, n: number, initialSetup: boolean) => void;
    };
    ws: WebSocket | null;
    initialSetup: boolean;
    reconnects: number | null;
    constructor(opts: ClientOptions & {
        getUrl: () => Promise<string>;
        maxReconnectSeconds?: number;
        signal?: AbortSignal;
        heartbeatIntervalMs?: number;
        onReconnect?: () => void;
        onReconnectError?: (error: unknown, n: number, initialSetup: boolean) => void;
    });
    [Symbol.asyncIterator](): AsyncGenerator<Uint8Array>;
    send(data: string | Buffer): Promise<void>;
    isConnected(): boolean;
    startHeartbeat(ws: WebSocket): void;
}
export default WebSocketKeepAlive;
export declare class DisconnectError extends Error {
    wsCode: CloseCode;
    xrpcCode?: string | undefined;
    constructor(wsCode?: CloseCode, xrpcCode?: string | undefined);
}
export declare enum CloseCode {
    Normal = 1000,
    Abnormal = 1006,
    Policy = 1008
}
//# sourceMappingURL=index.d.ts.map
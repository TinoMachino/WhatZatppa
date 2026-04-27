import { ClientOptions } from 'ws';
import { TapEvent } from './types';
export interface HandlerOpts {
    signal: AbortSignal;
    ack: () => Promise<void>;
}
export interface TapHandler {
    onEvent: (evt: TapEvent, opts: HandlerOpts) => void | Promise<void>;
    onError: (err: Error) => void;
}
export type TapWebsocketOptions = ClientOptions & {
    adminPassword?: string;
    maxReconnectSeconds?: number;
    heartbeatIntervalMs?: number;
    onReconnectError?: (error: unknown, n: number, initialSetup: boolean) => void;
};
export declare class TapChannel implements AsyncDisposable {
    private ws;
    private handler;
    private readonly abortController;
    private readonly destroyDefer;
    private bufferedAcks;
    constructor(url: string, handler: TapHandler, wsOpts?: TapWebsocketOptions);
    ackEvent(id: number): Promise<void>;
    private sendAck;
    private bufferAndSendAck;
    private flushBufferedAcks;
    start(): Promise<void>;
    private processWsEvent;
    destroy(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
}
//# sourceMappingURL=channel.d.ts.map
import { DuplexOptions } from 'node:stream';
import { WebSocket } from 'ws';
import { MessageFrame } from './frames';
export declare function streamByteChunks(ws: WebSocket, options?: DuplexOptions): import("stream").Duplex;
export declare function byFrame(ws: WebSocket, options?: DuplexOptions): AsyncGenerator<MessageFrame<import("@atproto/lex-data").LexValue> | import("./frames").ErrorFrame<string>, void, unknown>;
export declare function byMessage(ws: WebSocket, options?: DuplexOptions): AsyncGenerator<MessageFrame<import("@atproto/lex-data").LexValue>, void, unknown>;
export declare function ensureChunkIsMessage(chunk: Uint8Array): MessageFrame;
//# sourceMappingURL=stream.d.ts.map
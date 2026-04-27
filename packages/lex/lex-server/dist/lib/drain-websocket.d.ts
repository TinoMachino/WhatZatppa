/**
 * Performs polling based backpressure management for a WebSocket connection. If
 * the amount of buffered data exceeds the specified high water mark, this
 * function will wait until the buffered amount drops below the low water mark
 * before resolving. This is useful for preventing memory issues when sending
 * large amounts of data over a WebSocket connection.
 */
export declare function drainWebsocket(socket: WebSocket, signal: AbortSignal, { highWaterMark, // 250 KB
lowWaterMark, }?: {
    highWaterMark?: number;
    lowWaterMark?: number;
}): Promise<void>;
//# sourceMappingURL=drain-websocket.d.ts.map
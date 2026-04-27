import { LexValue } from '@atproto/lex-data';
import { ErrorFrameBody, ErrorFrameHeader, FrameHeader, FrameType, MessageFrameHeader } from './types';
export declare abstract class Frame<T extends LexValue = LexValue> {
    abstract header: FrameHeader;
    abstract body: T;
    get op(): FrameType;
    toBytes(): Uint8Array;
    isMessage(): this is MessageFrame;
    isError(): this is ErrorFrame;
    static fromBytes(bytes: Uint8Array): MessageFrame<LexValue> | ErrorFrame<string>;
}
export declare class MessageFrame<T extends LexValue = LexValue> extends Frame<T> {
    header: MessageFrameHeader;
    body: T;
    constructor(body: T, opts?: {
        type?: string;
    });
    get type(): string | undefined;
    static fromLexValue(data: LexValue, nsid: string): MessageFrame<import("@atproto/lex-data").LexScalar | LexValue[]> | MessageFrame<{
        [x: string]: LexValue | undefined;
    }>;
}
export declare class ErrorFrame<T extends string = string> extends Frame<ErrorFrameBody<T>> {
    header: ErrorFrameHeader;
    body: ErrorFrameBody<T>;
    constructor(body: ErrorFrameBody<T>);
    get code(): T;
    get message(): string | undefined;
    static fromError(err: unknown): ErrorFrame;
}
//# sourceMappingURL=frames.d.ts.map
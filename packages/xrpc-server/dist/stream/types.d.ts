import { l } from '@atproto/lex-schema';
export declare enum FrameType {
    Message = 1,
    Error = -1
}
export declare const messageFrameHeader: l.ObjectSchema<{
    readonly op: l.LiteralSchema<FrameType.Message>;
    readonly t: l.OptionalSchema<l.StringSchema<{}>>;
}>;
export type MessageFrameHeader = l.Infer<typeof messageFrameHeader>;
export declare const errorFrameHeader: l.ObjectSchema<{
    readonly op: l.LiteralSchema<FrameType.Error>;
}>;
export declare const errorFrameBody: l.ObjectSchema<{
    readonly error: l.StringSchema<{}>;
    readonly message: l.OptionalSchema<l.StringSchema<{}>>;
}>;
export type ErrorFrameHeader = l.Infer<typeof errorFrameHeader>;
export type ErrorFrameBody<T extends string = string> = {
    error: T;
} & l.Infer<typeof errorFrameBody>;
export declare const frameHeader: l.UnionSchema<readonly [l.ObjectSchema<{
    readonly op: l.LiteralSchema<FrameType.Message>;
    readonly t: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.ObjectSchema<{
    readonly op: l.LiteralSchema<FrameType.Error>;
}>]>;
export type FrameHeader = l.Infer<typeof frameHeader>;
//# sourceMappingURL=types.d.ts.map
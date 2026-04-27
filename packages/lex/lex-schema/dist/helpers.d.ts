import { InferOutput, Restricted } from './core.js';
import { InferPayload, InferPayloadBody, InferPayloadEncoding, Procedure, Query, Subscription } from './schema.js';
export type Main<T> = T | {
    main: T;
};
export declare function getMain<T extends object>(ns: Main<T>): T;
/**
 * Every XRPC implementation should translate `application/json` and `text/*`
 * payloads into their native equivalent ({@link LexValue} or string). Binary
 * data payloads, however, can be represented differently depending on the
 * environment and use case (e.g. `Uint8Array`, `Blob`, `Buffer`,
 * `ReadableStream`, etc.). This type is a placeholder to represent binary data
 * when not explicitly provided.
 */
export type BinaryData = Restricted<'Binary data'>;
export type InferMethodParams<M extends Procedure | Query | Subscription = Procedure | Query | Subscription> = M extends Procedure<any, infer TParams, any, any, any> ? InferOutput<TParams> : M extends Query<any, infer TParams, any, any> ? InferOutput<TParams> : M extends Subscription<any, infer TParams, any, any> ? InferOutput<TParams> : never;
export type InferMethodInput<M extends Procedure | Query | Subscription = Procedure | Query | Subscription, B = BinaryData> = M extends Procedure<any, any, infer TInput, any, any> ? InferPayload<TInput, B> : undefined;
export type InferMethodInputBody<M extends Procedure | Query | Subscription = Procedure | Query | Subscription, B = BinaryData> = M extends Procedure<any, any, infer TInput, any, any> ? InferPayloadBody<TInput, B> : undefined;
export type InferMethodInputEncoding<M extends Procedure | Query | Subscription = Procedure | Query | Subscription> = M extends Procedure<any, any, infer TInput, any, any> ? InferPayloadEncoding<TInput> : undefined;
export type InferMethodOutput<M extends Procedure | Query | Subscription = Procedure | Query | Subscription, B = BinaryData> = M extends Procedure<any, any, any, infer TOutput, any> ? InferPayload<TOutput, B> : M extends Query<any, any, infer TOutput, any> ? InferPayload<TOutput, B> : undefined;
export type InferMethodOutputBody<M extends Procedure | Query | Subscription = Procedure | Query | Subscription, B = BinaryData> = M extends Procedure<any, any, any, infer TOutput, any> ? InferPayloadBody<TOutput, B> : M extends Query<any, any, infer TOutput, any> ? InferPayloadBody<TOutput, B> : undefined;
export type InferMethodOutputEncoding<M extends Procedure | Query | Subscription = Procedure | Query | Subscription> = M extends Procedure<any, any, any, infer TOutput, any> ? InferPayloadEncoding<TOutput> : M extends Query<any, any, infer TOutput, any> ? InferPayloadEncoding<TOutput> : undefined;
export type InferMethodMessage<M extends Procedure | Query | Subscription = Procedure | Query | Subscription> = M extends Subscription<any, any, infer TMessage, any> ? InferOutput<TMessage> : undefined;
export type InferMethodError<M extends Procedure | Query | Subscription = Procedure | Query | Subscription> = M extends {
    errors: readonly (infer E extends string)[];
} ? E : never;
/**
 * @see {@link https://atproto.com/specs/xrpc#error-responses}
 */
export declare const lexErrorDataSchema: import("./schema.js").ObjectSchema<{
    readonly error: import("./schema.js").RegexpSchema<string>;
    readonly message: import("./schema.js").OptionalSchema<import("./schema.js").StringSchema<{}>>;
}>;
//# sourceMappingURL=helpers.d.ts.map
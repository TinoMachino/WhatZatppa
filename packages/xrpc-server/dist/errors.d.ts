import { l } from '@atproto/lex-schema';
import { ResponseType } from '@atproto/xrpc';
export declare const errorResult: l.ObjectSchema<{
    readonly status: l.IntegerSchema;
    readonly error: l.OptionalSchema<l.StringSchema<{}>>;
    readonly message: l.OptionalSchema<l.StringSchema<{}>>;
}>;
export type ErrorResult = l.Infer<typeof errorResult>;
export declare function isErrorResult(v: unknown): v is ErrorResult;
export declare function excludeErrorResult<V>(v: V): Exclude<V, ErrorResult>;
export { ResponseType };
export declare class XRPCError extends Error {
    type: ResponseType;
    errorMessage?: string | undefined;
    customErrorName?: string | undefined;
    constructor(type: ResponseType, errorMessage?: string | undefined, customErrorName?: string | undefined, options?: ErrorOptions);
    get statusCode(): number;
    get error(): string | undefined;
    get payload(): {
        error: string | undefined;
        message: string | undefined;
    };
    get typeName(): string | undefined;
    get typeStr(): string | undefined;
    static fromError(cause: unknown): XRPCError;
    static fromErrorResult(err: ErrorResult): XRPCError;
}
export declare class InvalidRequestError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class AuthRequiredError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class ForbiddenError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class InternalServerError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class UpstreamFailureError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class NotEnoughResourcesError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class UpstreamTimeoutError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
export declare class MethodNotImplementedError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string, options?: ErrorOptions);
    [Symbol.hasInstance](instance: unknown): boolean;
}
//# sourceMappingURL=errors.d.ts.map
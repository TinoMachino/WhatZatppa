"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotImplementedError = exports.UpstreamTimeoutError = exports.NotEnoughResourcesError = exports.UpstreamFailureError = exports.InternalServerError = exports.ForbiddenError = exports.AuthRequiredError = exports.InvalidRequestError = exports.XRPCError = exports.ResponseType = exports.errorResult = void 0;
exports.isErrorResult = isErrorResult;
exports.excludeErrorResult = excludeErrorResult;
const http_errors_1 = require("http-errors");
const lex_client_1 = require("@atproto/lex-client");
const lex_schema_1 = require("@atproto/lex-schema");
const xrpc_1 = require("@atproto/xrpc");
Object.defineProperty(exports, "ResponseType", { enumerable: true, get: function () { return xrpc_1.ResponseType; } });
// @NOTE Do not depend (directly or indirectly) on "./types" here, as it would
// create a circular dependency.
exports.errorResult = lex_schema_1.l.object({
    status: lex_schema_1.l.integer({ minimum: 400 }),
    error: lex_schema_1.l.optional(lex_schema_1.l.string()),
    message: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
function isErrorResult(v) {
    return exports.errorResult.safeParse(v).success;
}
function excludeErrorResult(v) {
    if (isErrorResult(v))
        throw XRPCError.fromErrorResult(v);
    return v;
}
class XRPCError extends Error {
    constructor(type, errorMessage, customErrorName, options) {
        super(errorMessage, options);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: type
        });
        Object.defineProperty(this, "errorMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: errorMessage
        });
        Object.defineProperty(this, "customErrorName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: customErrorName
        });
    }
    get statusCode() {
        const { type } = this;
        // Fool-proofing. `new XRPCError(123.5 as number, '')` does not generate a TypeScript error.
        // Because of this, we can end-up with any numeric value instead of an actual `ResponseType`.
        // For legacy reasons, the `type` argument is not checked in the constructor, so we check it here.
        if (type < 400 || type >= 600 || !Number.isFinite(type)) {
            return 500;
        }
        return type;
    }
    get error() {
        return this.customErrorName ?? this.typeName;
    }
    get payload() {
        return {
            error: this.error,
            message: this.type === xrpc_1.ResponseType.InternalServerError
                ? this.typeStr // Do not respond with error details for 500s
                : this.errorMessage || this.typeStr,
        };
    }
    get typeName() {
        return xrpc_1.ResponseType[this.type];
    }
    get typeStr() {
        return xrpc_1.ResponseTypeStrings[this.type];
    }
    static fromError(cause) {
        if (cause instanceof XRPCError) {
            return cause;
        }
        if (cause instanceof xrpc_1.XRPCError) {
            const { error, message, type } = mapFromClientError(cause);
            return new XRPCError(type, message, error, { cause });
        }
        if (cause instanceof lex_client_1.XrpcError) {
            const { status, body } = cause.toDownstreamError();
            return new XRPCError(status, body.message, body.error, { cause });
        }
        if (cause instanceof lex_client_1.LexError) {
            const data = cause.toJSON();
            const type = xrpc_1.ResponseType.InternalServerError;
            return new XRPCError(type, data.message, data.error, { cause });
        }
        if ((0, http_errors_1.isHttpError)(cause)) {
            return new XRPCError(cause.status, cause.message, cause.name, { cause });
        }
        if (isErrorResult(cause)) {
            return this.fromErrorResult(cause);
        }
        if (cause instanceof Error) {
            return new InternalServerError(cause.message, undefined, { cause });
        }
        return new InternalServerError('Unexpected internal server error', undefined, { cause });
    }
    static fromErrorResult(err) {
        return new XRPCError(err.status, err.message, err.error, { cause: err });
    }
}
exports.XRPCError = XRPCError;
class InvalidRequestError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.InvalidRequest, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.InvalidRequest);
    }
}
exports.InvalidRequestError = InvalidRequestError;
class AuthRequiredError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.AuthenticationRequired, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.AuthenticationRequired);
    }
}
exports.AuthRequiredError = AuthRequiredError;
class ForbiddenError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.Forbidden, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError && instance.type === xrpc_1.ResponseType.Forbidden);
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.InternalServerError, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.InternalServerError);
    }
}
exports.InternalServerError = InternalServerError;
class UpstreamFailureError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.UpstreamFailure, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.UpstreamFailure);
    }
}
exports.UpstreamFailureError = UpstreamFailureError;
class NotEnoughResourcesError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.NotEnoughResources, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.NotEnoughResources);
    }
}
exports.NotEnoughResourcesError = NotEnoughResourcesError;
class UpstreamTimeoutError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.UpstreamTimeout, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.UpstreamTimeout);
    }
}
exports.UpstreamTimeoutError = UpstreamTimeoutError;
class MethodNotImplementedError extends XRPCError {
    constructor(errorMessage, customErrorName, options) {
        super(xrpc_1.ResponseType.MethodNotImplemented, errorMessage, customErrorName, options);
    }
    [Symbol.hasInstance](instance) {
        return (instance instanceof XRPCError &&
            instance.type === xrpc_1.ResponseType.MethodNotImplemented);
    }
}
exports.MethodNotImplementedError = MethodNotImplementedError;
/**
 * Converts an upstream XRPC {@link ResponseType} into a downstream {@link ResponseType}.
 */
function mapFromClientError(error) {
    switch (error.status) {
        case xrpc_1.ResponseType.InvalidResponse:
            // Upstream server returned an XRPC response that is not compatible with our internal lexicon definitions for that XRPC method.
            // @NOTE This could be reflected as both a 500 ("we" are at fault) and 502 ("they" are at fault). Let's be gents about it.
            return {
                error: (0, xrpc_1.httpResponseCodeToName)(xrpc_1.ResponseType.InternalServerError),
                message: (0, xrpc_1.httpResponseCodeToString)(xrpc_1.ResponseType.InternalServerError),
                type: xrpc_1.ResponseType.InternalServerError,
            };
        case xrpc_1.ResponseType.Unknown:
            // Typically a network error / unknown host
            return {
                error: (0, xrpc_1.httpResponseCodeToName)(xrpc_1.ResponseType.InternalServerError),
                message: (0, xrpc_1.httpResponseCodeToString)(xrpc_1.ResponseType.InternalServerError),
                type: xrpc_1.ResponseType.InternalServerError,
            };
        default:
            return {
                error: error.error,
                message: error.message,
                type: error.status,
            };
    }
}
//# sourceMappingURL=errors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryXrpc = exports.RETRYABLE_HTTP_STATUS_CODES = void 0;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
exports.RETRYABLE_HTTP_STATUS_CODES = new Set([
    408, 425, 429, 500, 502, 503, 504, 522, 524,
]);
exports.retryXrpc = (0, common_1.createRetryable)((err) => {
    return err instanceof lex_1.XrpcError && err.shouldRetry();
});
//# sourceMappingURL=retry.js.map
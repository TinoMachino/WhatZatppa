"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerPipeThrough = exports.handlerPipeThroughStream = exports.handlerPipeThroughBuffer = exports.handlerSuccess = exports.headersSchema = void 0;
exports.isSharedRateLimitOpts = isSharedRateLimitOpts;
exports.isHandlerSuccess = isHandlerSuccess;
exports.isHandlerPipeThroughBuffer = isHandlerPipeThroughBuffer;
exports.isHandlerPipeThroughStream = isHandlerPipeThroughStream;
const node_stream_1 = require("node:stream");
const lex_schema_1 = require("@atproto/lex-schema");
exports.headersSchema = lex_schema_1.l.dict(lex_schema_1.l.string(), lex_schema_1.l.string());
exports.handlerSuccess = lex_schema_1.l.object({
    encoding: lex_schema_1.l.string(),
    body: lex_schema_1.l.unknown(),
    headers: lex_schema_1.l.optional(exports.headersSchema),
});
exports.handlerPipeThroughBuffer = lex_schema_1.l.object({
    encoding: lex_schema_1.l.string(),
    buffer: lex_schema_1.l.custom((v) => v instanceof Buffer, 'Expected a Buffer'),
    headers: lex_schema_1.l.optional(exports.headersSchema),
});
exports.handlerPipeThroughStream = lex_schema_1.l.object({
    encoding: lex_schema_1.l.string(),
    stream: lex_schema_1.l.custom((v) => v instanceof node_stream_1.Readable, 'Expected a Readable stream'),
    headers: lex_schema_1.l.optional(exports.headersSchema),
});
exports.handlerPipeThrough = lex_schema_1.l.union([
    exports.handlerPipeThroughBuffer,
    exports.handlerPipeThroughStream,
]);
function isSharedRateLimitOpts(opts) {
    return typeof opts['name'] === 'string';
}
function isHandlerSuccess(output) {
    // We only need to discriminate between possible Output values
    return (output != null &&
        'body' in output && // body is non optional (contrary to what type inference may suggest)
        'encoding' in output &&
        // Allows using objects that extends HandlerSuccess with a "status" field as
        // output, as long as the status is < 400, in order to avoid being confused
        // with ErrorResult objects.
        (!('status' in output) ||
            output.status == null ||
            Number(output.status) < 400));
}
function isHandlerPipeThroughBuffer(output) {
    // We only need to discriminate between possible Output values
    return output != null && 'buffer' in output && output['buffer'] !== undefined;
}
function isHandlerPipeThroughStream(output) {
    // We only need to discriminate between possible Output values
    return output != null && 'stream' in output && output['stream'] !== undefined;
}
//# sourceMappingURL=types.js.map
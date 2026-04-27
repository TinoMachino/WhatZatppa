"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameHeader = exports.errorFrameBody = exports.errorFrameHeader = exports.messageFrameHeader = exports.FrameType = void 0;
const lex_schema_1 = require("@atproto/lex-schema");
var FrameType;
(function (FrameType) {
    FrameType[FrameType["Message"] = 1] = "Message";
    FrameType[FrameType["Error"] = -1] = "Error";
})(FrameType || (exports.FrameType = FrameType = {}));
exports.messageFrameHeader = lex_schema_1.l.object({
    op: lex_schema_1.l.literal(FrameType.Message), // Frame op
    t: lex_schema_1.l.optional(lex_schema_1.l.string()), // Message body type discriminator
});
exports.errorFrameHeader = lex_schema_1.l.object({
    op: lex_schema_1.l.literal(FrameType.Error),
});
exports.errorFrameBody = lex_schema_1.l.object({
    error: lex_schema_1.l.string(), // Error code
    message: lex_schema_1.l.optional(lex_schema_1.l.string()), // Error message
});
exports.frameHeader = lex_schema_1.l.union([exports.messageFrameHeader, exports.errorFrameHeader]);
//# sourceMappingURL=types.js.map
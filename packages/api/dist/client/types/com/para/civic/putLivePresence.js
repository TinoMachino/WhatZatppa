"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveStatusRequiredError = exports.InvalidPhaseError = exports.NotFoundError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.para.civic.putLivePresence';
class NotFoundError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.NotFoundError = NotFoundError;
class InvalidPhaseError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.InvalidPhaseError = InvalidPhaseError;
class LiveStatusRequiredError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.LiveStatusRequiredError = LiveStatusRequiredError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'NotFound')
            return new NotFoundError(e);
        if (e.error === 'InvalidPhase')
            return new InvalidPhaseError(e);
        if (e.error === 'LiveStatusRequired')
            return new LiveStatusRequiredError(e);
    }
    return e;
}
//# sourceMappingURL=putLivePresence.js.map
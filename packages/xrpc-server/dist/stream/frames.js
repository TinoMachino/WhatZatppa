"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFrame = exports.MessageFrame = exports.Frame = void 0;
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
const errors_1 = require("../errors");
const types_1 = require("./types");
class Frame {
    get op() {
        return this.header.op;
    }
    toBytes() {
        return Buffer.concat([(0, lex_cbor_1.encode)(this.header), (0, lex_cbor_1.encode)(this.body)]);
    }
    isMessage() {
        return this.op === types_1.FrameType.Message;
    }
    isError() {
        return this.op === types_1.FrameType.Error;
    }
    static fromBytes(bytes) {
        const [header, body, ...rest] = (0, lex_cbor_1.decodeAll)(bytes);
        if (rest.length) {
            throw new Error('Too many CBOR data items in frame');
        }
        else if (body === undefined) {
            throw new Error('Missing frame body');
        }
        const parsedHeader = types_1.frameHeader.safeParse(header);
        if (!parsedHeader.success) {
            throw new Error(`Invalid frame header: ${parsedHeader.reason.message}`);
        }
        const frameOp = parsedHeader.value.op;
        if (frameOp === types_1.FrameType.Message) {
            return new MessageFrame(body, {
                type: parsedHeader.value.t,
            });
        }
        else if (frameOp === types_1.FrameType.Error) {
            const parsedBody = types_1.errorFrameBody.safeParse(body);
            if (!parsedBody.success) {
                throw new Error(`Invalid error frame body: ${parsedBody.reason.message}`);
            }
            return new ErrorFrame(parsedBody.value);
        }
        else {
            const exhaustiveCheck = frameOp;
            throw new Error(`Unknown frame op: ${exhaustiveCheck}`);
        }
    }
}
exports.Frame = Frame;
class MessageFrame extends Frame {
    constructor(body, opts) {
        super();
        Object.defineProperty(this, "header", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.header =
            opts?.type !== undefined
                ? { op: types_1.FrameType.Message, t: opts?.type }
                : { op: types_1.FrameType.Message };
        this.body = body;
    }
    get type() {
        return this.header.t;
    }
    static fromLexValue(data, nsid) {
        if (!(0, lex_data_1.isPlainObject)(data)) {
            return new MessageFrame(data);
        }
        const $type = data?.['$type'];
        if (typeof $type !== 'string') {
            return new MessageFrame(data);
        }
        let type;
        const split = $type.split('#');
        if (split.length === 2 && (split[0] === '' || split[0] === nsid)) {
            type = `#${split[1]}`;
        }
        else {
            type = $type;
        }
        const { $type: _, ...clone } = data;
        return new MessageFrame(clone, { type });
    }
}
exports.MessageFrame = MessageFrame;
class ErrorFrame extends Frame {
    constructor(body) {
        super();
        Object.defineProperty(this, "header", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.header = { op: types_1.FrameType.Error };
        this.body = body;
    }
    get code() {
        return this.body.error;
    }
    get message() {
        return this.body.message;
    }
    static fromError(err) {
        if (err instanceof ErrorFrame)
            return err;
        const { error = 'Unknown', message } = errors_1.XRPCError.fromError(err).payload;
        return new ErrorFrame({ error, message });
    }
}
exports.ErrorFrame = ErrorFrame;
//# sourceMappingURL=frames.js.map
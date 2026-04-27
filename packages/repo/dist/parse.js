"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObjByDef = exports.getAndParseByDef = exports.getAndParseRecord = void 0;
const lex_cbor_1 = require("@atproto/lex-cbor");
const error_1 = require("./error");
const util_1 = require("./util");
const getAndParseRecord = async (blocks, cid) => {
    const bytes = blocks.get(cid);
    if (!bytes) {
        throw new error_1.MissingBlockError(cid, 'record');
    }
    const record = (0, util_1.cborToLexRecord)(bytes);
    return { record, bytes };
};
exports.getAndParseRecord = getAndParseRecord;
const getAndParseByDef = async (blocks, cid, def) => {
    const bytes = blocks.get(cid);
    if (!bytes) {
        throw new error_1.MissingBlockError(cid, def.name);
    }
    return (0, exports.parseObjByDef)(bytes, cid, def);
};
exports.getAndParseByDef = getAndParseByDef;
const parseObjByDef = (bytes, cid, def) => {
    const obj = (0, lex_cbor_1.decode)(bytes);
    const res = def.schema.safeParse(obj);
    if (res.success) {
        return { obj: res.data, bytes };
    }
    else {
        throw new error_1.UnexpectedObjectError(cid, def.name);
    }
};
exports.parseObjByDef = parseObjByDef;
//# sourceMappingURL=parse.js.map
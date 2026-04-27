"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableBlockstore = void 0;
const error_1 = require("../error");
const parse_1 = require("../parse");
const util_1 = require("../util");
class ReadableBlockstore {
    async attemptRead(cid, def) {
        const bytes = await this.getBytes(cid);
        if (!bytes)
            return null;
        return (0, parse_1.parseObjByDef)(bytes, cid, def);
    }
    async readObjAndBytes(cid, def) {
        const read = await this.attemptRead(cid, def);
        if (!read) {
            throw new error_1.MissingBlockError(cid, def.name);
        }
        return read;
    }
    async readObj(cid, def) {
        const obj = await this.readObjAndBytes(cid, def);
        return obj.obj;
    }
    async attemptReadRecord(cid) {
        try {
            return await this.readRecord(cid);
        }
        catch {
            return null;
        }
    }
    async readRecord(cid) {
        const bytes = await this.getBytes(cid);
        if (!bytes) {
            throw new error_1.MissingBlockError(cid);
        }
        return (0, util_1.cborToLexRecord)(bytes);
    }
}
exports.ReadableBlockstore = ReadableBlockstore;
exports.default = ReadableBlockstore;
//# sourceMappingURL=readable-blockstore.js.map
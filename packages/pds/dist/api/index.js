"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicon_1 = require("../lexicon");
const lexicons_1 = require("../lexicon/lexicons");
const bsky_1 = __importDefault(require("./app/bsky"));
const atproto_1 = __importDefault(require("./com/atproto"));
const para_1 = __importDefault(require("./com/para"));
function default_1(server, ctx) {
    server.addLexicons(lexicons_1.schemas);
    (0, atproto_1.default)(server, ctx);
    const paraServer = { xrpc: server };
    paraServer.com = { para: new lexicon_1.ComParaNS(paraServer) };
    (0, para_1.default)(paraServer, ctx);
    (0, bsky_1.default)(server, ctx);
    return server;
}
//# sourceMappingURL=index.js.map
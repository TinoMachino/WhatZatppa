"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const createBoard_1 = __importDefault(require("./createBoard"));
const getBoard_1 = __importDefault(require("./getBoard"));
const getGovernance_1 = __importDefault(require("./getGovernance"));
const listBoards_1 = __importDefault(require("./listBoards"));
const acceptDraftInvite_1 = __importDefault(require("./acceptDraftInvite"));
const join_1 = __importDefault(require("./join"));
const leave_1 = __importDefault(require("./leave"));
function default_1(server, ctx) {
    (0, createBoard_1.default)(server, ctx);
    (0, getBoard_1.default)(server, ctx);
    (0, getGovernance_1.default)(server, ctx);
    (0, listBoards_1.default)(server, ctx);
    (0, acceptDraftInvite_1.default)(server, ctx);
    (0, join_1.default)(server, ctx);
    (0, leave_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LOGGER_NAME = void 0;
const common_1 = require("@atproto/common");
exports.LOGGER_NAME = 'xrpc-server';
exports.logger = (0, common_1.subsystemLogger)(exports.LOGGER_NAME);
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map
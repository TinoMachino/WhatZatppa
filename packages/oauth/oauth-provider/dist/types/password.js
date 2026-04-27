"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordSchema = exports.oldPasswordSchema = void 0;
const zod_1 = require("zod");
exports.oldPasswordSchema = zod_1.z.string().min(1).max(512);
exports.newPasswordSchema = zod_1.z.string().min(8).max(256);
//# sourceMappingURL=password.js.map
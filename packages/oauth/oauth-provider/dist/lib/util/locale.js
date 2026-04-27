"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiLangStringSchema = exports.localeSchema = void 0;
const zod_1 = require("zod");
exports.localeSchema = zod_1.z
    .string()
    .regex(/^[a-z]{2,3}(-[A-Z]{2})?$/, 'Invalid locale');
exports.multiLangStringSchema = zod_1.z.record(exports.localeSchema, zod_1.z.string().optional());
//# sourceMappingURL=locale.js.map
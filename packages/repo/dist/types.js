"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteOpAction = exports.def = exports.schema = void 0;
const zod_1 = require("zod");
const lex_data_1 = require("@atproto/lex-data");
// Repo nodes
// ---------------
const cidSchema = zod_1.z.unknown().transform((input, ctx) => {
    const cid = (0, lex_data_1.ifCid)(input);
    if (cid)
        return cid;
    ctx.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        message: 'Not a valid CID',
    });
    return zod_1.z.NEVER;
});
const unsignedCommit = zod_1.z.object({
    did: zod_1.z.string(),
    version: zod_1.z.literal(3),
    data: cidSchema,
    rev: zod_1.z.string(),
    // `prev` added for backwards compatibility with v2, no requirement of keeping around history
    prev: cidSchema.nullable(),
});
const commit = zod_1.z.object({
    did: zod_1.z.string(),
    version: zod_1.z.literal(3),
    data: cidSchema,
    rev: zod_1.z.string(),
    prev: cidSchema.nullable(),
    sig: zod_1.z.instanceof(Uint8Array),
});
const legacyV2Commit = zod_1.z.object({
    did: zod_1.z.string(),
    version: zod_1.z.literal(2),
    data: cidSchema,
    rev: zod_1.z.string().optional(),
    prev: cidSchema.nullable(),
    sig: zod_1.z.instanceof(Uint8Array),
});
const versionedCommit = zod_1.z.discriminatedUnion('version', [
    commit,
    legacyV2Commit,
]);
exports.schema = {
    cid: cidSchema,
    carHeader: zod_1.z.object({
        version: zod_1.z.literal(1),
        roots: zod_1.z.array(cidSchema),
    }),
    bytes: zod_1.z.instanceof(Uint8Array),
    string: zod_1.z.string(),
    array: zod_1.z.array(zod_1.z.unknown()),
    map: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
    unknown: zod_1.z.unknown(),
    commit,
    legacyV2Commit,
    versionedCommit,
};
exports.def = {
    cid: {
        name: 'cid',
        schema: exports.schema.cid,
    },
    carHeader: {
        name: 'CAR header',
        schema: exports.schema.carHeader,
    },
    bytes: {
        name: 'bytes',
        schema: exports.schema.bytes,
    },
    string: {
        name: 'string',
        schema: exports.schema.string,
    },
    map: {
        name: 'map',
        schema: exports.schema.map,
    },
    unknown: {
        name: 'unknown',
        schema: exports.schema.unknown,
    },
    commit: {
        name: 'commit',
        schema: exports.schema.commit,
    },
    versionedCommit: {
        name: 'versioned_commit',
        schema: exports.schema.versionedCommit,
    },
};
// Repo Operations
// ---------------
var WriteOpAction;
(function (WriteOpAction) {
    WriteOpAction["Create"] = "create";
    WriteOpAction["Update"] = "update";
    WriteOpAction["Delete"] = "delete";
})(WriteOpAction || (exports.WriteOpAction = WriteOpAction = {}));
//# sourceMappingURL=types.js.map
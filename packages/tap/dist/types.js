"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoInfoSchema = exports.parseTapEvent = exports.tapEventSchema = exports.identityEventSchema = exports.recordEventSchema = exports.identityEventDataSchema = exports.recordEventDataSchema = void 0;
const lex_1 = require("@atproto/lex");
exports.recordEventDataSchema = lex_1.l.object({
    did: lex_1.l.string({ format: 'did' }),
    rev: lex_1.l.string(),
    collection: lex_1.l.string({ format: 'nsid' }),
    rkey: lex_1.l.string({ format: 'record-key' }),
    action: lex_1.l.enum(['create', 'update', 'delete']),
    record: lex_1.l.optional(lex_1.l.lexMap()),
    cid: lex_1.l.optional(lex_1.l.string({ format: 'cid' })),
    live: lex_1.l.boolean(),
});
exports.identityEventDataSchema = lex_1.l.object({
    did: lex_1.l.string({ format: 'did' }),
    handle: lex_1.l.string({ format: 'handle' }),
    is_active: lex_1.l.boolean(),
    status: lex_1.l.enum([
        'active',
        'takendown',
        'suspended',
        'deactivated',
        'deleted',
    ]),
});
exports.recordEventSchema = lex_1.l.object({
    id: lex_1.l.integer(),
    type: lex_1.l.literal('record'),
    record: exports.recordEventDataSchema,
});
exports.identityEventSchema = lex_1.l.object({
    id: lex_1.l.integer(),
    type: lex_1.l.literal('identity'),
    identity: exports.identityEventDataSchema,
});
exports.tapEventSchema = lex_1.l.discriminatedUnion('type', [
    exports.recordEventSchema,
    exports.identityEventSchema,
]);
const parseTapEvent = (data) => {
    const parsed = exports.tapEventSchema.parse(data);
    if (parsed.type === 'identity') {
        return {
            id: parsed.id,
            type: parsed.type,
            did: parsed.identity.did,
            handle: parsed.identity.handle,
            isActive: parsed.identity.is_active,
            status: parsed.identity.status,
        };
    }
    else {
        return {
            id: parsed.id,
            type: parsed.type,
            action: parsed.record.action,
            did: parsed.record.did,
            rev: parsed.record.rev,
            collection: parsed.record.collection,
            rkey: parsed.record.rkey,
            record: parsed.record.record,
            cid: parsed.record.cid,
            live: parsed.record.live,
        };
    }
};
exports.parseTapEvent = parseTapEvent;
exports.repoInfoSchema = lex_1.l.object({
    did: lex_1.l.string(),
    handle: lex_1.l.string(),
    state: lex_1.l.string(),
    rev: lex_1.l.string(),
    records: lex_1.l.integer(),
    error: lex_1.l.optional(lex_1.l.string()),
    retries: lex_1.l.optional(lex_1.l.integer()),
});
//# sourceMappingURL=types.js.map
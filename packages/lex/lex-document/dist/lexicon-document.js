"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexiconDocumentSchema = exports.lexiconIdentifierSchema = exports.lexiconPermissionSetSchema = exports.lexiconPermissionSchema = exports.lexiconLanguageDict = exports.lexiconLanguageSchema = exports.lexiconSubscriptionSchema = exports.lexiconProcedureSchema = exports.lexiconQuerySchema = exports.lexiconError = exports.lexiconPayload = exports.lexiconParameters = exports.lexiconRecordSchema = exports.lexiconRecordKeySchema = exports.lexiconObjectSchema = exports.lexiconArraySchema = exports.lexiconRefUnionSchema = exports.lexiconRefSchema = exports.lexiconTokenSchema = exports.lexiconUnknownSchema = exports.lexiconBlobSchema = exports.lexiconCidLinkSchema = exports.lexiconBytesSchema = exports.lexiconStringSchema = exports.lexiconIntegerSchema = exports.lexiconBooleanSchema = void 0;
const lex_schema_1 = require("@atproto/lex-schema");
// https://atproto.com/specs/lexicon
// "Concrete" Types
/**
 * Schema for validating Lexicon boolean type definitions.
 *
 * Validates boolean field definitions that may include a default value,
 * a constant value, and an optional description.
 */
exports.lexiconBooleanSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('boolean'),
    default: lex_schema_1.l.optional(lex_schema_1.l.boolean()),
    const: lex_schema_1.l.optional(lex_schema_1.l.boolean()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon integer type definitions.
 *
 * Validates integer field definitions with support for default values,
 * minimum/maximum constraints, enumerated values, and constant values.
 */
exports.lexiconIntegerSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('integer'),
    default: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    minimum: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    maximum: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    enum: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.integer())),
    const: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon string type definitions.
 *
 * Validates string field definitions with support for format validation,
 * length constraints (both character and grapheme-based), enumerated values,
 * known values, and constant values.
 */
exports.lexiconStringSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('string'),
    format: lex_schema_1.l.optional(lex_schema_1.l.enum(lex_schema_1.l.STRING_FORMATS)),
    default: lex_schema_1.l.optional(lex_schema_1.l.string()),
    minLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    maxLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    minGraphemes: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    maxGraphemes: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    enum: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    const: lex_schema_1.l.optional(lex_schema_1.l.string()),
    knownValues: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon bytes type definitions.
 *
 * Validates binary data field definitions with optional length constraints.
 * Used for raw byte arrays in DAG-CBOR encoding.
 */
exports.lexiconBytesSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('bytes'),
    maxLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    minLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon CID link type definitions.
 *
 * Validates Content Identifier (CID) link field definitions.
 * CIDs are used to reference content-addressed data in IPFS/IPLD.
 */
exports.lexiconCidLinkSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('cid-link'),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon blob type definitions.
 *
 * Validates blob field definitions with optional MIME type acceptance list
 * and maximum size constraints. Blobs represent uploaded file references.
 */
exports.lexiconBlobSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('blob'),
    accept: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    maxSize: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Array of all concrete (primitive) Lexicon type schemas.
 * Includes boolean, integer, string, bytes, cid-link, and blob types.
 */
const CONCRETE_TYPES = [
    exports.lexiconBooleanSchema,
    exports.lexiconIntegerSchema,
    exports.lexiconStringSchema,
    // Lexicon (DAG-CBOR)
    exports.lexiconBytesSchema,
    exports.lexiconCidLinkSchema,
    // Lexicon Specific
    exports.lexiconBlobSchema,
];
// Meta types
/**
 * Schema for validating Lexicon unknown type definitions.
 *
 * Validates unknown field definitions which accept any valid data.
 * Used when the schema cannot determine the type ahead of time.
 */
exports.lexiconUnknownSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('unknown'),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon token type definitions.
 *
 * Validates token definitions which represent symbolic constants.
 * Tokens are used to define enumeration-like values that can be
 * referenced across different lexicons.
 */
exports.lexiconTokenSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('token'),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon reference type definitions.
 *
 * Validates reference definitions which point to other type definitions
 * within the same or different Lexicon documents. References use the
 * format "nsid#defName" for cross-document refs or "#defName" for local refs.
 */
exports.lexiconRefSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('ref'),
    ref: lex_schema_1.l.string(),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon union reference type definitions.
 *
 * Validates union definitions which can reference multiple possible types.
 * The union can be closed (only listed types allowed) or open (allows
 * additional unlisted types).
 */
exports.lexiconRefUnionSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('union'),
    refs: lex_schema_1.l.array(lex_schema_1.l.string()),
    closed: lex_schema_1.l.optional(lex_schema_1.l.boolean()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
// Complex Types
const ARRAY_ITEMS_SCHEMAS = [
    ...CONCRETE_TYPES,
    // Meta
    exports.lexiconUnknownSchema,
    exports.lexiconRefSchema,
    exports.lexiconRefUnionSchema,
];
/**
 * Schema for validating Lexicon array type definitions.
 *
 * Validates array field definitions with specified item type and
 * optional length constraints.
 */
exports.lexiconArraySchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('array'),
    items: lex_schema_1.l.discriminatedUnion('type', ARRAY_ITEMS_SCHEMAS),
    minLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    maxLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
const requirePropertiesRefinement = {
    check: (v) => !v.required || v.required.every((k) => k in v.properties),
    message: 'All required parameters must be defined in properties',
    path: 'required',
};
/**
 * Schema for validating Lexicon object type definitions.
 *
 * Validates object definitions with named properties, required field lists,
 * and nullable field lists. Includes refinement to ensure all required
 * properties are defined in the properties map.
 */
exports.lexiconObjectSchema = lex_schema_1.l.refine(lex_schema_1.l.object({
    type: lex_schema_1.l.literal('object'),
    properties: lex_schema_1.l.dict(lex_schema_1.l.string(), lex_schema_1.l.discriminatedUnion('type', [
        ...ARRAY_ITEMS_SCHEMAS,
        exports.lexiconArraySchema,
    ])),
    required: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    nullable: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
}), requirePropertiesRefinement);
// Records
/**
 * Schema for validating Lexicon record key definitions.
 *
 * Validates record key type specifications. Valid values are:
 * - "any": Any valid record key
 * - "nsid": Namespaced identifier
 * - "tid": Timestamp identifier
 * - "literal:<string>": A specific literal string value
 */
exports.lexiconRecordKeySchema = lex_schema_1.l.custom(lex_schema_1.l.isLexiconRecordKey, 'Invalid record key definition (must be "any", "nsid", "tid", or "literal:<string>")');
/**
 * Schema for validating Lexicon record type definitions.
 *
 * Validates record definitions which define the structure of data
 * stored in AT Protocol repositories. Records have a key type
 * and an object schema defining the record's data structure.
 */
exports.lexiconRecordSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('record'),
    record: exports.lexiconObjectSchema,
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
    key: exports.lexiconRecordKeySchema,
});
// XRPC Methods
/**
 * Schema for validating Lexicon XRPC method parameters.
 *
 * Validates the parameters definition for query and procedure methods.
 * Parameters can only be primitive types (boolean, integer, string)
 * or arrays of primitives.
 */
exports.lexiconParameters = lex_schema_1.l.refine(lex_schema_1.l.object({
    type: lex_schema_1.l.literal('params'),
    properties: lex_schema_1.l.dict(lex_schema_1.l.string(), lex_schema_1.l.discriminatedUnion('type', [
        exports.lexiconBooleanSchema,
        exports.lexiconIntegerSchema,
        exports.lexiconStringSchema,
        lex_schema_1.l.object({
            type: lex_schema_1.l.literal('array'),
            items: lex_schema_1.l.discriminatedUnion('type', [
                exports.lexiconBooleanSchema,
                exports.lexiconIntegerSchema,
                exports.lexiconStringSchema,
            ]),
            minLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
            maxLength: lex_schema_1.l.optional(lex_schema_1.l.integer()),
            description: lex_schema_1.l.optional(lex_schema_1.l.string()),
        }),
    ])),
    required: lex_schema_1.l.optional(lex_schema_1.l.array(lex_schema_1.l.string())),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
}), requirePropertiesRefinement);
/**
 * Schema for validating Lexicon XRPC method payloads.
 *
 * Validates input/output payload definitions for procedures and queries.
 * Payloads specify the encoding (MIME type) and optional schema for
 * the request or response body.
 */
exports.lexiconPayload = lex_schema_1.l.object({
    encoding: lex_schema_1.l.refine(lex_schema_1.l.string(), {
        check: (v) => !v.includes(',') && !v.includes(';') && !v.includes(' '),
        message: 'Invalid encoding string (must be a single MIME type without parameters)',
    }),
    schema: lex_schema_1.l.optional(lex_schema_1.l.discriminatedUnion('type', [
        exports.lexiconRefSchema,
        exports.lexiconRefUnionSchema,
        exports.lexiconObjectSchema,
    ])),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon XRPC error definitions.
 *
 * Validates error definitions that can be returned by XRPC methods.
 * Each error has a name and optional description.
 */
exports.lexiconError = lex_schema_1.l.object({
    name: lex_schema_1.l.string({ minLength: 1 }),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon query (GET) method definitions.
 *
 * Validates query method definitions which represent read-only HTTP GET
 * operations. Queries can have parameters, an output payload, and
 * defined error types.
 */
exports.lexiconQuerySchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('query'),
    parameters: lex_schema_1.l.optional(exports.lexiconParameters),
    output: lex_schema_1.l.optional(exports.lexiconPayload),
    errors: lex_schema_1.l.optional(lex_schema_1.l.array(exports.lexiconError)),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon procedure (POST) method definitions.
 *
 * Validates procedure method definitions which represent HTTP POST
 * operations that may modify state. Procedures can have parameters,
 * input payload, output payload, and defined error types.
 */
exports.lexiconProcedureSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('procedure'),
    parameters: lex_schema_1.l.optional(exports.lexiconParameters),
    input: lex_schema_1.l.optional(exports.lexiconPayload),
    output: lex_schema_1.l.optional(exports.lexiconPayload),
    errors: lex_schema_1.l.optional(lex_schema_1.l.array(exports.lexiconError)),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
/**
 * Schema for validating Lexicon subscription (WebSocket) method definitions.
 *
 * Validates subscription method definitions which represent real-time
 * streaming connections over WebSocket. Subscriptions have parameters,
 * a message schema defining the streamed data format, and error types.
 */
exports.lexiconSubscriptionSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('subscription'),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
    parameters: lex_schema_1.l.optional(exports.lexiconParameters),
    message: lex_schema_1.l.object({
        description: lex_schema_1.l.optional(lex_schema_1.l.string()),
        schema: exports.lexiconRefUnionSchema,
    }),
    errors: lex_schema_1.l.optional(lex_schema_1.l.array(exports.lexiconError)),
});
// Permissions
/**
 * Schema for validating language codes in Lexicon permission definitions.
 */
exports.lexiconLanguageSchema = lex_schema_1.l.string({ format: 'language' });
/**
 * Schema for validating language-keyed string dictionaries.
 * Used for localized text in permission definitions.
 */
exports.lexiconLanguageDict = lex_schema_1.l.dict(exports.lexiconLanguageSchema, lex_schema_1.l.string());
/**
 * Schema for validating individual Lexicon permission definitions.
 */
exports.lexiconPermissionSchema = lex_schema_1.l.intersection(lex_schema_1.l.object({
    type: lex_schema_1.l.literal('permission'),
    resource: lex_schema_1.l.string({ minLength: 1 }),
}), lex_schema_1.l.dict(lex_schema_1.l.string(), lex_schema_1.l.paramSchema));
/**
 * Schema for validating Lexicon permission set definitions.
 */
exports.lexiconPermissionSetSchema = lex_schema_1.l.object({
    type: lex_schema_1.l.literal('permission-set'),
    permissions: lex_schema_1.l.array(exports.lexiconPermissionSchema),
    title: lex_schema_1.l.optional(lex_schema_1.l.string()),
    'title:lang': lex_schema_1.l.optional(exports.lexiconLanguageDict),
    detail: lex_schema_1.l.optional(lex_schema_1.l.string()),
    'detail:lang': lex_schema_1.l.optional(exports.lexiconLanguageDict),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
});
const NAMED_LEXICON_SCHEMAS = [
    ...CONCRETE_TYPES,
    exports.lexiconArraySchema,
    exports.lexiconObjectSchema,
    exports.lexiconTokenSchema,
];
const MAIN_LEXICON_SCHEMAS = [
    exports.lexiconPermissionSetSchema,
    exports.lexiconProcedureSchema,
    exports.lexiconQuerySchema,
    exports.lexiconRecordSchema,
    exports.lexiconSubscriptionSchema,
    ...NAMED_LEXICON_SCHEMAS,
];
/**
 * Schema for validating Lexicon document identifiers (NSIDs).
 *
 * Validates that the identifier follows the Namespaced Identifier format
 * (e.g., "com.atproto.repo.createRecord").
 */
exports.lexiconIdentifierSchema = lex_schema_1.l.string({ format: 'nsid' });
/**
 * Schema for validating complete Lexicon document structures.
 *
 * Validates the top-level structure of a Lexicon document, including:
 * - `lexicon`: Must be 1 (the current Lexicon version)
 * - `id`: The document's NSID
 * - `revision`: Optional version number
 * - `description`: Optional document description
 * - `defs`: Map of definition names to their schemas
 *
 * The "main" definition (if present) can be any main-only type,
 * while other definitions are limited to named types.
 *
 * @example
 * ```ts
 * const result = lexiconDocumentSchema.parse({
 *   lexicon: 1,
 *   id: 'com.example.getProfile',
 *   defs: {
 *     main: {
 *       type: 'query',
 *       output: {
 *         encoding: 'application/json',
 *         schema: { type: 'ref', ref: '#profile' }
 *       }
 *     },
 *     profile: {
 *       type: 'object',
 *       properties: {
 *         name: { type: 'string' }
 *       }
 *     }
 *   }
 * })
 * ```
 */
exports.lexiconDocumentSchema = lex_schema_1.l.object({
    lexicon: lex_schema_1.l.literal(1),
    id: exports.lexiconIdentifierSchema,
    revision: lex_schema_1.l.optional(lex_schema_1.l.integer()),
    description: lex_schema_1.l.optional(lex_schema_1.l.string()),
    defs: lex_schema_1.l.intersection(lex_schema_1.l.object({
        main: lex_schema_1.l.optional(lex_schema_1.l.discriminatedUnion('type', MAIN_LEXICON_SCHEMAS)),
    }), lex_schema_1.l.dict(lex_schema_1.l.string({ minLength: 1 }), lex_schema_1.l.discriminatedUnion('type', NAMED_LEXICON_SCHEMAS))),
});
//# sourceMappingURL=lexicon-document.js.map
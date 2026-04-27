"use strict";
/**
 * The `@atproto/lex` package provides utilities for working with ATProtocol
 * lexicons, including data types, JSON encoding/decoding, schema validation,
 * and HTTP client functionality.
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexToJson = exports.lexStringify = exports.lexParse = exports.jsonToLex = exports.l = exports.xrpcSafe = exports.xrpc = exports.Client = void 0;
const tslib_1 = require("tslib");
var lex_client_1 = require("@atproto/lex-client");
/**
 * The Client class is the primary interface for interacting with AT Protocol
 * services though an authenticated session. It provides methods for making
 * XRPC requests, handling records, and managing blobs.
 */
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return lex_client_1.Client; } });
/**
 * The `xrpc` function is a low-level utility for making XRPC requests towards
 * a specific service. It allows for detailed control over the request,
 * including custom parameters, body, and headers. This function is useful for
 * advanced use cases where the higher-level `Client` methods may not provide
 * enough flexibility.
 */
Object.defineProperty(exports, "xrpc", { enumerable: true, get: function () { return lex_client_1.xrpc; } });
/**
 * The `xrpcSafe` function is a wrapper around `xrpc` that provides additional
 * safety checks and error handling. It ensures that the request is properly
 * formed and that any errors are caught and handled gracefully. This function
 * is recommended for most use cases, as it provides a safer interface for
 * making XRPC requests.
 */
Object.defineProperty(exports, "xrpcSafe", { enumerable: true, get: function () { return lex_client_1.xrpcSafe; } });
tslib_1.__exportStar(require("@atproto/lex-client"), exports);
var lex_schema_1 = require("@atproto/lex-schema");
/**
 * The {@link l} namespace (from `@atproto/lex-schema`) provides an imperative API for building schemas:
 *
 * ### Primitive Types
 * - {@link l.string | l.string()} - String values with optional format/length constraints
 * - {@link l.integer | l.integer()} - Integer values with optional min/max constraints
 * - {@link l.boolean | l.boolean()} - Boolean values
 * - {@link l.bytes | l.bytes()} - Binary data (Uint8Array)
 * - {@link l.cid | l.cid()} - Content Identifier values
 * - {@link l.blob | l.blob()} - Blob references with mime type and size
 *
 * ### Composite Types
 * - {@link l.object | l.object()} - Objects with defined property schemas
 * - {@link l.array | l.array()} - Arrays with element type validation
 * - {@link l.union | l.union()} - Union of multiple possible types
 * - {@link l.ref | l.ref()} - Reference to another schema definition
 * - {@link l.literal | l.literal()} - Literal constant values
 * - {@link l.enum | l.enum()} - Enum of allowed string values
 * - {@link l.typedRef | l.typedRef()} - Reference to a {@link l.typedObject | l.typedObject()}
 * - {@link l.typedUnion | l.typedUnion()} - Discriminated union between multiple {@link l.typedRef | l.typedRef()} or {@link l.typedObject | l.typedObject()} types
 *
 * ### Modifiers
 * - {@link l.optional | l.optional()} - Mark a property as optional
 * - {@link l.nullable | l.nullable()} - Allow null values
 * - {@link l.withDefault | l.withDefault()} - Provide a default value
 *
 * ### Lexicon Definitions
 * - {@link l.typedObject | l.typedObject()} - Define a typed object with a `$type` property
 * - {@link l.record | l.record()} - Define a Lexicon record type
 * - {@link l.query | l.query()} - Define a Lexicon query method
 * - {@link l.procedure | l.procedure()} - Define a Lexicon procedure method
 * - {@link l.subscription | l.subscription()} - Define a Lexicon subscription method
 */
Object.defineProperty(exports, "l", { enumerable: true, get: function () { return lex_schema_1.l; } });
tslib_1.__exportStar(require("@atproto/lex-schema"), exports);
tslib_1.__exportStar(require("@atproto/lex-data"), exports);
var lex_json_1 = require("@atproto/lex-json");
/**
 * The `jsonToLex` function takes a plain JavaScript object (typically parsed from
 * JSON) and converts it back into a LexValue, reconstructing any complex types as needed. This is useful
 * for processing data received from the network or loaded from JSON storage.
 */
Object.defineProperty(exports, "jsonToLex", { enumerable: true, get: function () { return lex_json_1.jsonToLex; } });
/**
 * The `lexParse` function takes a JSON string and parses it into a LexValue. It
 * performs the necessary conversions to reconstruct complex LexValue types from
 * their JSON representations.
 */
Object.defineProperty(exports, "lexParse", { enumerable: true, get: function () { return lex_json_1.lexParse; } });
/**
 * The `lexStringify` function takes a LexValue and serializes it to a JSON string.
 * It handles the conversion of complex LexValue types (like BlobRef and Cid) into
 * a JSON-friendly format.
 */
Object.defineProperty(exports, "lexStringify", { enumerable: true, get: function () { return lex_json_1.lexStringify; } });
/**
 * The `lexToJson` function converts a LexValue into a plain JavaScript object
 * that can be safely serialized to JSON. This is useful for preparing data to be
 * sent over the network or stored in a JSON format.
 */
Object.defineProperty(exports, "lexToJson", { enumerable: true, get: function () { return lex_json_1.lexToJson; } });
tslib_1.__exportStar(require("@atproto/lex-json"), exports);
//# sourceMappingURL=index.js.map
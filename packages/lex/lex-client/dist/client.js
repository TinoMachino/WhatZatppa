"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const lex_schema_1 = require("@atproto/lex-schema");
const agent_js_1 = require("./agent.js");
const index_js_1 = require("./lexicons/index.js");
const util_js_1 = require("./util.js");
const xrpc_js_1 = require("./xrpc.js");
/**
 * The Client class is the primary interface for interacting with AT Protocol
 * services. It provides type-safe methods for XRPC calls, record operations,
 * and blob handling.
 *
 * @example
 * ```typescript
 * import { Client } from '@atproto/lex'
 * import { app } from '#/lexicons
 *
 * const client = new Client(oauthSession)
 *
 * const response = await client.xrpc(app.bsky.feed.getTimeline.main, {
 *   params: { limit: 50 }
 * })
 * ```
 */
class Client {
    static appLabelers = [];
    /**
     * Configures the Client (or its sub classes) globally.
     */
    static configure(opts) {
        if (opts.appLabelers)
            this.appLabelers = [...opts.appLabelers];
    }
    /** The underlying agent used for making requests. */
    agent;
    /** Custom headers included in all requests. */
    headers;
    /** Optional service identifier for routing requests. */
    service;
    /** Set of labeler DIDs specific to this client instance. */
    labelers;
    xrpcDefaults;
    constructor(agent, options = {}) {
        this.agent = (0, agent_js_1.buildAgent)(agent);
        this.service = options.service;
        this.labelers = new Set(options.labelers);
        this.headers = new Headers(options.headers);
        this.xrpcDefaults = Object.freeze({
            validateRequest: options.validateRequest ?? false,
            validateResponse: options.validateResponse ?? true,
            strictResponseProcessing: options.strictResponseProcessing ?? true,
        });
    }
    /**
     * The DID of the authenticated user, or `undefined` if not authenticated.
     */
    get did() {
        return this.agent.did;
    }
    /**
     * The DID of the authenticated user.
     * @throws {Error} if not authenticated
     */
    get assertDid() {
        this.assertAuthenticated();
        return this.did;
    }
    /**
     * Asserts that the client is authenticated.
     * Use as a type guard when you need to ensure authentication.
     *
     * @throws {Error} if not authenticated
     *
     * @example
     * ```typescript
     * client.assertAuthenticated()
     * // TypeScript now knows client.did is defined
     * console.log(client.did)
     * ```
     */
    assertAuthenticated() {
        if (!this.did)
            throw new Error('Client is not authenticated');
    }
    /**
     * Replaces all labelers with the given set.
     * @param labelers - Iterable of labeler DIDs
     */
    setLabelers(labelers = []) {
        this.clearLabelers();
        this.addLabelers(labelers);
    }
    /**
     * Adds labelers to the current set.
     * @param labelers - Iterable of labeler DIDs to add
     */
    addLabelers(labelers) {
        for (const labeler of labelers)
            this.labelers.add(labeler);
    }
    /**
     * Removes all labelers from this client instance.
     */
    clearLabelers() {
        this.labelers.clear();
    }
    /**
     * {@link Agent}'s {@link Agent.fetchHandler} implementation, which adds
     * labelers and service proxying headers. This method allow a {@link Client}
     * instance to be used directly as an {@link Agent} for another
     * {@link Client}, enabling composition of headers (labelers, proxying, etc.).
     *
     * @param path - The request path
     * @param init - Request initialization options
     */
    fetchHandler(path, init) {
        const headers = (0, util_js_1.buildXrpcRequestHeaders)({
            headers: init.headers,
            service: this.service,
            labelers: [
                ...this.constructor.appLabelers.map((l) => `${l};redact`),
                ...this.labelers,
            ],
        });
        // Incoming headers take precedence
        for (const [key, value] of this.headers) {
            if (!headers.has(key))
                headers.set(key, value);
        }
        // @NOTE The agent here could be another Client instance.
        return this.agent.fetchHandler(path, { ...init, headers });
    }
    async xrpc(ns, options = {}) {
        return (0, xrpc_js_1.xrpc)(this, ns, (0, util_js_1.applyDefaults)(options, this.xrpcDefaults));
    }
    async xrpcSafe(ns, options = {}) {
        return (0, xrpc_js_1.xrpcSafe)(this, ns, (0, util_js_1.applyDefaults)(options, this.xrpcDefaults));
    }
    /**
     * Creates a new record in an AT Protocol repository.
     *
     * @param record - The record to create, must include an {@link NsidString} `$type`
     * @param rkey - Optional record key; if omitted, server generates a TID
     * @param options - Create options including repo, swapCommit, validate
     * @returns The XRPC response containing the created record's URI and CID
     *
     * @example
     * ```typescript
     * const response = await client.createRecord(
     *   { $type: 'app.bsky.feed.post', text: 'Hello!', createdAt: new Date().toISOString() },
     *   undefined, // Let server generate rkey
     *   { validate: true }
     * )
     * console.log(response.body.uri)
     * ```
     *
     * @see {@link create} for a higher-level typed alternative
     */
    async createRecord(record, rkey, options) {
        return this.xrpc(index_js_1.com.atproto.repo.createRecord.main, {
            ...options,
            body: {
                repo: options?.repo ?? this.assertDid,
                collection: record.$type,
                record,
                rkey,
                validate: options?.validate,
                swapCommit: options?.swapCommit,
            },
        });
    }
    /**
     * Deletes a record from an AT Protocol repository.
     *
     * @param collection - The collection NSID
     * @param rkey - The record key
     * @param options - Delete options including repo, swapCommit, swapRecord
     *
     * @see {@link delete} for a higher-level typed alternative
     */
    async deleteRecord(collection, rkey, options) {
        return this.xrpc(index_js_1.com.atproto.repo.deleteRecord.main, {
            ...options,
            body: {
                repo: options?.repo ?? this.assertDid,
                collection,
                rkey,
                swapCommit: options?.swapCommit,
                swapRecord: options?.swapRecord,
            },
        });
    }
    /**
     * Retrieves a record from an AT Protocol repository.
     *
     * @param collection - The collection NSID
     * @param rkey - The record key
     * @param options - Get options including repo
     *
     * @see {@link get} for a higher-level typed alternative
     */
    async getRecord(collection, rkey, options) {
        return this.xrpc(index_js_1.com.atproto.repo.getRecord.main, {
            ...options,
            params: {
                repo: options?.repo ?? this.assertDid,
                collection,
                rkey,
            },
        });
    }
    /**
     * Creates or updates a record in a repository.
     *
     * @param record - The record to put, must include an {@link NsidString} `$type`
     * @param rkey - The record key
     * @param options - Put options including repo, swapCommit, swapRecord, validate
     *
     * @see {@link put} for a higher-level typed alternative
     */
    async putRecord(record, rkey, options) {
        return this.xrpc(index_js_1.com.atproto.repo.putRecord.main, {
            ...options,
            body: {
                repo: options?.repo ?? this.assertDid,
                collection: record.$type,
                rkey,
                record,
                validate: options?.validate,
                swapCommit: options?.swapCommit,
                swapRecord: options?.swapRecord,
            },
        });
    }
    /**
     * Lists records in a collection.
     *
     * @param nsid - The collection NSID
     * @param options - List options including repo, limit, cursor, reverse
     *
     * @see {@link list} for a higher-level typed alternative
     */
    async listRecords(nsid, options) {
        return this.xrpc(index_js_1.com.atproto.repo.listRecords.main, {
            ...options,
            params: {
                repo: options?.repo ?? this.assertDid,
                collection: nsid,
                cursor: options?.cursor,
                limit: options?.limit,
                reverse: options?.reverse,
            },
        });
    }
    /**
     * Uploads a blob to an AT Protocol repository.
     *
     * @param body - The blob data (Uint8Array, ReadableStream, Blob, etc.)
     * @param options - Upload options including encoding hint
     * @returns Response containing the blob reference
     *
     * @example
     * ```typescript
     * const imageData = await fetch('image.png').then(r => r.arrayBuffer())
     * const response = await client.uploadBlob(new Uint8Array(imageData), {
     *   encoding: 'image/png'
     * })
     * console.log(response.body.blob) // Use this ref in records
     * ```
     */
    async uploadBlob(body, options) {
        return this.xrpc(index_js_1.com.atproto.repo.uploadBlob.main, { ...options, body });
    }
    /**
     * Retrieves a blob by DID and CID.
     *
     * @param did - The DID of the repository containing the blob
     * @param cid - The CID of the blob
     * @param options - Call options
     */
    async getBlob(did, cid, options) {
        return this.xrpc(index_js_1.com.atproto.sync.getBlob.main, {
            ...options,
            params: { did, cid },
        });
    }
    async call(ns, arg, options = {}) {
        const method = (0, lex_schema_1.getMain)(ns);
        if (typeof method === 'function') {
            return method(this, arg, options);
        }
        if (method instanceof lex_schema_1.Procedure) {
            const result = await this.xrpc(method, { ...options, body: arg });
            return result.body;
        }
        else if (method instanceof lex_schema_1.Query) {
            const result = await this.xrpc(method, { ...options, params: arg });
            return result.body;
        }
        else {
            throw new TypeError('Invalid lexicon');
        }
    }
    async create(ns, input, options = {}) {
        const schema = (0, lex_schema_1.getMain)(ns);
        const record = schema.build(input);
        if (options?.validateRequest)
            schema.validate(record);
        const rkey = options.rkey ?? getDefaultRecordKey(schema);
        if (rkey !== undefined)
            schema.keySchema.assert(rkey);
        const response = await this.createRecord(record, rkey, options);
        return response.body;
    }
    async delete(ns, options = {}) {
        const schema = (0, lex_schema_1.getMain)(ns);
        const rkey = schema.keySchema.parse(options.rkey ?? getLiteralRecordKey(schema));
        const response = await this.deleteRecord(schema.$type, rkey, options);
        return response.body;
    }
    async get(ns, options = {}) {
        const schema = (0, lex_schema_1.getMain)(ns);
        const rkey = schema.keySchema.parse(options.rkey ?? getLiteralRecordKey(schema));
        const response = await this.getRecord(schema.$type, rkey, options);
        const value = schema.validate(response.body.value);
        return { ...response.body, value };
    }
    async put(ns, input, options = {}) {
        const schema = (0, lex_schema_1.getMain)(ns);
        const record = schema.build(input);
        if (options?.validateRequest)
            schema.validate(record);
        const rkey = options.rkey ?? getLiteralRecordKey(schema);
        const response = await this.putRecord(record, rkey, options);
        return response.body;
    }
    /**
     * Lists records with type-safe validation and separation of valid/invalid records.
     *
     * @param ns - The record schema definition
     * @param options - List options
     * @returns Records split into valid (matching schema) and invalid arrays
     *
     * @example
     * ```typescript
     * const result = await client.list(app.bsky.feed.post.main, { limit: 100 })
     * console.log(`Found ${result.records.length} valid posts`)
     * console.log(`Found ${result.invalid.length} invalid records`)
     * ```
     */
    async list(ns, options) {
        const schema = (0, lex_schema_1.getMain)(ns);
        const { body } = await this.listRecords(schema.$type, options);
        const records = [];
        const invalid = [];
        for (const record of body.records) {
            const parsed = schema.safeValidate(record.value);
            if (parsed.success) {
                records.push({ ...record, value: parsed.value });
            }
            else {
                invalid.push(record.value);
            }
        }
        return { ...body, records, invalid };
    }
}
exports.Client = Client;
function getDefaultRecordKey(schema) {
    // Let the server generate the TID
    if (schema.key === 'tid')
        return undefined;
    if (schema.key === 'any')
        return undefined;
    return getLiteralRecordKey(schema);
}
function getLiteralRecordKey(schema) {
    if (schema.key.startsWith('literal:')) {
        return schema.key.slice(8);
    }
    throw new TypeError(`An "rkey" must be provided for record key type "${schema.key}" (${schema.$type})`);
}
//# sourceMappingURL=client.js.map
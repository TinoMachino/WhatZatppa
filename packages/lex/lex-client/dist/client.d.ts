import { LexMap, LexValue, TypedLexMap } from '@atproto/lex-data';
import { AtIdentifierString, CidString, DidString, Infer, InferMethodInputBody, InferMethodOutputBody, InferRecordKey, LexiconRecordKey, Main, NsidString, Params, Procedure, Query, RecordSchema, Restricted } from '@atproto/lex-schema';
import { Agent, AgentOptions } from './agent.js';
import { XrpcFailure } from './errors.js';
import { com } from './lexicons/index.js';
import { XrpcResponse, XrpcResponseBody, XrpcResponseOptions } from './response.js';
import { BinaryBodyInit, Service } from './types.js';
import { XrpcRequestHeadersOptions } from './util.js';
import { XrpcOptions, XrpcRequestParams, XrpcRequestProcessingOptions } from './xrpc.js';
export type { AtIdentifierString, CidString, DidString, Infer, InferMethodInputBody, InferMethodOutputBody, InferRecordKey, LexMap, LexValue, LexiconRecordKey, Main, NsidString, Params, Procedure, Query, RecordSchema, Restricted, TypedLexMap, };
/**
 * Configuration options for creating a {@link Client}.
 *
 * @property {@link ClientOptions.labelers} - An iterable of labeler DIDs to include in requests. These will be combined with any global app labelers configured via {@link Client.configure}.
 * @property {@link ClientOptions.service} - An optional service identifier (DID or URL) for routing requests with service proxying.
 * @property {@link ClientOptions.headers} - Custom headers to include in all requests made by this client instance.
 * @property {@link ClientOptions.validateRequest} - If true, validates request bodies against their lexicon schemas before sending. Defaults to false for performance.
 * @property {@link ClientOptions.validateResponse} - If false, skips validation of response bodies against their lexicon schemas. Defaults to true to catch errors, but can be disabled for performance if you trust the server responses. Note that defaults will not be applied if validation is disabled, which can cause typing inconsistencies, so use with caution.
 * @property {@link ClientOptions.strictResponseProcessing} - If false, relaxes certain validation rules during response processing (e.g., allowing floats, deeper nesting, etc.). Defaults to true for strict compliance with {@link https://atproto.com/specs/data-model lexicon data model}, but can be disabled to handle non-compliant responses.
 *
 * @see {@link XrpcRequestHeadersOptions}
 * @see {@link XrpcRequestProcessingOptions}
 * @see {@link XrpcResponseOptions}
 *
 * @example
 * ```typescript
 * const options: ClientOptions = {
 *   labelers: ['did:plc:labeler1'],
 *   service: 'did:web:api.bsky.app#bsky_appview',
 *   headers: { 'X-Custom-Header': 'value' },
 *   validateRequest: false,
 *   validateResponse: true,
 *   strictResponseProcessing: false,
 * }
 * ```
 */
export type ClientOptions = XrpcRequestHeadersOptions & Pick<XrpcRequestProcessingOptions, 'validateRequest'> & XrpcResponseOptions;
export type ActionOptions = {
    /** AbortSignal to cancel the request. */
    signal?: AbortSignal;
};
/**
 * A composable action that can be invoked via {@link Client.call}.
 *
 * Actions provide a way to define custom operations that integrate with the
 * Client's call interface, enabling type-safe, reusable business logic.
 *
 * @typeParam I - The input type for the action
 * @typeParam O - The output type for the action
 *
 * @example
 * ```typescript
 * const myAction: Action<{ userId: string }, { profile: Profile }> = async (client, input, options) => {
 *   const response = await client.xrpc(someMethod, { params: { actor: input.userId }, ...options })
 *   return { profile: response.body }
 * }
 * ```
 */
export type Action<I = any, O = any> = (client: Client, input: I, options: ActionOptions) => O | Promise<O>;
/**
 * Extracts the input type from an {@link Action}.
 * @typeParam A - The Action type to extract from
 */
export type InferActionInput<A extends Action> = A extends Action<infer I, any> ? I : never;
/**
 * Extracts the output type from an {@link Action}.
 * @typeParam A - The Action type to extract from
 */
export type InferActionOutput<A extends Action> = A extends Action<any, infer O> ? O : never;
/**
 * Options for creating a record in an AT Protocol repository.
 *
 * @see {@link Client.createRecord}
 */
export type CreateRecordOptions = Omit<XrpcOptions<typeof com.atproto.repo.createRecord.main>, 'body'> & {
    /** Repository identifier (DID or handle). Defaults to authenticated user's DID. */
    repo?: AtIdentifierString;
    /** Compare-and-swap on the repo commit. If specified, must match current commit. */
    swapCommit?: string;
    /** Whether to validate the record against its lexicon schema. */
    validate?: boolean;
};
/**
 * Options for deleting a record from an AT Protocol repository.
 *
 * @see {@link Client.deleteRecord}
 */
export type DeleteRecordOptions = Omit<XrpcOptions<typeof com.atproto.repo.deleteRecord.main>, 'body'> & {
    /** Repository identifier (DID or handle). Defaults to authenticated user's DID. */
    repo?: AtIdentifierString;
    /** Compare-and-swap on the repo commit. If specified, must match current commit. */
    swapCommit?: string;
    /** Compare-and-swap on the record CID. If specified, must match current record. */
    swapRecord?: string;
};
/**
 * Options for retrieving a record from an AT Protocol repository.
 *
 * @see {@link Client.getRecord}
 */
export type GetRecordOptions = Omit<XrpcOptions<typeof com.atproto.repo.getRecord.main>, 'params'> & {
    /** Repository identifier (DID or handle). Defaults to authenticated user's DID. */
    repo?: AtIdentifierString;
};
/**
 * Options for creating or updating a record in an AT Protocol repository.
 *
 * @see {@link Client.putRecord}
 */
export type PutRecordOptions = Omit<XrpcOptions<typeof com.atproto.repo.putRecord.main>, 'body'> & {
    /** Repository identifier (DID or handle). Defaults to authenticated user's DID. */
    repo?: AtIdentifierString;
    /** Compare-and-swap on the repo commit. If specified, must match current commit. */
    swapCommit?: string;
    /** Compare-and-swap on the record CID. If specified, must match current record. */
    swapRecord?: string;
    /** Whether to validate the record against its lexicon schema. */
    validate?: boolean;
};
/**
 * Options for listing records in an AT Protocol repository collection.
 *
 * @see {@link Client.listRecords}
 */
export type ListRecordsOptions = Omit<XrpcOptions<typeof com.atproto.repo.listRecords.main>, 'params'> & {
    /** Repository identifier (DID or handle). Defaults to authenticated user's DID. */
    repo?: AtIdentifierString;
    /** Maximum number of records to return. */
    limit?: number;
    /** Pagination cursor from a previous response. */
    cursor?: string;
    /** If true, returns records in reverse chronological order. */
    reverse?: boolean;
};
export type UploadBlobOptions = Omit<XrpcOptions<typeof com.atproto.repo.uploadBlob.main>, 'body'>;
export type GetBlobOptions = Omit<XrpcOptions<typeof com.atproto.sync.getBlob.main>, 'params'>;
export type RecordKeyOptions<T extends RecordSchema, AlsoOptionalWhenRecordKeyIs extends LexiconRecordKey = never> = T['key'] extends `literal:${string}` | AlsoOptionalWhenRecordKeyIs ? {
    rkey?: InferRecordKey<T>;
} : {
    rkey: InferRecordKey<T>;
};
/**
 * Type-safe options for {@link Client.create}, combining record options with key requirements.
 * @typeParam T - The record schema type
 * @see {@link CreateRecordOptions}
 */
export type CreateOptions<T extends RecordSchema> = CreateRecordOptions & RecordKeyOptions<T, 'tid' | 'any'>;
/**
 * Output type for record creation operations.
 * Contains the URI and CID of the newly created record.
 */
export type CreateOutput = InferMethodOutputBody<typeof com.atproto.repo.createRecord.main, Uint8Array>;
/**
 * Type-safe options for {@link Client.delete}, combining delete options with key requirements.
 * @typeParam T - The record schema type
 */
export type DeleteOptions<T extends RecordSchema> = DeleteRecordOptions & RecordKeyOptions<T>;
/**
 * Output type for record deletion operations.
 */
export type DeleteOutput = InferMethodOutputBody<typeof com.atproto.repo.deleteRecord.main, Uint8Array>;
/**
 * Type-safe options for {@link Client.get}, combining get options with key requirements.
 * @typeParam T - The record schema type
 */
export type GetOptions<T extends RecordSchema> = GetRecordOptions & RecordKeyOptions<T>;
/**
 * Output type for record retrieval operations.
 * Contains the record value validated against the schema type.
 * @typeParam T - The record schema type
 */
export type GetOutput<T extends RecordSchema> = Omit<InferMethodOutputBody<typeof com.atproto.repo.getRecord.main, Uint8Array>, 'value'> & {
    value: Infer<T>;
};
/**
 * Type-safe options for {@link Client.put}, combining put options with key requirements.
 * @typeParam T - The record schema type
 */
export type PutOptions<T extends RecordSchema> = PutRecordOptions & RecordKeyOptions<T>;
/**
 * Output type for record put (create/update) operations.
 * Contains the URI and CID of the record.
 */
export type PutOutput = InferMethodOutputBody<typeof com.atproto.repo.putRecord.main, Uint8Array>;
/**
 * Options for {@link Client.list} operations.
 */
export type ListOptions = ListRecordsOptions;
/**
 * Output type for record listing operations.
 * Contains validated records and any invalid records that failed schema validation.
 * @typeParam T - The record schema type
 */
export type ListOutput<T extends RecordSchema> = InferMethodOutputBody<typeof com.atproto.repo.listRecords.main, Uint8Array> & {
    /** Records that successfully validated against the schema. */
    records: ListRecord<Infer<T>>[];
    /** Records that failed schema validation. */
    invalid: LexMap[];
};
/**
 * A record from a list operation with its value typed to the schema.
 * @typeParam Value - The validated record value type
 */
export type ListRecord<Value extends LexMap> = com.atproto.repo.listRecords.Record & {
    value: Value;
};
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
export declare class Client implements Agent {
    static appLabelers: readonly DidString[];
    /**
     * Configures the Client (or its sub classes) globally.
     */
    static configure(opts: {
        appLabelers?: Iterable<DidString>;
    }): void;
    /** The underlying agent used for making requests. */
    readonly agent: Agent;
    /** Custom headers included in all requests. */
    readonly headers: Headers;
    /** Optional service identifier for routing requests. */
    readonly service?: Service;
    /** Set of labeler DIDs specific to this client instance. */
    readonly labelers: Set<DidString>;
    readonly xrpcDefaults: {
        readonly validateRequest: boolean;
        readonly validateResponse: boolean;
        readonly strictResponseProcessing: boolean;
    };
    constructor(agent: Agent | AgentOptions, options?: ClientOptions);
    /**
     * The DID of the authenticated user, or `undefined` if not authenticated.
     */
    get did(): DidString | undefined;
    /**
     * The DID of the authenticated user.
     * @throws {Error} if not authenticated
     */
    get assertDid(): DidString;
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
    assertAuthenticated(): asserts this is {
        did: DidString;
    };
    /**
     * Replaces all labelers with the given set.
     * @param labelers - Iterable of labeler DIDs
     */
    setLabelers(labelers?: Iterable<DidString>): void;
    /**
     * Adds labelers to the current set.
     * @param labelers - Iterable of labeler DIDs to add
     */
    addLabelers(labelers: Iterable<DidString>): void;
    /**
     * Removes all labelers from this client instance.
     */
    clearLabelers(): void;
    /**
     * {@link Agent}'s {@link Agent.fetchHandler} implementation, which adds
     * labelers and service proxying headers. This method allow a {@link Client}
     * instance to be used directly as an {@link Agent} for another
     * {@link Client}, enabling composition of headers (labelers, proxying, etc.).
     *
     * @param path - The request path
     * @param init - Request initialization options
     */
    fetchHandler(path: `/${string}`, init: RequestInit): Promise<Response>;
    /**
     * Makes an XRPC request. Throws on failure.
     *
     * @param ns - The lexicon method definition (e.g., `app.bsky.feed.getTimeline`)
     * @param options - Request options including params and body
     * @returns The successful XRPC response
     * @throws {XrpcFailure} when the request fails or returns an error
     *
     * @example Query with parameters
     * ```typescript
     * const response = await client.xrpc(app.bsky.feed.getTimeline, {
     *   params: { limit: 50, cursor: 'abc123' }
     * })
     * console.log(response.body.feed)
     * ```
     *
     * @example Procedure with body
     * ```typescript
     * const response = await client.xrpc(com.atproto.repo.createRecord, {
     *   body: {
     *     repo: client.assertDid,
     *     collection: 'app.bsky.feed.post',
     *     record: { text: 'Hello!', createdAt: new Date().toISOString() }
     *   }
     * })
     * ```
     *
     * @see {@link xrpcSafe} for a non-throwing variant
     */
    xrpc<const M extends Query | Procedure>(ns: NonNullable<unknown> extends XrpcOptions<M> ? Main<M> : Restricted<'This XRPC method requires an "options" argument'>): Promise<XrpcResponse<M>>;
    xrpc<const M extends Query | Procedure>(ns: Main<M>, options: XrpcOptions<M>): Promise<XrpcResponse<M>>;
    /**
     * Makes an XRPC request without throwing on failure.
     * Returns either a successful response or a failure object.
     *
     * @param ns - The lexicon method definition
     * @param options - Request options
     * @returns Either an XrpcResponse on success or XrpcFailure on failure
     *
     * @example
     * ```typescript
     * const result = await client.xrpcSafe(app.bsky.actor.getProfile.main, {
     *   params: { actor: 'alice.bsky.social' }
     * })
     *
     * if (result.success) {
     *   console.log(result.body.displayName)
     * } else {
     *   console.error('Failed:', result.error)
     * }
     * ```
     *
     * @see {@link xrpc} for a throwing variant
     */
    xrpcSafe<const M extends Query | Procedure>(ns: NonNullable<unknown> extends XrpcOptions<M> ? Main<M> : Restricted<'This XRPC method requires an "options" argument'>): Promise<XrpcResponse<M> | XrpcFailure<M>>;
    xrpcSafe<const M extends Query | Procedure>(ns: Main<M>, options: XrpcOptions<M>): Promise<XrpcResponse<M> | XrpcFailure<M>>;
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
    createRecord(record: TypedLexMap<NsidString>, rkey?: string, options?: CreateRecordOptions): Promise<XrpcResponse<Procedure<"com.atproto.repo.createRecord", import("@atproto/lex-schema").ParamsSchema<{}>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        repo: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-identifier";
        }>;
        collection: import("@atproto/lex-schema").StringSchema<{
            readonly format: "nsid";
        }>;
        rkey: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "record-key";
            readonly maxLength: 512;
        }>>;
        validate: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").BooleanSchema>;
        record: import("@atproto/lex-schema").LexMapSchema;
        swapCommit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
    }>>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        uri: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-uri";
        }>;
        cid: import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>;
        commit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").RefSchema<import("@atproto/lex-schema").Validator<com.atproto.repo.defs.$defs.CommitMeta, com.atproto.repo.defs.$defs.CommitMeta>>>;
        validationStatus: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            knownValues: ["valid", "unknown"];
        }>>;
    }>>, readonly ["InvalidSwap"]>>>;
    /**
     * Deletes a record from an AT Protocol repository.
     *
     * @param collection - The collection NSID
     * @param rkey - The record key
     * @param options - Delete options including repo, swapCommit, swapRecord
     *
     * @see {@link delete} for a higher-level typed alternative
     */
    deleteRecord(collection: NsidString, rkey: string, options?: DeleteRecordOptions): Promise<XrpcResponse<Procedure<"com.atproto.repo.deleteRecord", import("@atproto/lex-schema").ParamsSchema<{}>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        repo: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-identifier";
        }>;
        collection: import("@atproto/lex-schema").StringSchema<{
            readonly format: "nsid";
        }>;
        rkey: import("@atproto/lex-schema").StringSchema<{
            readonly format: "record-key";
        }>;
        swapRecord: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
        swapCommit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
    }>>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        commit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").RefSchema<import("@atproto/lex-schema").Validator<com.atproto.repo.defs.$defs.CommitMeta, com.atproto.repo.defs.$defs.CommitMeta>>>;
    }>>, readonly ["InvalidSwap"]>>>;
    /**
     * Retrieves a record from an AT Protocol repository.
     *
     * @param collection - The collection NSID
     * @param rkey - The record key
     * @param options - Get options including repo
     *
     * @see {@link get} for a higher-level typed alternative
     */
    getRecord(collection: NsidString, rkey: string, options?: GetRecordOptions): Promise<XrpcResponse<Query<"com.atproto.repo.getRecord", import("@atproto/lex-schema").ParamsSchema<{
        readonly repo: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-identifier";
        }>;
        readonly collection: import("@atproto/lex-schema").StringSchema<{
            readonly format: "nsid";
        }>;
        readonly rkey: import("@atproto/lex-schema").StringSchema<{
            readonly format: "record-key";
        }>;
        readonly cid: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
    }>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        uri: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-uri";
        }>;
        cid: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
        value: import("@atproto/lex-schema").LexMapSchema;
    }>>, readonly ["RecordNotFound"]>>>;
    /**
     * Creates or updates a record in a repository.
     *
     * @param record - The record to put, must include an {@link NsidString} `$type`
     * @param rkey - The record key
     * @param options - Put options including repo, swapCommit, swapRecord, validate
     *
     * @see {@link put} for a higher-level typed alternative
     */
    putRecord(record: TypedLexMap<NsidString>, rkey: string, options?: PutRecordOptions): Promise<XrpcResponse<Procedure<"com.atproto.repo.putRecord", import("@atproto/lex-schema").ParamsSchema<{}>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        repo: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-identifier";
        }>;
        collection: import("@atproto/lex-schema").StringSchema<{
            readonly format: "nsid";
        }>;
        rkey: import("@atproto/lex-schema").StringSchema<{
            readonly format: "record-key";
            readonly maxLength: 512;
        }>;
        validate: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").BooleanSchema>;
        record: import("@atproto/lex-schema").LexMapSchema;
        swapRecord: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").NullableSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>>;
        swapCommit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>>;
    }>>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        uri: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-uri";
        }>;
        cid: import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>;
        commit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").RefSchema<import("@atproto/lex-schema").Validator<com.atproto.repo.defs.$defs.CommitMeta, com.atproto.repo.defs.$defs.CommitMeta>>>;
        validationStatus: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{
            knownValues: ["valid", "unknown"];
        }>>;
    }>>, readonly ["InvalidSwap"]>>>;
    /**
     * Lists records in a collection.
     *
     * @param nsid - The collection NSID
     * @param options - List options including repo, limit, cursor, reverse
     *
     * @see {@link list} for a higher-level typed alternative
     */
    listRecords(nsid: NsidString, options?: ListRecordsOptions): Promise<XrpcResponse<Query<"com.atproto.repo.listRecords", import("@atproto/lex-schema").ParamsSchema<{
        readonly repo: import("@atproto/lex-schema").StringSchema<{
            readonly format: "at-identifier";
        }>;
        readonly collection: import("@atproto/lex-schema").StringSchema<{
            readonly format: "nsid";
        }>;
        readonly limit: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").WithDefaultSchema<import("@atproto/lex-schema").IntegerSchema>>;
        readonly cursor: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{}>>;
        readonly reverse: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").BooleanSchema>;
    }>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        cursor: import("@atproto/lex-schema").OptionalSchema<import("@atproto/lex-schema").StringSchema<{}>>;
        records: import("@atproto/lex-schema").ArraySchema<import("@atproto/lex-schema").RefSchema<import("@atproto/lex-schema").Validator<com.atproto.repo.listRecords.$defs.Record, com.atproto.repo.listRecords.$defs.Record>>>;
    }>>, undefined>>>;
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
    uploadBlob(body: BinaryBodyInit, options?: UploadBlobOptions): Promise<XrpcResponse<Procedure<"com.atproto.repo.uploadBlob", import("@atproto/lex-schema").ParamsSchema<{}>, import("@atproto/lex-schema").Payload<"*/*", undefined>, import("@atproto/lex-schema").Payload<"application/json", import("@atproto/lex-schema").ObjectSchema<{
        blob: import("@atproto/lex-schema").BlobSchema<{}>;
    }>>, undefined>>>;
    /**
     * Retrieves a blob by DID and CID.
     *
     * @param did - The DID of the repository containing the blob
     * @param cid - The CID of the blob
     * @param options - Call options
     */
    getBlob(did: DidString, cid: CidString, options?: GetBlobOptions): Promise<XrpcResponse<Query<"com.atproto.sync.getBlob", import("@atproto/lex-schema").ParamsSchema<{
        readonly did: import("@atproto/lex-schema").StringSchema<{
            readonly format: "did";
        }>;
        readonly cid: import("@atproto/lex-schema").StringSchema<{
            readonly format: "cid";
        }>;
    }>, import("@atproto/lex-schema").Payload<"*/*", undefined>, readonly ["BlobNotFound", "RepoNotFound", "RepoTakendown", "RepoSuspended", "RepoDeactivated"]>>>;
    /**
     * Universal call method for queries, procedures, and custom actions.
     * Automatically determines the call type based on the lexicon definition.
     *
     * @param ns - The lexicon method or action definition
     * @param arg - The input argument (params for queries, body for procedures, input for actions)
     * @param options - Call options
     * @returns The method response body or action output
     * @see {@link xrpc} if you need access to the full response object
     *
     * @example Query
     * ```typescript
     * const profile = await client.call(app.bsky.actor.getProfile.main, {
     *   actor: 'alice.bsky.social'
     * })
     * ```
     *
     * @example Procedure
     * ```typescript
     * const result = await client.call(com.atproto.repo.createRecord.main, {
     *   repo: did,
     *   collection: 'app.bsky.feed.post',
     *   record: { text: 'Hello!' }
     * })
     * ```
     */
    call<const T extends Query>(ns: NonNullable<unknown> extends XrpcRequestParams<T> ? Main<T> : Restricted<'This query type requires a "params" argument'>): Promise<XrpcResponseBody<T>>;
    call<const T extends Procedure>(ns: undefined extends InferMethodInputBody<T, Uint8Array> ? Main<T> : Restricted<'This procedure type requires an "input" argument'>): Promise<XrpcResponseBody<T>>;
    call<const T extends Action>(ns: void extends InferActionInput<T> ? Main<T> : Restricted<'This action type requires an "input" argument'>): Promise<InferActionOutput<T>>;
    call<const T extends Action | Procedure | Query>(ns: Main<T>, arg: T extends Action ? InferActionInput<T> : T extends Procedure ? InferMethodInputBody<T, Uint8Array> : T extends Query ? XrpcRequestParams<T> : never, options?: T extends Action ? ActionOptions : T extends Procedure ? Omit<XrpcOptions<T>, 'body'> : T extends Query ? Omit<XrpcOptions<T>, 'params'> : never): Promise<T extends Action ? InferActionOutput<T> : T extends Procedure ? XrpcResponseBody<T> : T extends Query ? XrpcResponseBody<T> : never>;
    /**
     * Creates a new record with full type safety based on the schema.
     *
     * @param ns - The record schema definition
     * @param input - The record data (without `$type`, which is added automatically)
     * @param options - Create options including rkey (required for some record types)
     * @returns The create output including URI and CID
     *
     * @example Creating a post
     * ```typescript
     * const result = await client.create(app.bsky.feed.post.main, {
     *   text: 'Hello, world!',
     *   createdAt: new Date().toISOString()
     * })
     * console.log(result.uri)
     * ```
     *
     * @example Creating a record with explicit rkey
     * ```typescript
     * const result = await client.create(app.bsky.actor.profile.main, {
     *   displayName: 'Alice'
     * }, { rkey: 'self' })
     * ```
     */
    create<const T extends RecordSchema>(ns: NonNullable<unknown> extends CreateOptions<T> ? Main<T> : Restricted<'This record type requires an "options" argument'>, input: Omit<Infer<T>, '$type'>): Promise<CreateOutput>;
    create<const T extends RecordSchema>(ns: Main<T>, input: Omit<Infer<T>, '$type'>, options: CreateOptions<T>): Promise<CreateOutput>;
    /**
     * Deletes a record with type-safe options.
     *
     * @param ns - The record schema definition
     * @param options - Delete options (rkey required for non-literal keys)
     * @returns The delete output
     */
    delete<const T extends RecordSchema>(ns: NonNullable<unknown> extends DeleteOptions<T> ? Main<T> : Restricted<'This record type requires an "options" argument'>): Promise<DeleteOutput>;
    delete<const T extends RecordSchema>(ns: Main<T>, options?: DeleteOptions<T>): Promise<DeleteOutput>;
    /**
     * Retrieves a record with type-safe validation.
     *
     * @param ns - The record schema definition
     * @param options - Get options (rkey required for non-literal keys)
     * @returns The record data validated against the schema
     *
     * @example
     * ```typescript
     * const profile = await client.get(app.bsky.actor.profile.main)
     * // profile.value is typed as app.bsky.actor.profile.Record
     * console.log(profile.value.displayName)
     * ```
     */
    get<const T extends RecordSchema>(ns: T['key'] extends `literal:${string}` ? Main<T> : Restricted<'This record type requires an "options" argument'>): Promise<GetOutput<T>>;
    get<const T extends RecordSchema>(ns: Main<T>, options?: GetOptions<T>): Promise<GetOutput<T>>;
    /**
     * Creates or updates a record with full type safety.
     *
     * @param ns - The record schema definition
     * @param input - The record data
     * @param options - Put options (rkey required for non-literal keys)
     * @returns The put output including URI and CID
     */
    put<const T extends RecordSchema>(ns: NonNullable<unknown> extends PutOptions<T> ? Main<T> : Restricted<'This record type requires an "options" argument'>, input: Omit<Infer<T>, '$type'>): Promise<PutOutput>;
    put<const T extends RecordSchema>(ns: Main<T>, input: Omit<Infer<T>, '$type'>, options: PutOptions<T>): Promise<PutOutput>;
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
    list<const T extends RecordSchema>(ns: Main<T>, options?: ListOptions): Promise<ListOutput<T>>;
}
//# sourceMappingURL=client.d.ts.map
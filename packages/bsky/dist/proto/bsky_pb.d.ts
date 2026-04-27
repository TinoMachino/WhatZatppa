import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
/**
 * @generated from enum bsky.NotificationInclude
 */
export declare enum NotificationInclude {
    /**
     * @generated from enum value: NOTIFICATION_INCLUDE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: NOTIFICATION_INCLUDE_ALL = 1;
     */
    ALL = 1,
    /**
     * @generated from enum value: NOTIFICATION_INCLUDE_FOLLOWS = 2;
     */
    FOLLOWS = 2
}
/**
 * @generated from enum bsky.ChatNotificationInclude
 */
export declare enum ChatNotificationInclude {
    /**
     * @generated from enum value: CHAT_NOTIFICATION_INCLUDE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CHAT_NOTIFICATION_INCLUDE_ALL = 1;
     */
    ALL = 1,
    /**
     * @generated from enum value: CHAT_NOTIFICATION_INCLUDE_ACCEPTED = 2;
     */
    ACCEPTED = 2
}
/**
 * @generated from enum bsky.FeedType
 */
export declare enum FeedType {
    /**
     * @generated from enum value: FEED_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FEED_TYPE_POSTS_AND_AUTHOR_THREADS = 1;
     */
    POSTS_AND_AUTHOR_THREADS = 1,
    /**
     * @generated from enum value: FEED_TYPE_POSTS_NO_REPLIES = 2;
     */
    POSTS_NO_REPLIES = 2,
    /**
     * @generated from enum value: FEED_TYPE_POSTS_WITH_MEDIA = 3;
     */
    POSTS_WITH_MEDIA = 3,
    /**
     * @generated from enum value: FEED_TYPE_POSTS_WITH_VIDEO = 4;
     */
    POSTS_WITH_VIDEO = 4
}
/**
 * @generated from enum bsky.SitemapPageType
 */
export declare enum SitemapPageType {
    /**
     * @generated from enum value: SITEMAP_PAGE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SITEMAP_PAGE_TYPE_USER = 1;
     */
    USER = 1
}
/**
 * @generated from message bsky.Record
 */
export declare class Record extends Message<Record> {
    /**
     * @generated from field: bytes record = 1;
     */
    record: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 4;
     */
    indexedAt?: Timestamp;
    /**
     * @generated from field: bool taken_down = 5;
     */
    takenDown: boolean;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 6;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp sorted_at = 7;
     */
    sortedAt?: Timestamp;
    /**
     * @generated from field: string takedown_ref = 8;
     */
    takedownRef: string;
    /**
     * @generated from field: repeated string tags = 9;
     */
    tags: string[];
    constructor(data?: PartialMessage<Record>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.Record";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Record;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Record;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Record;
    static equals(a: Record | PlainMessage<Record> | undefined, b: Record | PlainMessage<Record> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlockRecordsRequest
 */
export declare class GetBlockRecordsRequest extends Message<GetBlockRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetBlockRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlockRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlockRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlockRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlockRecordsRequest;
    static equals(a: GetBlockRecordsRequest | PlainMessage<GetBlockRecordsRequest> | undefined, b: GetBlockRecordsRequest | PlainMessage<GetBlockRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlockRecordsResponse
 */
export declare class GetBlockRecordsResponse extends Message<GetBlockRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetBlockRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlockRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlockRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlockRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlockRecordsResponse;
    static equals(a: GetBlockRecordsResponse | PlainMessage<GetBlockRecordsResponse> | undefined, b: GetBlockRecordsResponse | PlainMessage<GetBlockRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFeedGeneratorRecordsRequest
 */
export declare class GetFeedGeneratorRecordsRequest extends Message<GetFeedGeneratorRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetFeedGeneratorRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFeedGeneratorRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFeedGeneratorRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFeedGeneratorRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFeedGeneratorRecordsRequest;
    static equals(a: GetFeedGeneratorRecordsRequest | PlainMessage<GetFeedGeneratorRecordsRequest> | undefined, b: GetFeedGeneratorRecordsRequest | PlainMessage<GetFeedGeneratorRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFeedGeneratorRecordsResponse
 */
export declare class GetFeedGeneratorRecordsResponse extends Message<GetFeedGeneratorRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetFeedGeneratorRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFeedGeneratorRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFeedGeneratorRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFeedGeneratorRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFeedGeneratorRecordsResponse;
    static equals(a: GetFeedGeneratorRecordsResponse | PlainMessage<GetFeedGeneratorRecordsResponse> | undefined, b: GetFeedGeneratorRecordsResponse | PlainMessage<GetFeedGeneratorRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowRecordsRequest
 */
export declare class GetFollowRecordsRequest extends Message<GetFollowRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetFollowRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowRecordsRequest;
    static equals(a: GetFollowRecordsRequest | PlainMessage<GetFollowRecordsRequest> | undefined, b: GetFollowRecordsRequest | PlainMessage<GetFollowRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowRecordsResponse
 */
export declare class GetFollowRecordsResponse extends Message<GetFollowRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetFollowRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowRecordsResponse;
    static equals(a: GetFollowRecordsResponse | PlainMessage<GetFollowRecordsResponse> | undefined, b: GetFollowRecordsResponse | PlainMessage<GetFollowRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikeRecordsRequest
 */
export declare class GetLikeRecordsRequest extends Message<GetLikeRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetLikeRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikeRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikeRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikeRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikeRecordsRequest;
    static equals(a: GetLikeRecordsRequest | PlainMessage<GetLikeRecordsRequest> | undefined, b: GetLikeRecordsRequest | PlainMessage<GetLikeRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikeRecordsResponse
 */
export declare class GetLikeRecordsResponse extends Message<GetLikeRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetLikeRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikeRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikeRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikeRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikeRecordsResponse;
    static equals(a: GetLikeRecordsResponse | PlainMessage<GetLikeRecordsResponse> | undefined, b: GetLikeRecordsResponse | PlainMessage<GetLikeRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListBlockRecordsRequest
 */
export declare class GetListBlockRecordsRequest extends Message<GetListBlockRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetListBlockRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListBlockRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListBlockRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListBlockRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListBlockRecordsRequest;
    static equals(a: GetListBlockRecordsRequest | PlainMessage<GetListBlockRecordsRequest> | undefined, b: GetListBlockRecordsRequest | PlainMessage<GetListBlockRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListBlockRecordsResponse
 */
export declare class GetListBlockRecordsResponse extends Message<GetListBlockRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetListBlockRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListBlockRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListBlockRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListBlockRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListBlockRecordsResponse;
    static equals(a: GetListBlockRecordsResponse | PlainMessage<GetListBlockRecordsResponse> | undefined, b: GetListBlockRecordsResponse | PlainMessage<GetListBlockRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListItemRecordsRequest
 */
export declare class GetListItemRecordsRequest extends Message<GetListItemRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetListItemRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListItemRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListItemRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListItemRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListItemRecordsRequest;
    static equals(a: GetListItemRecordsRequest | PlainMessage<GetListItemRecordsRequest> | undefined, b: GetListItemRecordsRequest | PlainMessage<GetListItemRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListItemRecordsResponse
 */
export declare class GetListItemRecordsResponse extends Message<GetListItemRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetListItemRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListItemRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListItemRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListItemRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListItemRecordsResponse;
    static equals(a: GetListItemRecordsResponse | PlainMessage<GetListItemRecordsResponse> | undefined, b: GetListItemRecordsResponse | PlainMessage<GetListItemRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListRecordsRequest
 */
export declare class GetListRecordsRequest extends Message<GetListRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetListRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListRecordsRequest;
    static equals(a: GetListRecordsRequest | PlainMessage<GetListRecordsRequest> | undefined, b: GetListRecordsRequest | PlainMessage<GetListRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListRecordsResponse
 */
export declare class GetListRecordsResponse extends Message<GetListRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetListRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListRecordsResponse;
    static equals(a: GetListRecordsResponse | PlainMessage<GetListRecordsResponse> | undefined, b: GetListRecordsResponse | PlainMessage<GetListRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.PostRecordMeta
 */
export declare class PostRecordMeta extends Message<PostRecordMeta> {
    /**
     * @generated from field: bool violates_thread_gate = 1;
     */
    violatesThreadGate: boolean;
    /**
     * @generated from field: bool has_media = 2;
     */
    hasMedia: boolean;
    /**
     * @generated from field: bool is_reply = 3;
     */
    isReply: boolean;
    /**
     * @generated from field: bool violates_embedding_rules = 4;
     */
    violatesEmbeddingRules: boolean;
    /**
     * @generated from field: bool has_post_gate = 5;
     */
    hasPostGate: boolean;
    /**
     * @generated from field: bool has_thread_gate = 6;
     */
    hasThreadGate: boolean;
    /**
     * @generated from field: bool has_video = 7;
     */
    hasVideo: boolean;
    constructor(data?: PartialMessage<PostRecordMeta>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PostRecordMeta";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PostRecordMeta;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PostRecordMeta;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PostRecordMeta;
    static equals(a: PostRecordMeta | PlainMessage<PostRecordMeta> | undefined, b: PostRecordMeta | PlainMessage<PostRecordMeta> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostRecordsRequest
 */
export declare class GetPostRecordsRequest extends Message<GetPostRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: optional string process_dynamic_tags_for_view = 2;
     */
    processDynamicTagsForView?: string;
    /**
     * @generated from field: optional string viewer_did = 3;
     */
    viewerDid?: string;
    constructor(data?: PartialMessage<GetPostRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostRecordsRequest;
    static equals(a: GetPostRecordsRequest | PlainMessage<GetPostRecordsRequest> | undefined, b: GetPostRecordsRequest | PlainMessage<GetPostRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostRecordsResponse
 */
export declare class GetPostRecordsResponse extends Message<GetPostRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    /**
     * @generated from field: repeated bsky.PostRecordMeta meta = 2;
     */
    meta: PostRecordMeta[];
    constructor(data?: PartialMessage<GetPostRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostRecordsResponse;
    static equals(a: GetPostRecordsResponse | PlainMessage<GetPostRecordsResponse> | undefined, b: GetPostRecordsResponse | PlainMessage<GetPostRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetProfileRecordsRequest
 */
export declare class GetProfileRecordsRequest extends Message<GetProfileRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetProfileRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetProfileRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileRecordsRequest;
    static equals(a: GetProfileRecordsRequest | PlainMessage<GetProfileRecordsRequest> | undefined, b: GetProfileRecordsRequest | PlainMessage<GetProfileRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetProfileRecordsResponse
 */
export declare class GetProfileRecordsResponse extends Message<GetProfileRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetProfileRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetProfileRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileRecordsResponse;
    static equals(a: GetProfileRecordsResponse | PlainMessage<GetProfileRecordsResponse> | undefined, b: GetProfileRecordsResponse | PlainMessage<GetProfileRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorChatDeclarationRecordsRequest
 */
export declare class GetActorChatDeclarationRecordsRequest extends Message<GetActorChatDeclarationRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetActorChatDeclarationRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorChatDeclarationRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorChatDeclarationRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorChatDeclarationRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorChatDeclarationRecordsRequest;
    static equals(a: GetActorChatDeclarationRecordsRequest | PlainMessage<GetActorChatDeclarationRecordsRequest> | undefined, b: GetActorChatDeclarationRecordsRequest | PlainMessage<GetActorChatDeclarationRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorChatDeclarationRecordsResponse
 */
export declare class GetActorChatDeclarationRecordsResponse extends Message<GetActorChatDeclarationRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetActorChatDeclarationRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorChatDeclarationRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorChatDeclarationRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorChatDeclarationRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorChatDeclarationRecordsResponse;
    static equals(a: GetActorChatDeclarationRecordsResponse | PlainMessage<GetActorChatDeclarationRecordsResponse> | undefined, b: GetActorChatDeclarationRecordsResponse | PlainMessage<GetActorChatDeclarationRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationDeclarationRecordsRequest
 */
export declare class GetNotificationDeclarationRecordsRequest extends Message<GetNotificationDeclarationRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetNotificationDeclarationRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationDeclarationRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationDeclarationRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationDeclarationRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationDeclarationRecordsRequest;
    static equals(a: GetNotificationDeclarationRecordsRequest | PlainMessage<GetNotificationDeclarationRecordsRequest> | undefined, b: GetNotificationDeclarationRecordsRequest | PlainMessage<GetNotificationDeclarationRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationDeclarationRecordsResponse
 */
export declare class GetNotificationDeclarationRecordsResponse extends Message<GetNotificationDeclarationRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetNotificationDeclarationRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationDeclarationRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationDeclarationRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationDeclarationRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationDeclarationRecordsResponse;
    static equals(a: GetNotificationDeclarationRecordsResponse | PlainMessage<GetNotificationDeclarationRecordsResponse> | undefined, b: GetNotificationDeclarationRecordsResponse | PlainMessage<GetNotificationDeclarationRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetGermDeclarationRecordsRequest
 */
export declare class GetGermDeclarationRecordsRequest extends Message<GetGermDeclarationRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetGermDeclarationRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetGermDeclarationRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetGermDeclarationRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetGermDeclarationRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetGermDeclarationRecordsRequest;
    static equals(a: GetGermDeclarationRecordsRequest | PlainMessage<GetGermDeclarationRecordsRequest> | undefined, b: GetGermDeclarationRecordsRequest | PlainMessage<GetGermDeclarationRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetGermDeclarationRecordsResponse
 */
export declare class GetGermDeclarationRecordsResponse extends Message<GetGermDeclarationRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetGermDeclarationRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetGermDeclarationRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetGermDeclarationRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetGermDeclarationRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetGermDeclarationRecordsResponse;
    static equals(a: GetGermDeclarationRecordsResponse | PlainMessage<GetGermDeclarationRecordsResponse> | undefined, b: GetGermDeclarationRecordsResponse | PlainMessage<GetGermDeclarationRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStatusRecordsRequest
 */
export declare class GetStatusRecordsRequest extends Message<GetStatusRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetStatusRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStatusRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStatusRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStatusRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStatusRecordsRequest;
    static equals(a: GetStatusRecordsRequest | PlainMessage<GetStatusRecordsRequest> | undefined, b: GetStatusRecordsRequest | PlainMessage<GetStatusRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStatusRecordsResponse
 */
export declare class GetStatusRecordsResponse extends Message<GetStatusRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetStatusRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStatusRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStatusRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStatusRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStatusRecordsResponse;
    static equals(a: GetStatusRecordsResponse | PlainMessage<GetStatusRecordsResponse> | undefined, b: GetStatusRecordsResponse | PlainMessage<GetStatusRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRepostRecordsRequest
 */
export declare class GetRepostRecordsRequest extends Message<GetRepostRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetRepostRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostRecordsRequest;
    static equals(a: GetRepostRecordsRequest | PlainMessage<GetRepostRecordsRequest> | undefined, b: GetRepostRecordsRequest | PlainMessage<GetRepostRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRepostRecordsResponse
 */
export declare class GetRepostRecordsResponse extends Message<GetRepostRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetRepostRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostRecordsResponse;
    static equals(a: GetRepostRecordsResponse | PlainMessage<GetRepostRecordsResponse> | undefined, b: GetRepostRecordsResponse | PlainMessage<GetRepostRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetThreadGateRecordsRequest
 */
export declare class GetThreadGateRecordsRequest extends Message<GetThreadGateRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetThreadGateRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadGateRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadGateRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadGateRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadGateRecordsRequest;
    static equals(a: GetThreadGateRecordsRequest | PlainMessage<GetThreadGateRecordsRequest> | undefined, b: GetThreadGateRecordsRequest | PlainMessage<GetThreadGateRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetThreadGateRecordsResponse
 */
export declare class GetThreadGateRecordsResponse extends Message<GetThreadGateRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetThreadGateRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadGateRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadGateRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadGateRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadGateRecordsResponse;
    static equals(a: GetThreadGateRecordsResponse | PlainMessage<GetThreadGateRecordsResponse> | undefined, b: GetThreadGateRecordsResponse | PlainMessage<GetThreadGateRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostgateRecordsRequest
 */
export declare class GetPostgateRecordsRequest extends Message<GetPostgateRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetPostgateRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostgateRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostgateRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostgateRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostgateRecordsRequest;
    static equals(a: GetPostgateRecordsRequest | PlainMessage<GetPostgateRecordsRequest> | undefined, b: GetPostgateRecordsRequest | PlainMessage<GetPostgateRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostgateRecordsResponse
 */
export declare class GetPostgateRecordsResponse extends Message<GetPostgateRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetPostgateRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostgateRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostgateRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostgateRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostgateRecordsResponse;
    static equals(a: GetPostgateRecordsResponse | PlainMessage<GetPostgateRecordsResponse> | undefined, b: GetPostgateRecordsResponse | PlainMessage<GetPostgateRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLabelerRecordsRequest
 */
export declare class GetLabelerRecordsRequest extends Message<GetLabelerRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetLabelerRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLabelerRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLabelerRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLabelerRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLabelerRecordsRequest;
    static equals(a: GetLabelerRecordsRequest | PlainMessage<GetLabelerRecordsRequest> | undefined, b: GetLabelerRecordsRequest | PlainMessage<GetLabelerRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLabelerRecordsResponse
 */
export declare class GetLabelerRecordsResponse extends Message<GetLabelerRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetLabelerRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLabelerRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLabelerRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLabelerRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLabelerRecordsResponse;
    static equals(a: GetLabelerRecordsResponse | PlainMessage<GetLabelerRecordsResponse> | undefined, b: GetLabelerRecordsResponse | PlainMessage<GetLabelerRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetAllLabelersRequest
 */
export declare class GetAllLabelersRequest extends Message<GetAllLabelersRequest> {
    constructor(data?: PartialMessage<GetAllLabelersRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetAllLabelersRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllLabelersRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllLabelersRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllLabelersRequest;
    static equals(a: GetAllLabelersRequest | PlainMessage<GetAllLabelersRequest> | undefined, b: GetAllLabelersRequest | PlainMessage<GetAllLabelersRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetAllLabelersResponse
 */
export declare class GetAllLabelersResponse extends Message<GetAllLabelersResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: repeated bsky.Record records = 2;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetAllLabelersResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetAllLabelersResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAllLabelersResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAllLabelersResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAllLabelersResponse;
    static equals(a: GetAllLabelersResponse | PlainMessage<GetAllLabelersResponse> | undefined, b: GetAllLabelersResponse | PlainMessage<GetAllLabelersResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStarterPackRecordsRequest
 */
export declare class GetStarterPackRecordsRequest extends Message<GetStarterPackRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetStarterPackRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStarterPackRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStarterPackRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStarterPackRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStarterPackRecordsRequest;
    static equals(a: GetStarterPackRecordsRequest | PlainMessage<GetStarterPackRecordsRequest> | undefined, b: GetStarterPackRecordsRequest | PlainMessage<GetStarterPackRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStarterPackRecordsResponse
 */
export declare class GetStarterPackRecordsResponse extends Message<GetStarterPackRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetStarterPackRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStarterPackRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStarterPackRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStarterPackRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStarterPackRecordsResponse;
    static equals(a: GetStarterPackRecordsResponse | PlainMessage<GetStarterPackRecordsResponse> | undefined, b: GetStarterPackRecordsResponse | PlainMessage<GetStarterPackRecordsResponse> | undefined): boolean;
}
/**
 * - Return follow uris where user A follows users B, C, D, …
 *     - E.g. for viewer state on `getProfiles`
 *
 * @generated from message bsky.GetActorFollowsActorsRequest
 */
export declare class GetActorFollowsActorsRequest extends Message<GetActorFollowsActorsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string target_dids = 2;
     */
    targetDids: string[];
    constructor(data?: PartialMessage<GetActorFollowsActorsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorFollowsActorsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorFollowsActorsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorFollowsActorsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorFollowsActorsRequest;
    static equals(a: GetActorFollowsActorsRequest | PlainMessage<GetActorFollowsActorsRequest> | undefined, b: GetActorFollowsActorsRequest | PlainMessage<GetActorFollowsActorsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorFollowsActorsResponse
 */
export declare class GetActorFollowsActorsResponse extends Message<GetActorFollowsActorsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetActorFollowsActorsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorFollowsActorsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorFollowsActorsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorFollowsActorsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorFollowsActorsResponse;
    static equals(a: GetActorFollowsActorsResponse | PlainMessage<GetActorFollowsActorsResponse> | undefined, b: GetActorFollowsActorsResponse | PlainMessage<GetActorFollowsActorsResponse> | undefined): boolean;
}
/**
 * - Return follow uris of users who follows user A
 *     - For `getFollowers` list
 *
 * @generated from message bsky.GetFollowersRequest
 */
export declare class GetFollowersRequest extends Message<GetFollowersRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowersRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowersRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowersRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowersRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowersRequest;
    static equals(a: GetFollowersRequest | PlainMessage<GetFollowersRequest> | undefined, b: GetFollowersRequest | PlainMessage<GetFollowersRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.FollowInfo
 */
export declare class FollowInfo extends Message<FollowInfo> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string actor_did = 2;
     */
    actorDid: string;
    /**
     * @generated from field: string subject_did = 3;
     */
    subjectDid: string;
    constructor(data?: PartialMessage<FollowInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.FollowInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FollowInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FollowInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FollowInfo;
    static equals(a: FollowInfo | PlainMessage<FollowInfo> | undefined, b: FollowInfo | PlainMessage<FollowInfo> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowersResponse
 */
export declare class GetFollowersResponse extends Message<GetFollowersResponse> {
    /**
     * @generated from field: repeated bsky.FollowInfo followers = 1;
     */
    followers: FollowInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowersResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowersResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowersResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowersResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowersResponse;
    static equals(a: GetFollowersResponse | PlainMessage<GetFollowersResponse> | undefined, b: GetFollowersResponse | PlainMessage<GetFollowersResponse> | undefined): boolean;
}
/**
 * - Return follow uris of users A follows
 *     - For `getFollows` list
 *
 * @generated from message bsky.GetFollowsRequest
 */
export declare class GetFollowsRequest extends Message<GetFollowsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowsRequest;
    static equals(a: GetFollowsRequest | PlainMessage<GetFollowsRequest> | undefined, b: GetFollowsRequest | PlainMessage<GetFollowsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowsResponse
 */
export declare class GetFollowsResponse extends Message<GetFollowsResponse> {
    /**
     * @generated from field: repeated bsky.FollowInfo follows = 1;
     */
    follows: FollowInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowsResponse;
    static equals(a: GetFollowsResponse | PlainMessage<GetFollowsResponse> | undefined, b: GetFollowsResponse | PlainMessage<GetFollowsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.VerificationMeta
 */
export declare class VerificationMeta extends Message<VerificationMeta> {
    /**
     * @generated from field: string rkey = 1;
     */
    rkey: string;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * @generated from field: google.protobuf.Timestamp sorted_at = 4;
     */
    sortedAt?: Timestamp;
    constructor(data?: PartialMessage<VerificationMeta>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.VerificationMeta";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerificationMeta;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerificationMeta;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerificationMeta;
    static equals(a: VerificationMeta | PlainMessage<VerificationMeta> | undefined, b: VerificationMeta | PlainMessage<VerificationMeta> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationRecordsRequest
 */
export declare class GetVerificationRecordsRequest extends Message<GetVerificationRecordsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetVerificationRecordsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationRecordsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationRecordsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationRecordsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationRecordsRequest;
    static equals(a: GetVerificationRecordsRequest | PlainMessage<GetVerificationRecordsRequest> | undefined, b: GetVerificationRecordsRequest | PlainMessage<GetVerificationRecordsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationRecordsResponse
 */
export declare class GetVerificationRecordsResponse extends Message<GetVerificationRecordsResponse> {
    /**
     * @generated from field: repeated bsky.Record records = 1;
     */
    records: Record[];
    constructor(data?: PartialMessage<GetVerificationRecordsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationRecordsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationRecordsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationRecordsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationRecordsResponse;
    static equals(a: GetVerificationRecordsResponse | PlainMessage<GetVerificationRecordsResponse> | undefined, b: GetVerificationRecordsResponse | PlainMessage<GetVerificationRecordsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.VerificationIssued
 */
export declare class VerificationIssued extends Message<VerificationIssued> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string rkey = 2;
     */
    rkey: string;
    /**
     * @generated from field: string subject_did = 3;
     */
    subjectDid: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 7;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 8;
     */
    indexedAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp sorted_at = 9;
     */
    sortedAt?: Timestamp;
    constructor(data?: PartialMessage<VerificationIssued>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.VerificationIssued";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerificationIssued;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerificationIssued;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerificationIssued;
    static equals(a: VerificationIssued | PlainMessage<VerificationIssued> | undefined, b: VerificationIssued | PlainMessage<VerificationIssued> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationsIssuedRequest
 */
export declare class GetVerificationsIssuedRequest extends Message<GetVerificationsIssuedRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetVerificationsIssuedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationsIssuedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationsIssuedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationsIssuedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationsIssuedRequest;
    static equals(a: GetVerificationsIssuedRequest | PlainMessage<GetVerificationsIssuedRequest> | undefined, b: GetVerificationsIssuedRequest | PlainMessage<GetVerificationsIssuedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationsIssuedResponse
 */
export declare class GetVerificationsIssuedResponse extends Message<GetVerificationsIssuedResponse> {
    /**
     * @generated from field: repeated bsky.VerificationIssued verifications = 1;
     */
    verifications: VerificationIssued[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetVerificationsIssuedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationsIssuedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationsIssuedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationsIssuedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationsIssuedResponse;
    static equals(a: GetVerificationsIssuedResponse | PlainMessage<GetVerificationsIssuedResponse> | undefined, b: GetVerificationsIssuedResponse | PlainMessage<GetVerificationsIssuedResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.VerificationReceived
 */
export declare class VerificationReceived extends Message<VerificationReceived> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string rkey = 2;
     */
    rkey: string;
    /**
     * @generated from field: string subject_did = 3;
     */
    subjectDid: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 7;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 8;
     */
    indexedAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp sorted_at = 9;
     */
    sortedAt?: Timestamp;
    constructor(data?: PartialMessage<VerificationReceived>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.VerificationReceived";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerificationReceived;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerificationReceived;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerificationReceived;
    static equals(a: VerificationReceived | PlainMessage<VerificationReceived> | undefined, b: VerificationReceived | PlainMessage<VerificationReceived> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationsReceivedRequest
 */
export declare class GetVerificationsReceivedRequest extends Message<GetVerificationsReceivedRequest> {
    /**
     * @generated from field: string subject_did = 1;
     */
    subjectDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetVerificationsReceivedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationsReceivedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationsReceivedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationsReceivedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationsReceivedRequest;
    static equals(a: GetVerificationsReceivedRequest | PlainMessage<GetVerificationsReceivedRequest> | undefined, b: GetVerificationsReceivedRequest | PlainMessage<GetVerificationsReceivedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetVerificationsReceivedResponse
 */
export declare class GetVerificationsReceivedResponse extends Message<GetVerificationsReceivedResponse> {
    /**
     * @generated from field: repeated bsky.VerificationReceived verifications = 1;
     */
    verifications: VerificationReceived[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetVerificationsReceivedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetVerificationsReceivedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetVerificationsReceivedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetVerificationsReceivedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetVerificationsReceivedResponse;
    static equals(a: GetVerificationsReceivedResponse | PlainMessage<GetVerificationsReceivedResponse> | undefined, b: GetVerificationsReceivedResponse | PlainMessage<GetVerificationsReceivedResponse> | undefined): boolean;
}
/**
 * - return like uris where subject uri is subject A
 *     - `getLikes` list for a post
 *
 * @generated from message bsky.GetLikesBySubjectRequest
 */
export declare class GetLikesBySubjectRequest extends Message<GetLikesBySubjectRequest> {
    /**
     * @generated from field: bsky.RecordRef subject = 1;
     */
    subject?: RecordRef;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetLikesBySubjectRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesBySubjectRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesBySubjectRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesBySubjectRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesBySubjectRequest;
    static equals(a: GetLikesBySubjectRequest | PlainMessage<GetLikesBySubjectRequest> | undefined, b: GetLikesBySubjectRequest | PlainMessage<GetLikesBySubjectRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikesBySubjectResponse
 */
export declare class GetLikesBySubjectResponse extends Message<GetLikesBySubjectResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetLikesBySubjectResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesBySubjectResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesBySubjectResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesBySubjectResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesBySubjectResponse;
    static equals(a: GetLikesBySubjectResponse | PlainMessage<GetLikesBySubjectResponse> | undefined, b: GetLikesBySubjectResponse | PlainMessage<GetLikesBySubjectResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikesBySubjectSortedRequest
 */
export declare class GetLikesBySubjectSortedRequest extends Message<GetLikesBySubjectSortedRequest> {
    /**
     * @generated from field: bsky.RecordRef subject = 1;
     */
    subject?: RecordRef;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetLikesBySubjectSortedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesBySubjectSortedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesBySubjectSortedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesBySubjectSortedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesBySubjectSortedRequest;
    static equals(a: GetLikesBySubjectSortedRequest | PlainMessage<GetLikesBySubjectSortedRequest> | undefined, b: GetLikesBySubjectSortedRequest | PlainMessage<GetLikesBySubjectSortedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikesBySubjectSortedResponse
 */
export declare class GetLikesBySubjectSortedResponse extends Message<GetLikesBySubjectSortedResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetLikesBySubjectSortedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesBySubjectSortedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesBySubjectSortedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesBySubjectSortedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesBySubjectSortedResponse;
    static equals(a: GetLikesBySubjectSortedResponse | PlainMessage<GetLikesBySubjectSortedResponse> | undefined, b: GetLikesBySubjectSortedResponse | PlainMessage<GetLikesBySubjectSortedResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetQuotesBySubjectSortedRequest
 */
export declare class GetQuotesBySubjectSortedRequest extends Message<GetQuotesBySubjectSortedRequest> {
    /**
     * @generated from field: bsky.RecordRef subject = 1;
     */
    subject?: RecordRef;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetQuotesBySubjectSortedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetQuotesBySubjectSortedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetQuotesBySubjectSortedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetQuotesBySubjectSortedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetQuotesBySubjectSortedRequest;
    static equals(a: GetQuotesBySubjectSortedRequest | PlainMessage<GetQuotesBySubjectSortedRequest> | undefined, b: GetQuotesBySubjectSortedRequest | PlainMessage<GetQuotesBySubjectSortedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetQuotesBySubjectSortedResponse
 */
export declare class GetQuotesBySubjectSortedResponse extends Message<GetQuotesBySubjectSortedResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetQuotesBySubjectSortedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetQuotesBySubjectSortedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetQuotesBySubjectSortedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetQuotesBySubjectSortedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetQuotesBySubjectSortedResponse;
    static equals(a: GetQuotesBySubjectSortedResponse | PlainMessage<GetQuotesBySubjectSortedResponse> | undefined, b: GetQuotesBySubjectSortedResponse | PlainMessage<GetQuotesBySubjectSortedResponse> | undefined): boolean;
}
/**
 * - return like uris for user A on subject B, C, D...
 *     - viewer state on posts
 *
 * @generated from message bsky.GetLikesByActorAndSubjectsRequest
 */
export declare class GetLikesByActorAndSubjectsRequest extends Message<GetLikesByActorAndSubjectsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated bsky.RecordRef refs = 2;
     */
    refs: RecordRef[];
    constructor(data?: PartialMessage<GetLikesByActorAndSubjectsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesByActorAndSubjectsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesByActorAndSubjectsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesByActorAndSubjectsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesByActorAndSubjectsRequest;
    static equals(a: GetLikesByActorAndSubjectsRequest | PlainMessage<GetLikesByActorAndSubjectsRequest> | undefined, b: GetLikesByActorAndSubjectsRequest | PlainMessage<GetLikesByActorAndSubjectsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLikesByActorAndSubjectsResponse
 */
export declare class GetLikesByActorAndSubjectsResponse extends Message<GetLikesByActorAndSubjectsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetLikesByActorAndSubjectsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLikesByActorAndSubjectsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLikesByActorAndSubjectsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLikesByActorAndSubjectsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLikesByActorAndSubjectsResponse;
    static equals(a: GetLikesByActorAndSubjectsResponse | PlainMessage<GetLikesByActorAndSubjectsResponse> | undefined, b: GetLikesByActorAndSubjectsResponse | PlainMessage<GetLikesByActorAndSubjectsResponse> | undefined): boolean;
}
/**
 * - return recent like uris for user A
 *     - `getActorLikes` list for a user
 *
 * @generated from message bsky.GetActorLikesRequest
 */
export declare class GetActorLikesRequest extends Message<GetActorLikesRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorLikesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorLikesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorLikesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorLikesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorLikesRequest;
    static equals(a: GetActorLikesRequest | PlainMessage<GetActorLikesRequest> | undefined, b: GetActorLikesRequest | PlainMessage<GetActorLikesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.LikeInfo
 */
export declare class LikeInfo extends Message<LikeInfo> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string subject = 2;
     */
    subject: string;
    constructor(data?: PartialMessage<LikeInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.LikeInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LikeInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LikeInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LikeInfo;
    static equals(a: LikeInfo | PlainMessage<LikeInfo> | undefined, b: LikeInfo | PlainMessage<LikeInfo> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorLikesResponse
 */
export declare class GetActorLikesResponse extends Message<GetActorLikesResponse> {
    /**
     * @generated from field: repeated bsky.LikeInfo likes = 1;
     */
    likes: LikeInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorLikesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorLikesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorLikesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorLikesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorLikesResponse;
    static equals(a: GetActorLikesResponse | PlainMessage<GetActorLikesResponse> | undefined, b: GetActorLikesResponse | PlainMessage<GetActorLikesResponse> | undefined): boolean;
}
/**
 *
 * Interactions
 *
 *
 * @generated from message bsky.GetInteractionCountsRequest
 */
export declare class GetInteractionCountsRequest extends Message<GetInteractionCountsRequest> {
    /**
     * @generated from field: repeated bsky.RecordRef refs = 1;
     */
    refs: RecordRef[];
    /**
     * @generated from field: repeated string skip_cache_for_dids = 2;
     */
    skipCacheForDids: string[];
    constructor(data?: PartialMessage<GetInteractionCountsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetInteractionCountsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetInteractionCountsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetInteractionCountsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetInteractionCountsRequest;
    static equals(a: GetInteractionCountsRequest | PlainMessage<GetInteractionCountsRequest> | undefined, b: GetInteractionCountsRequest | PlainMessage<GetInteractionCountsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetInteractionCountsResponse
 */
export declare class GetInteractionCountsResponse extends Message<GetInteractionCountsResponse> {
    /**
     * @generated from field: repeated int32 likes = 1;
     */
    likes: number[];
    /**
     * @generated from field: repeated int32 reposts = 2;
     */
    reposts: number[];
    /**
     * @generated from field: repeated int32 replies = 3;
     */
    replies: number[];
    /**
     * @generated from field: repeated int32 quotes = 4;
     */
    quotes: number[];
    /**
     * @generated from field: repeated int32 bookmarks = 5;
     */
    bookmarks: number[];
    constructor(data?: PartialMessage<GetInteractionCountsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetInteractionCountsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetInteractionCountsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetInteractionCountsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetInteractionCountsResponse;
    static equals(a: GetInteractionCountsResponse | PlainMessage<GetInteractionCountsResponse> | undefined, b: GetInteractionCountsResponse | PlainMessage<GetInteractionCountsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetCountsForUsersRequest
 */
export declare class GetCountsForUsersRequest extends Message<GetCountsForUsersRequest> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    constructor(data?: PartialMessage<GetCountsForUsersRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetCountsForUsersRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCountsForUsersRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCountsForUsersRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCountsForUsersRequest;
    static equals(a: GetCountsForUsersRequest | PlainMessage<GetCountsForUsersRequest> | undefined, b: GetCountsForUsersRequest | PlainMessage<GetCountsForUsersRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetCountsForUsersResponse
 */
export declare class GetCountsForUsersResponse extends Message<GetCountsForUsersResponse> {
    /**
     * @generated from field: repeated int32 posts = 1;
     */
    posts: number[];
    /**
     * @generated from field: repeated int32 reposts = 2;
     */
    reposts: number[];
    /**
     * @generated from field: repeated int32 following = 3;
     */
    following: number[];
    /**
     * @generated from field: repeated int32 followers = 4;
     */
    followers: number[];
    /**
     * @generated from field: repeated int32 lists = 5;
     */
    lists: number[];
    /**
     * @generated from field: repeated int32 feeds = 6;
     */
    feeds: number[];
    /**
     * @generated from field: repeated int32 starter_packs = 7;
     */
    starterPacks: number[];
    /**
     * @generated from field: repeated int32 drafts = 8;
     */
    drafts: number[];
    constructor(data?: PartialMessage<GetCountsForUsersResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetCountsForUsersResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCountsForUsersResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCountsForUsersResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCountsForUsersResponse;
    static equals(a: GetCountsForUsersResponse | PlainMessage<GetCountsForUsersResponse> | undefined, b: GetCountsForUsersResponse | PlainMessage<GetCountsForUsersResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStarterPackCountsRequest
 */
export declare class GetStarterPackCountsRequest extends Message<GetStarterPackCountsRequest> {
    /**
     * @generated from field: repeated bsky.RecordRef refs = 1;
     */
    refs: RecordRef[];
    constructor(data?: PartialMessage<GetStarterPackCountsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStarterPackCountsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStarterPackCountsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStarterPackCountsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStarterPackCountsRequest;
    static equals(a: GetStarterPackCountsRequest | PlainMessage<GetStarterPackCountsRequest> | undefined, b: GetStarterPackCountsRequest | PlainMessage<GetStarterPackCountsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetStarterPackCountsResponse
 */
export declare class GetStarterPackCountsResponse extends Message<GetStarterPackCountsResponse> {
    /**
     * @generated from field: repeated int32 joined_week = 1;
     */
    joinedWeek: number[];
    /**
     * @generated from field: repeated int32 joined_all_time = 2;
     */
    joinedAllTime: number[];
    constructor(data?: PartialMessage<GetStarterPackCountsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetStarterPackCountsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetStarterPackCountsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetStarterPackCountsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetStarterPackCountsResponse;
    static equals(a: GetStarterPackCountsResponse | PlainMessage<GetStarterPackCountsResponse> | undefined, b: GetStarterPackCountsResponse | PlainMessage<GetStarterPackCountsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListCountsRequest
 */
export declare class GetListCountsRequest extends Message<GetListCountsRequest> {
    /**
     * @generated from field: repeated bsky.RecordRef refs = 1;
     */
    refs: RecordRef[];
    constructor(data?: PartialMessage<GetListCountsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListCountsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListCountsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListCountsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListCountsRequest;
    static equals(a: GetListCountsRequest | PlainMessage<GetListCountsRequest> | undefined, b: GetListCountsRequest | PlainMessage<GetListCountsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListCountsResponse
 */
export declare class GetListCountsResponse extends Message<GetListCountsResponse> {
    /**
     * @generated from field: repeated int32 list_items = 1;
     */
    listItems: number[];
    constructor(data?: PartialMessage<GetListCountsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListCountsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListCountsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListCountsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListCountsResponse;
    static equals(a: GetListCountsResponse | PlainMessage<GetListCountsResponse> | undefined, b: GetListCountsResponse | PlainMessage<GetListCountsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNewUserCountForRangeRequest
 */
export declare class GetNewUserCountForRangeRequest extends Message<GetNewUserCountForRangeRequest> {
    /**
     * @generated from field: google.protobuf.Timestamp start = 1;
     */
    start?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp end = 2;
     */
    end?: Timestamp;
    constructor(data?: PartialMessage<GetNewUserCountForRangeRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNewUserCountForRangeRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNewUserCountForRangeRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNewUserCountForRangeRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNewUserCountForRangeRequest;
    static equals(a: GetNewUserCountForRangeRequest | PlainMessage<GetNewUserCountForRangeRequest> | undefined, b: GetNewUserCountForRangeRequest | PlainMessage<GetNewUserCountForRangeRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNewUserCountForRangeResponse
 */
export declare class GetNewUserCountForRangeResponse extends Message<GetNewUserCountForRangeResponse> {
    /**
     * @generated from field: int32 count = 1;
     */
    count: number;
    constructor(data?: PartialMessage<GetNewUserCountForRangeResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNewUserCountForRangeResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNewUserCountForRangeResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNewUserCountForRangeResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNewUserCountForRangeResponse;
    static equals(a: GetNewUserCountForRangeResponse | PlainMessage<GetNewUserCountForRangeResponse> | undefined, b: GetNewUserCountForRangeResponse | PlainMessage<GetNewUserCountForRangeResponse> | undefined): boolean;
}
/**
 * - return repost uris where subject uri is subject A
 *     - `getReposts` list for a post
 *
 * @generated from message bsky.GetRepostsBySubjectRequest
 */
export declare class GetRepostsBySubjectRequest extends Message<GetRepostsBySubjectRequest> {
    /**
     * @generated from field: bsky.RecordRef subject = 1;
     */
    subject?: RecordRef;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetRepostsBySubjectRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostsBySubjectRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostsBySubjectRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostsBySubjectRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostsBySubjectRequest;
    static equals(a: GetRepostsBySubjectRequest | PlainMessage<GetRepostsBySubjectRequest> | undefined, b: GetRepostsBySubjectRequest | PlainMessage<GetRepostsBySubjectRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRepostsBySubjectResponse
 */
export declare class GetRepostsBySubjectResponse extends Message<GetRepostsBySubjectResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetRepostsBySubjectResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostsBySubjectResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostsBySubjectResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostsBySubjectResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostsBySubjectResponse;
    static equals(a: GetRepostsBySubjectResponse | PlainMessage<GetRepostsBySubjectResponse> | undefined, b: GetRepostsBySubjectResponse | PlainMessage<GetRepostsBySubjectResponse> | undefined): boolean;
}
/**
 * - return repost uris for user A on subject B, C, D...
 *     - viewer state on posts
 *
 * @generated from message bsky.GetRepostsByActorAndSubjectsRequest
 */
export declare class GetRepostsByActorAndSubjectsRequest extends Message<GetRepostsByActorAndSubjectsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated bsky.RecordRef refs = 2;
     */
    refs: RecordRef[];
    constructor(data?: PartialMessage<GetRepostsByActorAndSubjectsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostsByActorAndSubjectsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostsByActorAndSubjectsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostsByActorAndSubjectsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostsByActorAndSubjectsRequest;
    static equals(a: GetRepostsByActorAndSubjectsRequest | PlainMessage<GetRepostsByActorAndSubjectsRequest> | undefined, b: GetRepostsByActorAndSubjectsRequest | PlainMessage<GetRepostsByActorAndSubjectsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.RecordRef
 */
export declare class RecordRef extends Message<RecordRef> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    constructor(data?: PartialMessage<RecordRef>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.RecordRef";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RecordRef;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RecordRef;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RecordRef;
    static equals(a: RecordRef | PlainMessage<RecordRef> | undefined, b: RecordRef | PlainMessage<RecordRef> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRepostsByActorAndSubjectsResponse
 */
export declare class GetRepostsByActorAndSubjectsResponse extends Message<GetRepostsByActorAndSubjectsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetRepostsByActorAndSubjectsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRepostsByActorAndSubjectsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRepostsByActorAndSubjectsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRepostsByActorAndSubjectsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRepostsByActorAndSubjectsResponse;
    static equals(a: GetRepostsByActorAndSubjectsResponse | PlainMessage<GetRepostsByActorAndSubjectsResponse> | undefined, b: GetRepostsByActorAndSubjectsResponse | PlainMessage<GetRepostsByActorAndSubjectsResponse> | undefined): boolean;
}
/**
 * - return recent repost uris for user A
 *     - `getActorReposts` list for a user
 *
 * @generated from message bsky.GetActorRepostsRequest
 */
export declare class GetActorRepostsRequest extends Message<GetActorRepostsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorRepostsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorRepostsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorRepostsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorRepostsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorRepostsRequest;
    static equals(a: GetActorRepostsRequest | PlainMessage<GetActorRepostsRequest> | undefined, b: GetActorRepostsRequest | PlainMessage<GetActorRepostsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorRepostsResponse
 */
export declare class GetActorRepostsResponse extends Message<GetActorRepostsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorRepostsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorRepostsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorRepostsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorRepostsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorRepostsResponse;
    static equals(a: GetActorRepostsResponse | PlainMessage<GetActorRepostsResponse> | undefined, b: GetActorRepostsResponse | PlainMessage<GetActorRepostsResponse> | undefined): boolean;
}
/**
 * - return actor information for dids A, B, C…
 *     - profile hydration
 *     - should this include handles?  apply repo takedown?
 *
 * @generated from message bsky.GetActorsRequest
 */
export declare class GetActorsRequest extends Message<GetActorsRequest> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    /**
     * @generated from field: repeated string skip_cache_for_dids = 2;
     */
    skipCacheForDids: string[];
    /**
     * @generated from field: repeated string return_age_assurance_for_dids = 3;
     */
    returnAgeAssuranceForDids: string[];
    constructor(data?: PartialMessage<GetActorsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorsRequest;
    static equals(a: GetActorsRequest | PlainMessage<GetActorsRequest> | undefined, b: GetActorsRequest | PlainMessage<GetActorsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ActorInfo
 */
export declare class ActorInfo extends Message<ActorInfo> {
    /**
     * @generated from field: bool exists = 1;
     */
    exists: boolean;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: bsky.Record profile = 3;
     */
    profile?: Record;
    /**
     * @generated from field: bool taken_down = 4;
     */
    takenDown: boolean;
    /**
     * @generated from field: string takedown_ref = 5;
     */
    takedownRef: string;
    /**
     * @generated from field: google.protobuf.Timestamp tombstoned_at = 6;
     */
    tombstonedAt?: Timestamp;
    /**
     * @generated from field: bool labeler = 7;
     */
    labeler: boolean;
    /**
     * @generated from field: string allow_incoming_chats_from = 8;
     */
    allowIncomingChatsFrom: string;
    /**
     * @generated from field: string upstream_status = 9;
     */
    upstreamStatus: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 10;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: bool priority_notifications = 11;
     */
    priorityNotifications: boolean;
    /**
     * @generated from field: double pagerank = 12;
     */
    pagerank: number;
    /**
     * @generated from field: bool trusted_verifier = 13;
     */
    trustedVerifier: boolean;
    /**
     * @generated from field: map<string, bsky.VerificationMeta> verified_by = 14;
     */
    verifiedBy: {
        [key: string]: VerificationMeta;
    };
    /**
     * Tags being applied to the account itself
     *
     * @generated from field: repeated string tags = 15;
     */
    tags: string[];
    /**
     * Tags being applied to the profile record
     *
     * @generated from field: repeated string profile_tags = 16;
     */
    profileTags: string[];
    /**
     * @generated from field: bsky.Record status_record = 17;
     */
    statusRecord?: Record;
    /**
     * @generated from field: string allow_activity_subscriptions_from = 18;
     */
    allowActivitySubscriptionsFrom: string;
    /**
     * @generated from field: optional bsky.AgeAssuranceStatus age_assurance_status = 19;
     */
    ageAssuranceStatus?: AgeAssuranceStatus;
    /**
     * @generated from field: bsky.Record germ_record = 21;
     */
    germRecord?: Record;
    /**
     * @generated from field: string allow_group_chat_invites_from = 22;
     */
    allowGroupChatInvitesFrom: string;
    /**
     * @generated from field: optional bsky.ParaCabildeoLive cabildeo_live = 23;
     */
    cabildeoLive?: ParaCabildeoLive;
    constructor(data?: PartialMessage<ActorInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ActorInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ActorInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ActorInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ActorInfo;
    static equals(a: ActorInfo | PlainMessage<ActorInfo> | undefined, b: ActorInfo | PlainMessage<ActorInfo> | undefined): boolean;
}
/**
 * @generated from message bsky.AgeAssuranceStatus
 */
export declare class AgeAssuranceStatus extends Message<AgeAssuranceStatus> {
    /**
     * @generated from field: string status = 1;
     */
    status: string;
    /**
     * @generated from field: google.protobuf.Timestamp last_initiated_at = 2;
     */
    lastInitiatedAt?: Timestamp;
    /**
     * @generated from field: bool override_applied = 3;
     */
    overrideApplied: boolean;
    /**
     * @generated from field: string access = 4;
     */
    access: string;
    constructor(data?: PartialMessage<AgeAssuranceStatus>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.AgeAssuranceStatus";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AgeAssuranceStatus;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AgeAssuranceStatus;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AgeAssuranceStatus;
    static equals(a: AgeAssuranceStatus | PlainMessage<AgeAssuranceStatus> | undefined, b: AgeAssuranceStatus | PlainMessage<AgeAssuranceStatus> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorsResponse
 */
export declare class GetActorsResponse extends Message<GetActorsResponse> {
    /**
     * @generated from field: repeated bsky.ActorInfo actors = 1;
     */
    actors: ActorInfo[];
    constructor(data?: PartialMessage<GetActorsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorsResponse;
    static equals(a: GetActorsResponse | PlainMessage<GetActorsResponse> | undefined, b: GetActorsResponse | PlainMessage<GetActorsResponse> | undefined): boolean;
}
/**
 * - return did for handle A
 *     - `resolveHandle`
 *     - answering queries where the query param is a handle
 *
 * @generated from message bsky.GetDidsByHandlesRequest
 */
export declare class GetDidsByHandlesRequest extends Message<GetDidsByHandlesRequest> {
    /**
     * @generated from field: repeated string handles = 1;
     */
    handles: string[];
    /**
     * @generated from field: bool lookup_unidirectional = 2;
     */
    lookupUnidirectional: boolean;
    constructor(data?: PartialMessage<GetDidsByHandlesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetDidsByHandlesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetDidsByHandlesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetDidsByHandlesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetDidsByHandlesRequest;
    static equals(a: GetDidsByHandlesRequest | PlainMessage<GetDidsByHandlesRequest> | undefined, b: GetDidsByHandlesRequest | PlainMessage<GetDidsByHandlesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetDidsByHandlesResponse
 */
export declare class GetDidsByHandlesResponse extends Message<GetDidsByHandlesResponse> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    constructor(data?: PartialMessage<GetDidsByHandlesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetDidsByHandlesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetDidsByHandlesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetDidsByHandlesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetDidsByHandlesResponse;
    static equals(a: GetDidsByHandlesResponse | PlainMessage<GetDidsByHandlesResponse> | undefined, b: GetDidsByHandlesResponse | PlainMessage<GetDidsByHandlesResponse> | undefined): boolean;
}
/**
 * - return relationships between user A and users B, C, D...
 *     - profile hydration
 *     - block application
 *
 * @generated from message bsky.GetRelationshipsRequest
 */
export declare class GetRelationshipsRequest extends Message<GetRelationshipsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string target_dids = 2;
     */
    targetDids: string[];
    constructor(data?: PartialMessage<GetRelationshipsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRelationshipsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRelationshipsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRelationshipsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRelationshipsRequest;
    static equals(a: GetRelationshipsRequest | PlainMessage<GetRelationshipsRequest> | undefined, b: GetRelationshipsRequest | PlainMessage<GetRelationshipsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.Relationships
 */
export declare class Relationships extends Message<Relationships> {
    /**
     * @generated from field: bool muted = 1;
     */
    muted: boolean;
    /**
     * @generated from field: string muted_by_list = 2;
     */
    mutedByList: string;
    /**
     * @generated from field: string blocked_by = 3;
     */
    blockedBy: string;
    /**
     * @generated from field: string blocking = 4;
     */
    blocking: string;
    /**
     * @generated from field: string blocked_by_list = 5;
     */
    blockedByList: string;
    /**
     * @generated from field: string blocking_by_list = 6;
     */
    blockingByList: string;
    /**
     * @generated from field: string following = 7;
     */
    following: string;
    /**
     * @generated from field: string followed_by = 8;
     */
    followedBy: string;
    constructor(data?: PartialMessage<Relationships>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.Relationships";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Relationships;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Relationships;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Relationships;
    static equals(a: Relationships | PlainMessage<Relationships> | undefined, b: Relationships | PlainMessage<Relationships> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRelationshipsResponse
 */
export declare class GetRelationshipsResponse extends Message<GetRelationshipsResponse> {
    /**
     * @generated from field: repeated bsky.Relationships relationships = 1;
     */
    relationships: Relationships[];
    constructor(data?: PartialMessage<GetRelationshipsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRelationshipsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRelationshipsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRelationshipsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRelationshipsResponse;
    static equals(a: GetRelationshipsResponse | PlainMessage<GetRelationshipsResponse> | undefined, b: GetRelationshipsResponse | PlainMessage<GetRelationshipsResponse> | undefined): boolean;
}
/**
 * - return whether a block (bidrectionally and either direct or through a list) exists between two dids
 *     - enforcing 3rd party block violations
 *
 * @generated from message bsky.RelationshipPair
 */
export declare class RelationshipPair extends Message<RelationshipPair> {
    /**
     * @generated from field: string a = 1;
     */
    a: string;
    /**
     * @generated from field: string b = 2;
     */
    b: string;
    constructor(data?: PartialMessage<RelationshipPair>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.RelationshipPair";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RelationshipPair;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RelationshipPair;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RelationshipPair;
    static equals(a: RelationshipPair | PlainMessage<RelationshipPair> | undefined, b: RelationshipPair | PlainMessage<RelationshipPair> | undefined): boolean;
}
/**
 * @generated from message bsky.BlockExistence
 */
export declare class BlockExistence extends Message<BlockExistence> {
    /**
     * @generated from field: string blocked_by = 1;
     */
    blockedBy: string;
    /**
     * @generated from field: string blocking = 2;
     */
    blocking: string;
    /**
     * @generated from field: string blocked_by_list = 3;
     */
    blockedByList: string;
    /**
     * @generated from field: string blocking_by_list = 4;
     */
    blockingByList: string;
    constructor(data?: PartialMessage<BlockExistence>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.BlockExistence";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BlockExistence;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BlockExistence;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BlockExistence;
    static equals(a: BlockExistence | PlainMessage<BlockExistence> | undefined, b: BlockExistence | PlainMessage<BlockExistence> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlockExistenceRequest
 */
export declare class GetBlockExistenceRequest extends Message<GetBlockExistenceRequest> {
    /**
     * @generated from field: repeated bsky.RelationshipPair pairs = 1;
     */
    pairs: RelationshipPair[];
    constructor(data?: PartialMessage<GetBlockExistenceRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlockExistenceRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlockExistenceRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlockExistenceRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlockExistenceRequest;
    static equals(a: GetBlockExistenceRequest | PlainMessage<GetBlockExistenceRequest> | undefined, b: GetBlockExistenceRequest | PlainMessage<GetBlockExistenceRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlockExistenceResponse
 */
export declare class GetBlockExistenceResponse extends Message<GetBlockExistenceResponse> {
    /**
     * @generated from field: repeated bool exists = 1;
     */
    exists: boolean[];
    /**
     * @generated from field: repeated bsky.BlockExistence blocks = 2;
     */
    blocks: BlockExistence[];
    constructor(data?: PartialMessage<GetBlockExistenceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlockExistenceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlockExistenceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlockExistenceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlockExistenceResponse;
    static equals(a: GetBlockExistenceResponse | PlainMessage<GetBlockExistenceResponse> | undefined, b: GetBlockExistenceResponse | PlainMessage<GetBlockExistenceResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.ListItemInfo
 */
export declare class ListItemInfo extends Message<ListItemInfo> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string did = 2;
     */
    did: string;
    constructor(data?: PartialMessage<ListItemInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ListItemInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListItemInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListItemInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListItemInfo;
    static equals(a: ListItemInfo | PlainMessage<ListItemInfo> | undefined, b: ListItemInfo | PlainMessage<ListItemInfo> | undefined): boolean;
}
/**
 * - Return dids of users in list A
 *     - E.g. to view items in one of your mute lists
 *
 * @generated from message bsky.GetListMembersRequest
 */
export declare class GetListMembersRequest extends Message<GetListMembersRequest> {
    /**
     * @generated from field: string list_uri = 1;
     */
    listUri: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetListMembersRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListMembersRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListMembersRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListMembersRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListMembersRequest;
    static equals(a: GetListMembersRequest | PlainMessage<GetListMembersRequest> | undefined, b: GetListMembersRequest | PlainMessage<GetListMembersRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListMembersResponse
 */
export declare class GetListMembersResponse extends Message<GetListMembersResponse> {
    /**
     * @generated from field: repeated bsky.ListItemInfo listitems = 1;
     */
    listitems: ListItemInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetListMembersResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListMembersResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListMembersResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListMembersResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListMembersResponse;
    static equals(a: GetListMembersResponse | PlainMessage<GetListMembersResponse> | undefined, b: GetListMembersResponse | PlainMessage<GetListMembersResponse> | undefined): boolean;
}
/**
 * - Return list uris where user A in list B, C, D…
 *     - Used in thread reply gates
 *
 * @generated from message bsky.GetListMembershipRequest
 */
export declare class GetListMembershipRequest extends Message<GetListMembershipRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string list_uris = 2;
     */
    listUris: string[];
    constructor(data?: PartialMessage<GetListMembershipRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListMembershipRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListMembershipRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListMembershipRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListMembershipRequest;
    static equals(a: GetListMembershipRequest | PlainMessage<GetListMembershipRequest> | undefined, b: GetListMembershipRequest | PlainMessage<GetListMembershipRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListMembershipResponse
 */
export declare class GetListMembershipResponse extends Message<GetListMembershipResponse> {
    /**
     * @generated from field: repeated string listitem_uris = 1;
     */
    listitemUris: string[];
    constructor(data?: PartialMessage<GetListMembershipResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListMembershipResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListMembershipResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListMembershipResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListMembershipResponse;
    static equals(a: GetListMembershipResponse | PlainMessage<GetListMembershipResponse> | undefined, b: GetListMembershipResponse | PlainMessage<GetListMembershipResponse> | undefined): boolean;
}
/**
 * - Return number of items in list A
 *     - For aggregate
 *
 * @generated from message bsky.GetListCountRequest
 */
export declare class GetListCountRequest extends Message<GetListCountRequest> {
    /**
     * @generated from field: string list_uri = 1;
     */
    listUri: string;
    constructor(data?: PartialMessage<GetListCountRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListCountRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListCountRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListCountRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListCountRequest;
    static equals(a: GetListCountRequest | PlainMessage<GetListCountRequest> | undefined, b: GetListCountRequest | PlainMessage<GetListCountRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListCountResponse
 */
export declare class GetListCountResponse extends Message<GetListCountResponse> {
    /**
     * @generated from field: int32 count = 1;
     */
    count: number;
    constructor(data?: PartialMessage<GetListCountResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListCountResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListCountResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListCountResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListCountResponse;
    static equals(a: GetListCountResponse | PlainMessage<GetListCountResponse> | undefined, b: GetListCountResponse | PlainMessage<GetListCountResponse> | undefined): boolean;
}
/**
 * - return list of uris of lists created by A
 *     - `getLists`
 *
 * @generated from message bsky.GetActorListsRequest
 */
export declare class GetActorListsRequest extends Message<GetActorListsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorListsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorListsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorListsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorListsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorListsRequest;
    static equals(a: GetActorListsRequest | PlainMessage<GetActorListsRequest> | undefined, b: GetActorListsRequest | PlainMessage<GetActorListsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorListsResponse
 */
export declare class GetActorListsResponse extends Message<GetActorListsResponse> {
    /**
     * @generated from field: repeated string list_uris = 1;
     */
    listUris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorListsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorListsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorListsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorListsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorListsResponse;
    static equals(a: GetActorListsResponse | PlainMessage<GetActorListsResponse> | undefined, b: GetActorListsResponse | PlainMessage<GetActorListsResponse> | undefined): boolean;
}
/**
 * - return boolean if user A has muted user B
 *     - hydrating mute state onto profiles
 *
 * @generated from message bsky.GetActorMutesActorRequest
 */
export declare class GetActorMutesActorRequest extends Message<GetActorMutesActorRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string target_did = 2;
     */
    targetDid: string;
    constructor(data?: PartialMessage<GetActorMutesActorRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorMutesActorRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorMutesActorRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorMutesActorRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorMutesActorRequest;
    static equals(a: GetActorMutesActorRequest | PlainMessage<GetActorMutesActorRequest> | undefined, b: GetActorMutesActorRequest | PlainMessage<GetActorMutesActorRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorMutesActorResponse
 */
export declare class GetActorMutesActorResponse extends Message<GetActorMutesActorResponse> {
    /**
     * @generated from field: bool muted = 1;
     */
    muted: boolean;
    constructor(data?: PartialMessage<GetActorMutesActorResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorMutesActorResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorMutesActorResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorMutesActorResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorMutesActorResponse;
    static equals(a: GetActorMutesActorResponse | PlainMessage<GetActorMutesActorResponse> | undefined, b: GetActorMutesActorResponse | PlainMessage<GetActorMutesActorResponse> | undefined): boolean;
}
/**
 * - return list of user dids of users who A mutes
 *     - `getMutes`
 *
 * @generated from message bsky.GetMutesRequest
 */
export declare class GetMutesRequest extends Message<GetMutesRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMutesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutesRequest;
    static equals(a: GetMutesRequest | PlainMessage<GetMutesRequest> | undefined, b: GetMutesRequest | PlainMessage<GetMutesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetMutesResponse
 */
export declare class GetMutesResponse extends Message<GetMutesResponse> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMutesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutesResponse;
    static equals(a: GetMutesResponse | PlainMessage<GetMutesResponse> | undefined, b: GetMutesResponse | PlainMessage<GetMutesResponse> | undefined): boolean;
}
/**
 * - return list uri of *any* list through which user A has muted user B
 *     - hydrating mute state onto profiles
 *     - note: we only need *one* uri even if a user is muted by multiple lists
 *
 * @generated from message bsky.GetActorMutesActorViaListRequest
 */
export declare class GetActorMutesActorViaListRequest extends Message<GetActorMutesActorViaListRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string target_did = 2;
     */
    targetDid: string;
    constructor(data?: PartialMessage<GetActorMutesActorViaListRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorMutesActorViaListRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorMutesActorViaListRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorMutesActorViaListRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorMutesActorViaListRequest;
    static equals(a: GetActorMutesActorViaListRequest | PlainMessage<GetActorMutesActorViaListRequest> | undefined, b: GetActorMutesActorViaListRequest | PlainMessage<GetActorMutesActorViaListRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorMutesActorViaListResponse
 */
export declare class GetActorMutesActorViaListResponse extends Message<GetActorMutesActorViaListResponse> {
    /**
     * @generated from field: string list_uri = 1;
     */
    listUri: string;
    constructor(data?: PartialMessage<GetActorMutesActorViaListResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorMutesActorViaListResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorMutesActorViaListResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorMutesActorViaListResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorMutesActorViaListResponse;
    static equals(a: GetActorMutesActorViaListResponse | PlainMessage<GetActorMutesActorViaListResponse> | undefined, b: GetActorMutesActorViaListResponse | PlainMessage<GetActorMutesActorViaListResponse> | undefined): boolean;
}
/**
 * - return boolean if actor A has subscribed to mutelist B
 *     - list view hydration
 *
 * @generated from message bsky.GetMutelistSubscriptionRequest
 */
export declare class GetMutelistSubscriptionRequest extends Message<GetMutelistSubscriptionRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string list_uri = 2;
     */
    listUri: string;
    constructor(data?: PartialMessage<GetMutelistSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutelistSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutelistSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionRequest;
    static equals(a: GetMutelistSubscriptionRequest | PlainMessage<GetMutelistSubscriptionRequest> | undefined, b: GetMutelistSubscriptionRequest | PlainMessage<GetMutelistSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetMutelistSubscriptionResponse
 */
export declare class GetMutelistSubscriptionResponse extends Message<GetMutelistSubscriptionResponse> {
    /**
     * @generated from field: bool subscribed = 1;
     */
    subscribed: boolean;
    constructor(data?: PartialMessage<GetMutelistSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutelistSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutelistSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionResponse;
    static equals(a: GetMutelistSubscriptionResponse | PlainMessage<GetMutelistSubscriptionResponse> | undefined, b: GetMutelistSubscriptionResponse | PlainMessage<GetMutelistSubscriptionResponse> | undefined): boolean;
}
/**
 * - return list of list uris of mutelists that A subscribes to
 *     - `getListMutes`
 *
 * @generated from message bsky.GetMutelistSubscriptionsRequest
 */
export declare class GetMutelistSubscriptionsRequest extends Message<GetMutelistSubscriptionsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMutelistSubscriptionsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutelistSubscriptionsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutelistSubscriptionsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionsRequest;
    static equals(a: GetMutelistSubscriptionsRequest | PlainMessage<GetMutelistSubscriptionsRequest> | undefined, b: GetMutelistSubscriptionsRequest | PlainMessage<GetMutelistSubscriptionsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetMutelistSubscriptionsResponse
 */
export declare class GetMutelistSubscriptionsResponse extends Message<GetMutelistSubscriptionsResponse> {
    /**
     * @generated from field: repeated string list_uris = 1;
     */
    listUris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMutelistSubscriptionsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetMutelistSubscriptionsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMutelistSubscriptionsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMutelistSubscriptionsResponse;
    static equals(a: GetMutelistSubscriptionsResponse | PlainMessage<GetMutelistSubscriptionsResponse> | undefined, b: GetMutelistSubscriptionsResponse | PlainMessage<GetMutelistSubscriptionsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetThreadMutesOnSubjectsRequest
 */
export declare class GetThreadMutesOnSubjectsRequest extends Message<GetThreadMutesOnSubjectsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string thread_roots = 2;
     */
    threadRoots: string[];
    constructor(data?: PartialMessage<GetThreadMutesOnSubjectsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadMutesOnSubjectsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadMutesOnSubjectsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadMutesOnSubjectsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadMutesOnSubjectsRequest;
    static equals(a: GetThreadMutesOnSubjectsRequest | PlainMessage<GetThreadMutesOnSubjectsRequest> | undefined, b: GetThreadMutesOnSubjectsRequest | PlainMessage<GetThreadMutesOnSubjectsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetThreadMutesOnSubjectsResponse
 */
export declare class GetThreadMutesOnSubjectsResponse extends Message<GetThreadMutesOnSubjectsResponse> {
    /**
     * @generated from field: repeated bool muted = 1;
     */
    muted: boolean[];
    constructor(data?: PartialMessage<GetThreadMutesOnSubjectsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadMutesOnSubjectsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadMutesOnSubjectsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadMutesOnSubjectsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadMutesOnSubjectsResponse;
    static equals(a: GetThreadMutesOnSubjectsResponse | PlainMessage<GetThreadMutesOnSubjectsResponse> | undefined, b: GetThreadMutesOnSubjectsResponse | PlainMessage<GetThreadMutesOnSubjectsResponse> | undefined): boolean;
}
/**
 * - Return block uri if there is a block between users A & B (bidirectional)
 *     - hydrating (& actioning) block state on profiles
 *     - handling 3rd party blocks
 *
 * @generated from message bsky.GetBidirectionalBlockRequest
 */
export declare class GetBidirectionalBlockRequest extends Message<GetBidirectionalBlockRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string target_did = 2;
     */
    targetDid: string;
    constructor(data?: PartialMessage<GetBidirectionalBlockRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBidirectionalBlockRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBidirectionalBlockRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBidirectionalBlockRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBidirectionalBlockRequest;
    static equals(a: GetBidirectionalBlockRequest | PlainMessage<GetBidirectionalBlockRequest> | undefined, b: GetBidirectionalBlockRequest | PlainMessage<GetBidirectionalBlockRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBidirectionalBlockResponse
 */
export declare class GetBidirectionalBlockResponse extends Message<GetBidirectionalBlockResponse> {
    /**
     * @generated from field: string block_uri = 1;
     */
    blockUri: string;
    constructor(data?: PartialMessage<GetBidirectionalBlockResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBidirectionalBlockResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBidirectionalBlockResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBidirectionalBlockResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBidirectionalBlockResponse;
    static equals(a: GetBidirectionalBlockResponse | PlainMessage<GetBidirectionalBlockResponse> | undefined, b: GetBidirectionalBlockResponse | PlainMessage<GetBidirectionalBlockResponse> | undefined): boolean;
}
/**
 * - Return list of block uris and user dids of users who A blocks
 *     - `getBlocks`
 *
 * @generated from message bsky.GetBlocksRequest
 */
export declare class GetBlocksRequest extends Message<GetBlocksRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetBlocksRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocksRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocksRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocksRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocksRequest;
    static equals(a: GetBlocksRequest | PlainMessage<GetBlocksRequest> | undefined, b: GetBlocksRequest | PlainMessage<GetBlocksRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlocksResponse
 */
export declare class GetBlocksResponse extends Message<GetBlocksResponse> {
    /**
     * @generated from field: repeated string block_uris = 1;
     */
    blockUris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetBlocksResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocksResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocksResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocksResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocksResponse;
    static equals(a: GetBlocksResponse | PlainMessage<GetBlocksResponse> | undefined, b: GetBlocksResponse | PlainMessage<GetBlocksResponse> | undefined): boolean;
}
/**
 * - Return list uri of ***any*** list through which users A & B have a block (bidirectional)
 *     - hydrating (& actioning) block state on profiles
 *     - handling 3rd party blocks
 *
 * @generated from message bsky.GetBidirectionalBlockViaListRequest
 */
export declare class GetBidirectionalBlockViaListRequest extends Message<GetBidirectionalBlockViaListRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string target_did = 2;
     */
    targetDid: string;
    constructor(data?: PartialMessage<GetBidirectionalBlockViaListRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBidirectionalBlockViaListRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBidirectionalBlockViaListRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBidirectionalBlockViaListRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBidirectionalBlockViaListRequest;
    static equals(a: GetBidirectionalBlockViaListRequest | PlainMessage<GetBidirectionalBlockViaListRequest> | undefined, b: GetBidirectionalBlockViaListRequest | PlainMessage<GetBidirectionalBlockViaListRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBidirectionalBlockViaListResponse
 */
export declare class GetBidirectionalBlockViaListResponse extends Message<GetBidirectionalBlockViaListResponse> {
    /**
     * @generated from field: string list_uri = 1;
     */
    listUri: string;
    constructor(data?: PartialMessage<GetBidirectionalBlockViaListResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBidirectionalBlockViaListResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBidirectionalBlockViaListResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBidirectionalBlockViaListResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBidirectionalBlockViaListResponse;
    static equals(a: GetBidirectionalBlockViaListResponse | PlainMessage<GetBidirectionalBlockViaListResponse> | undefined, b: GetBidirectionalBlockViaListResponse | PlainMessage<GetBidirectionalBlockViaListResponse> | undefined): boolean;
}
/**
 * - return boolean if user A has subscribed to blocklist B
 *     - list view hydration
 *
 * @generated from message bsky.GetBlocklistSubscriptionRequest
 */
export declare class GetBlocklistSubscriptionRequest extends Message<GetBlocklistSubscriptionRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string list_uri = 2;
     */
    listUri: string;
    constructor(data?: PartialMessage<GetBlocklistSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocklistSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocklistSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionRequest;
    static equals(a: GetBlocklistSubscriptionRequest | PlainMessage<GetBlocklistSubscriptionRequest> | undefined, b: GetBlocklistSubscriptionRequest | PlainMessage<GetBlocklistSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlocklistSubscriptionResponse
 */
export declare class GetBlocklistSubscriptionResponse extends Message<GetBlocklistSubscriptionResponse> {
    /**
     * @generated from field: string listblock_uri = 1;
     */
    listblockUri: string;
    constructor(data?: PartialMessage<GetBlocklistSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocklistSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocklistSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionResponse;
    static equals(a: GetBlocklistSubscriptionResponse | PlainMessage<GetBlocklistSubscriptionResponse> | undefined, b: GetBlocklistSubscriptionResponse | PlainMessage<GetBlocklistSubscriptionResponse> | undefined): boolean;
}
/**
 * - return list of list uris of Blockslists that A subscribes to
 *     - `getListBlocks`
 *
 * @generated from message bsky.GetBlocklistSubscriptionsRequest
 */
export declare class GetBlocklistSubscriptionsRequest extends Message<GetBlocklistSubscriptionsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetBlocklistSubscriptionsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocklistSubscriptionsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocklistSubscriptionsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionsRequest;
    static equals(a: GetBlocklistSubscriptionsRequest | PlainMessage<GetBlocklistSubscriptionsRequest> | undefined, b: GetBlocklistSubscriptionsRequest | PlainMessage<GetBlocklistSubscriptionsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlocklistSubscriptionsResponse
 */
export declare class GetBlocklistSubscriptionsResponse extends Message<GetBlocklistSubscriptionsResponse> {
    /**
     * @generated from field: repeated string list_uris = 1;
     */
    listUris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetBlocklistSubscriptionsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlocklistSubscriptionsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlocklistSubscriptionsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlocklistSubscriptionsResponse;
    static equals(a: GetBlocklistSubscriptionsResponse | PlainMessage<GetBlocklistSubscriptionsResponse> | undefined, b: GetBlocklistSubscriptionsResponse | PlainMessage<GetBlocklistSubscriptionsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationPreferencesRequest
 */
export declare class GetNotificationPreferencesRequest extends Message<GetNotificationPreferencesRequest> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    constructor(data?: PartialMessage<GetNotificationPreferencesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationPreferencesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationPreferencesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationPreferencesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationPreferencesRequest;
    static equals(a: GetNotificationPreferencesRequest | PlainMessage<GetNotificationPreferencesRequest> | undefined, b: GetNotificationPreferencesRequest | PlainMessage<GetNotificationPreferencesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.NotificationChannelList
 */
export declare class NotificationChannelList extends Message<NotificationChannelList> {
    /**
     * @generated from field: bool enabled = 1;
     */
    enabled: boolean;
    constructor(data?: PartialMessage<NotificationChannelList>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.NotificationChannelList";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NotificationChannelList;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NotificationChannelList;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NotificationChannelList;
    static equals(a: NotificationChannelList | PlainMessage<NotificationChannelList> | undefined, b: NotificationChannelList | PlainMessage<NotificationChannelList> | undefined): boolean;
}
/**
 * @generated from message bsky.NotificationChannelPush
 */
export declare class NotificationChannelPush extends Message<NotificationChannelPush> {
    /**
     * @generated from field: bool enabled = 1;
     */
    enabled: boolean;
    constructor(data?: PartialMessage<NotificationChannelPush>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.NotificationChannelPush";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NotificationChannelPush;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NotificationChannelPush;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NotificationChannelPush;
    static equals(a: NotificationChannelPush | PlainMessage<NotificationChannelPush> | undefined, b: NotificationChannelPush | PlainMessage<NotificationChannelPush> | undefined): boolean;
}
/**
 * @generated from message bsky.FilterableNotificationPreference
 */
export declare class FilterableNotificationPreference extends Message<FilterableNotificationPreference> {
    /**
     * @generated from field: bsky.NotificationInclude include = 1;
     */
    include: NotificationInclude;
    /**
     * @generated from field: bsky.NotificationChannelList list = 2;
     */
    list?: NotificationChannelList;
    /**
     * @generated from field: bsky.NotificationChannelPush push = 3;
     */
    push?: NotificationChannelPush;
    constructor(data?: PartialMessage<FilterableNotificationPreference>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.FilterableNotificationPreference";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FilterableNotificationPreference;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FilterableNotificationPreference;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FilterableNotificationPreference;
    static equals(a: FilterableNotificationPreference | PlainMessage<FilterableNotificationPreference> | undefined, b: FilterableNotificationPreference | PlainMessage<FilterableNotificationPreference> | undefined): boolean;
}
/**
 * @generated from message bsky.NotificationPreference
 */
export declare class NotificationPreference extends Message<NotificationPreference> {
    /**
     * @generated from field: bsky.NotificationChannelList list = 1;
     */
    list?: NotificationChannelList;
    /**
     * @generated from field: bsky.NotificationChannelPush push = 2;
     */
    push?: NotificationChannelPush;
    constructor(data?: PartialMessage<NotificationPreference>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.NotificationPreference";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NotificationPreference;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NotificationPreference;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NotificationPreference;
    static equals(a: NotificationPreference | PlainMessage<NotificationPreference> | undefined, b: NotificationPreference | PlainMessage<NotificationPreference> | undefined): boolean;
}
/**
 * @generated from message bsky.ChatNotificationPreference
 */
export declare class ChatNotificationPreference extends Message<ChatNotificationPreference> {
    /**
     * @generated from field: bsky.ChatNotificationInclude include = 1;
     */
    include: ChatNotificationInclude;
    /**
     * @generated from field: bsky.NotificationChannelPush push = 2;
     */
    push?: NotificationChannelPush;
    constructor(data?: PartialMessage<ChatNotificationPreference>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ChatNotificationPreference";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatNotificationPreference;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatNotificationPreference;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatNotificationPreference;
    static equals(a: ChatNotificationPreference | PlainMessage<ChatNotificationPreference> | undefined, b: ChatNotificationPreference | PlainMessage<ChatNotificationPreference> | undefined): boolean;
}
/**
 * @generated from message bsky.NotificationPreferences
 */
export declare class NotificationPreferences extends Message<NotificationPreferences> {
    /**
     * @generated from field: bytes entry = 1;
     */
    entry: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: bsky.ChatNotificationPreference chat = 2;
     */
    chat?: ChatNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference follow = 3;
     */
    follow?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference like = 4;
     */
    like?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference like_via_repost = 5;
     */
    likeViaRepost?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference mention = 6;
     */
    mention?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference quote = 7;
     */
    quote?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference reply = 8;
     */
    reply?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference repost = 9;
     */
    repost?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.FilterableNotificationPreference repost_via_repost = 10;
     */
    repostViaRepost?: FilterableNotificationPreference;
    /**
     * @generated from field: bsky.NotificationPreference starterpack_joined = 11;
     */
    starterpackJoined?: NotificationPreference;
    /**
     * @generated from field: bsky.NotificationPreference subscribed_post = 12;
     */
    subscribedPost?: NotificationPreference;
    /**
     * @generated from field: bsky.NotificationPreference unverified = 13;
     */
    unverified?: NotificationPreference;
    /**
     * @generated from field: bsky.NotificationPreference verified = 14;
     */
    verified?: NotificationPreference;
    constructor(data?: PartialMessage<NotificationPreferences>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.NotificationPreferences";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NotificationPreferences;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NotificationPreferences;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NotificationPreferences;
    static equals(a: NotificationPreferences | PlainMessage<NotificationPreferences> | undefined, b: NotificationPreferences | PlainMessage<NotificationPreferences> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationPreferencesResponse
 */
export declare class GetNotificationPreferencesResponse extends Message<GetNotificationPreferencesResponse> {
    /**
     * @generated from field: repeated bsky.NotificationPreferences preferences = 1;
     */
    preferences: NotificationPreferences[];
    constructor(data?: PartialMessage<GetNotificationPreferencesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationPreferencesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationPreferencesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationPreferencesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationPreferencesResponse;
    static equals(a: GetNotificationPreferencesResponse | PlainMessage<GetNotificationPreferencesResponse> | undefined, b: GetNotificationPreferencesResponse | PlainMessage<GetNotificationPreferencesResponse> | undefined): boolean;
}
/**
 * - list recent notifications for a user
 *     - notifications should include a uri for the record that caused the notif & a “reason” for the notification (reply, like, quotepost, etc)
 *     - this should include both read & unread notifs
 *
 * @generated from message bsky.GetNotificationsRequest
 */
export declare class GetNotificationsRequest extends Message<GetNotificationsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    /**
     * @generated from field: bool priority = 4;
     */
    priority: boolean;
    constructor(data?: PartialMessage<GetNotificationsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationsRequest;
    static equals(a: GetNotificationsRequest | PlainMessage<GetNotificationsRequest> | undefined, b: GetNotificationsRequest | PlainMessage<GetNotificationsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.Notification
 */
export declare class Notification extends Message<Notification> {
    /**
     * @generated from field: string recipient_did = 1;
     */
    recipientDid: string;
    /**
     * @generated from field: string uri = 2;
     */
    uri: string;
    /**
     * @generated from field: string reason = 3;
     */
    reason: string;
    /**
     * @generated from field: string reason_subject = 4;
     */
    reasonSubject: string;
    /**
     * @generated from field: google.protobuf.Timestamp timestamp = 5;
     */
    timestamp?: Timestamp;
    /**
     * @generated from field: bool priority = 6;
     */
    priority: boolean;
    constructor(data?: PartialMessage<Notification>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.Notification";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Notification;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Notification;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Notification;
    static equals(a: Notification | PlainMessage<Notification> | undefined, b: Notification | PlainMessage<Notification> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationsResponse
 */
export declare class GetNotificationsResponse extends Message<GetNotificationsResponse> {
    /**
     * @generated from field: repeated bsky.Notification notifications = 1;
     */
    notifications: Notification[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetNotificationsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationsResponse;
    static equals(a: GetNotificationsResponse | PlainMessage<GetNotificationsResponse> | undefined, b: GetNotificationsResponse | PlainMessage<GetNotificationsResponse> | undefined): boolean;
}
/**
 * - update a user’s “last seen time”
 *     - `updateSeen`
 *
 * @generated from message bsky.UpdateNotificationSeenRequest
 */
export declare class UpdateNotificationSeenRequest extends Message<UpdateNotificationSeenRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: google.protobuf.Timestamp timestamp = 2;
     */
    timestamp?: Timestamp;
    /**
     * @generated from field: bool priority = 3;
     */
    priority: boolean;
    constructor(data?: PartialMessage<UpdateNotificationSeenRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UpdateNotificationSeenRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateNotificationSeenRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateNotificationSeenRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateNotificationSeenRequest;
    static equals(a: UpdateNotificationSeenRequest | PlainMessage<UpdateNotificationSeenRequest> | undefined, b: UpdateNotificationSeenRequest | PlainMessage<UpdateNotificationSeenRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.UpdateNotificationSeenResponse
 */
export declare class UpdateNotificationSeenResponse extends Message<UpdateNotificationSeenResponse> {
    constructor(data?: PartialMessage<UpdateNotificationSeenResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UpdateNotificationSeenResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateNotificationSeenResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateNotificationSeenResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateNotificationSeenResponse;
    static equals(a: UpdateNotificationSeenResponse | PlainMessage<UpdateNotificationSeenResponse> | undefined, b: UpdateNotificationSeenResponse | PlainMessage<UpdateNotificationSeenResponse> | undefined): boolean;
}
/**
 * - get a user’s “last seen time”
 *     - hydrating read state onto notifications
 *
 * @generated from message bsky.GetNotificationSeenRequest
 */
export declare class GetNotificationSeenRequest extends Message<GetNotificationSeenRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: bool priority = 2;
     */
    priority: boolean;
    constructor(data?: PartialMessage<GetNotificationSeenRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationSeenRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationSeenRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationSeenRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationSeenRequest;
    static equals(a: GetNotificationSeenRequest | PlainMessage<GetNotificationSeenRequest> | undefined, b: GetNotificationSeenRequest | PlainMessage<GetNotificationSeenRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetNotificationSeenResponse
 */
export declare class GetNotificationSeenResponse extends Message<GetNotificationSeenResponse> {
    /**
     * @generated from field: google.protobuf.Timestamp timestamp = 1;
     */
    timestamp?: Timestamp;
    constructor(data?: PartialMessage<GetNotificationSeenResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetNotificationSeenResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNotificationSeenResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNotificationSeenResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNotificationSeenResponse;
    static equals(a: GetNotificationSeenResponse | PlainMessage<GetNotificationSeenResponse> | undefined, b: GetNotificationSeenResponse | PlainMessage<GetNotificationSeenResponse> | undefined): boolean;
}
/**
 * - get a count of all unread notifications (notifications after `updateSeen`)
 *     - `getUnreadCount`
 *
 * @generated from message bsky.GetUnreadNotificationCountRequest
 */
export declare class GetUnreadNotificationCountRequest extends Message<GetUnreadNotificationCountRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: bool priority = 2;
     */
    priority: boolean;
    constructor(data?: PartialMessage<GetUnreadNotificationCountRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetUnreadNotificationCountRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUnreadNotificationCountRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUnreadNotificationCountRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUnreadNotificationCountRequest;
    static equals(a: GetUnreadNotificationCountRequest | PlainMessage<GetUnreadNotificationCountRequest> | undefined, b: GetUnreadNotificationCountRequest | PlainMessage<GetUnreadNotificationCountRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetUnreadNotificationCountResponse
 */
export declare class GetUnreadNotificationCountResponse extends Message<GetUnreadNotificationCountResponse> {
    /**
     * @generated from field: int32 count = 1;
     */
    count: number;
    constructor(data?: PartialMessage<GetUnreadNotificationCountResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetUnreadNotificationCountResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetUnreadNotificationCountResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetUnreadNotificationCountResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetUnreadNotificationCountResponse;
    static equals(a: GetUnreadNotificationCountResponse | PlainMessage<GetUnreadNotificationCountResponse> | undefined, b: GetUnreadNotificationCountResponse | PlainMessage<GetUnreadNotificationCountResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActivitySubscriptionDidsRequest
 */
export declare class GetActivitySubscriptionDidsRequest extends Message<GetActivitySubscriptionDidsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActivitySubscriptionDidsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActivitySubscriptionDidsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActivitySubscriptionDidsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActivitySubscriptionDidsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActivitySubscriptionDidsRequest;
    static equals(a: GetActivitySubscriptionDidsRequest | PlainMessage<GetActivitySubscriptionDidsRequest> | undefined, b: GetActivitySubscriptionDidsRequest | PlainMessage<GetActivitySubscriptionDidsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActivitySubscriptionDidsResponse
 */
export declare class GetActivitySubscriptionDidsResponse extends Message<GetActivitySubscriptionDidsResponse> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActivitySubscriptionDidsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActivitySubscriptionDidsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActivitySubscriptionDidsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActivitySubscriptionDidsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActivitySubscriptionDidsResponse;
    static equals(a: GetActivitySubscriptionDidsResponse | PlainMessage<GetActivitySubscriptionDidsResponse> | undefined, b: GetActivitySubscriptionDidsResponse | PlainMessage<GetActivitySubscriptionDidsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.PostActivitySubscription
 */
export declare class PostActivitySubscription extends Message<PostActivitySubscription> {
    constructor(data?: PartialMessage<PostActivitySubscription>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PostActivitySubscription";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PostActivitySubscription;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PostActivitySubscription;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PostActivitySubscription;
    static equals(a: PostActivitySubscription | PlainMessage<PostActivitySubscription> | undefined, b: PostActivitySubscription | PlainMessage<PostActivitySubscription> | undefined): boolean;
}
/**
 * @generated from message bsky.ReplyActivitySubscription
 */
export declare class ReplyActivitySubscription extends Message<ReplyActivitySubscription> {
    constructor(data?: PartialMessage<ReplyActivitySubscription>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ReplyActivitySubscription";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReplyActivitySubscription;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReplyActivitySubscription;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReplyActivitySubscription;
    static equals(a: ReplyActivitySubscription | PlainMessage<ReplyActivitySubscription> | undefined, b: ReplyActivitySubscription | PlainMessage<ReplyActivitySubscription> | undefined): boolean;
}
/**
 * @generated from message bsky.ActivitySubscription
 */
export declare class ActivitySubscription extends Message<ActivitySubscription> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string namespace = 2;
     */
    namespace: string;
    /**
     * @generated from field: string key = 3;
     */
    key: string;
    /**
     * @generated from field: optional bsky.PostActivitySubscription post = 4;
     */
    post?: PostActivitySubscription;
    /**
     * @generated from field: optional bsky.ReplyActivitySubscription reply = 5;
     */
    reply?: ReplyActivitySubscription;
    /**
     * @generated from field: string subject_did = 6;
     */
    subjectDid: string;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 7;
     */
    indexedAt?: Timestamp;
    constructor(data?: PartialMessage<ActivitySubscription>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ActivitySubscription";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ActivitySubscription;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ActivitySubscription;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ActivitySubscription;
    static equals(a: ActivitySubscription | PlainMessage<ActivitySubscription> | undefined, b: ActivitySubscription | PlainMessage<ActivitySubscription> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActivitySubscriptionsByActorAndSubjectsRequest
 */
export declare class GetActivitySubscriptionsByActorAndSubjectsRequest extends Message<GetActivitySubscriptionsByActorAndSubjectsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string subject_dids = 2;
     */
    subjectDids: string[];
    constructor(data?: PartialMessage<GetActivitySubscriptionsByActorAndSubjectsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActivitySubscriptionsByActorAndSubjectsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActivitySubscriptionsByActorAndSubjectsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActivitySubscriptionsByActorAndSubjectsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActivitySubscriptionsByActorAndSubjectsRequest;
    static equals(a: GetActivitySubscriptionsByActorAndSubjectsRequest | PlainMessage<GetActivitySubscriptionsByActorAndSubjectsRequest> | undefined, b: GetActivitySubscriptionsByActorAndSubjectsRequest | PlainMessage<GetActivitySubscriptionsByActorAndSubjectsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActivitySubscriptionsByActorAndSubjectsResponse
 */
export declare class GetActivitySubscriptionsByActorAndSubjectsResponse extends Message<GetActivitySubscriptionsByActorAndSubjectsResponse> {
    /**
     * @generated from field: repeated bsky.ActivitySubscription subscriptions = 1;
     */
    subscriptions: ActivitySubscription[];
    constructor(data?: PartialMessage<GetActivitySubscriptionsByActorAndSubjectsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActivitySubscriptionsByActorAndSubjectsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActivitySubscriptionsByActorAndSubjectsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActivitySubscriptionsByActorAndSubjectsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActivitySubscriptionsByActorAndSubjectsResponse;
    static equals(a: GetActivitySubscriptionsByActorAndSubjectsResponse | PlainMessage<GetActivitySubscriptionsByActorAndSubjectsResponse> | undefined, b: GetActivitySubscriptionsByActorAndSubjectsResponse | PlainMessage<GetActivitySubscriptionsByActorAndSubjectsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostSubscriptionRequest
 */
export declare class GetPostSubscriptionRequest extends Message<GetPostSubscriptionRequest> {
    /**
     * @generated from field: string subscriber_did = 1;
     */
    subscriberDid: string;
    /**
     * @generated from field: string post_uri = 2;
     */
    postUri: string;
    constructor(data?: PartialMessage<GetPostSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostSubscriptionRequest;
    static equals(a: GetPostSubscriptionRequest | PlainMessage<GetPostSubscriptionRequest> | undefined, b: GetPostSubscriptionRequest | PlainMessage<GetPostSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.PostSubscription
 */
export declare class PostSubscription extends Message<PostSubscription> {
    /**
     * @generated from field: string subscriber_did = 1;
     */
    subscriberDid: string;
    /**
     * @generated from field: string post_uri = 2;
     */
    postUri: string;
    /**
     * @generated from field: bool reply = 3;
     */
    reply: boolean;
    /**
     * @generated from field: bool quote = 4;
     */
    quote: boolean;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 5;
     */
    indexedAt?: Timestamp;
    constructor(data?: PartialMessage<PostSubscription>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PostSubscription";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PostSubscription;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PostSubscription;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PostSubscription;
    static equals(a: PostSubscription | PlainMessage<PostSubscription> | undefined, b: PostSubscription | PlainMessage<PostSubscription> | undefined): boolean;
}
/**
 * @generated from message bsky.GetPostSubscriptionResponse
 */
export declare class GetPostSubscriptionResponse extends Message<GetPostSubscriptionResponse> {
    /**
     * @generated from field: optional bsky.PostSubscription subscription = 1;
     */
    subscription?: PostSubscription;
    constructor(data?: PartialMessage<GetPostSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetPostSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostSubscriptionResponse;
    static equals(a: GetPostSubscriptionResponse | PlainMessage<GetPostSubscriptionResponse> | undefined, b: GetPostSubscriptionResponse | PlainMessage<GetPostSubscriptionResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.PutPostSubscriptionRequest
 */
export declare class PutPostSubscriptionRequest extends Message<PutPostSubscriptionRequest> {
    /**
     * @generated from field: string subscriber_did = 1;
     */
    subscriberDid: string;
    /**
     * @generated from field: string post_uri = 2;
     */
    postUri: string;
    /**
     * @generated from field: bool reply = 3;
     */
    reply: boolean;
    /**
     * @generated from field: bool quote = 4;
     */
    quote: boolean;
    constructor(data?: PartialMessage<PutPostSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PutPostSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutPostSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutPostSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutPostSubscriptionRequest;
    static equals(a: PutPostSubscriptionRequest | PlainMessage<PutPostSubscriptionRequest> | undefined, b: PutPostSubscriptionRequest | PlainMessage<PutPostSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.PutPostSubscriptionResponse
 */
export declare class PutPostSubscriptionResponse extends Message<PutPostSubscriptionResponse> {
    /**
     * @generated from field: optional bsky.PostSubscription subscription = 1;
     */
    subscription?: PostSubscription;
    constructor(data?: PartialMessage<PutPostSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PutPostSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutPostSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutPostSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutPostSubscriptionResponse;
    static equals(a: PutPostSubscriptionResponse | PlainMessage<PutPostSubscriptionResponse> | undefined, b: PutPostSubscriptionResponse | PlainMessage<PutPostSubscriptionResponse> | undefined): boolean;
}
/**
 * - Return uris of feed generator records created by user A
 *     - `getActorFeeds`
 *
 * @generated from message bsky.GetActorFeedsRequest
 */
export declare class GetActorFeedsRequest extends Message<GetActorFeedsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorFeedsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorFeedsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorFeedsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorFeedsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorFeedsRequest;
    static equals(a: GetActorFeedsRequest | PlainMessage<GetActorFeedsRequest> | undefined, b: GetActorFeedsRequest | PlainMessage<GetActorFeedsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorFeedsResponse
 */
export declare class GetActorFeedsResponse extends Message<GetActorFeedsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorFeedsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorFeedsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorFeedsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorFeedsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorFeedsResponse;
    static equals(a: GetActorFeedsResponse | PlainMessage<GetActorFeedsResponse> | undefined, b: GetActorFeedsResponse | PlainMessage<GetActorFeedsResponse> | undefined): boolean;
}
/**
 * - Returns a list of suggested feed generator uris for an actor, paginated
 *     - `getSuggestedFeeds`
 *     - This is currently just hardcoded in the Appview DB
 *
 * @generated from message bsky.GetSuggestedFeedsRequest
 */
export declare class GetSuggestedFeedsRequest extends Message<GetSuggestedFeedsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetSuggestedFeedsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSuggestedFeedsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSuggestedFeedsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSuggestedFeedsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSuggestedFeedsRequest;
    static equals(a: GetSuggestedFeedsRequest | PlainMessage<GetSuggestedFeedsRequest> | undefined, b: GetSuggestedFeedsRequest | PlainMessage<GetSuggestedFeedsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSuggestedFeedsResponse
 */
export declare class GetSuggestedFeedsResponse extends Message<GetSuggestedFeedsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetSuggestedFeedsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSuggestedFeedsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSuggestedFeedsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSuggestedFeedsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSuggestedFeedsResponse;
    static equals(a: GetSuggestedFeedsResponse | PlainMessage<GetSuggestedFeedsResponse> | undefined, b: GetSuggestedFeedsResponse | PlainMessage<GetSuggestedFeedsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.SearchFeedGeneratorsRequest
 */
export declare class SearchFeedGeneratorsRequest extends Message<SearchFeedGeneratorsRequest> {
    /**
     * @generated from field: string query = 1;
     */
    query: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    constructor(data?: PartialMessage<SearchFeedGeneratorsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchFeedGeneratorsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchFeedGeneratorsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchFeedGeneratorsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchFeedGeneratorsRequest;
    static equals(a: SearchFeedGeneratorsRequest | PlainMessage<SearchFeedGeneratorsRequest> | undefined, b: SearchFeedGeneratorsRequest | PlainMessage<SearchFeedGeneratorsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.SearchFeedGeneratorsResponse
 */
export declare class SearchFeedGeneratorsResponse extends Message<SearchFeedGeneratorsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<SearchFeedGeneratorsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchFeedGeneratorsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchFeedGeneratorsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchFeedGeneratorsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchFeedGeneratorsResponse;
    static equals(a: SearchFeedGeneratorsResponse | PlainMessage<SearchFeedGeneratorsResponse> | undefined, b: SearchFeedGeneratorsResponse | PlainMessage<SearchFeedGeneratorsResponse> | undefined): boolean;
}
/**
 * - Returns feed generator validity and online status with uris A, B, C…
 *     - Not currently being used, but could be worhthwhile.
 *
 * @generated from message bsky.GetFeedGeneratorStatusRequest
 */
export declare class GetFeedGeneratorStatusRequest extends Message<GetFeedGeneratorStatusRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetFeedGeneratorStatusRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFeedGeneratorStatusRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFeedGeneratorStatusRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFeedGeneratorStatusRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFeedGeneratorStatusRequest;
    static equals(a: GetFeedGeneratorStatusRequest | PlainMessage<GetFeedGeneratorStatusRequest> | undefined, b: GetFeedGeneratorStatusRequest | PlainMessage<GetFeedGeneratorStatusRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFeedGeneratorStatusResponse
 */
export declare class GetFeedGeneratorStatusResponse extends Message<GetFeedGeneratorStatusResponse> {
    /**
     * @generated from field: repeated string status = 1;
     */
    status: string[];
    constructor(data?: PartialMessage<GetFeedGeneratorStatusResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFeedGeneratorStatusResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFeedGeneratorStatusResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFeedGeneratorStatusResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFeedGeneratorStatusResponse;
    static equals(a: GetFeedGeneratorStatusResponse | PlainMessage<GetFeedGeneratorStatusResponse> | undefined, b: GetFeedGeneratorStatusResponse | PlainMessage<GetFeedGeneratorStatusResponse> | undefined): boolean;
}
/**
 * - Returns recent posts authored by a given DID, paginated
 *     - `getAuthorFeed`
 *     - Optionally: filter by if a post is/isn’t a reply and if a post has a media object in it
 *
 * @generated from message bsky.GetAuthorFeedRequest
 */
export declare class GetAuthorFeedRequest extends Message<GetAuthorFeedRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    /**
     * @generated from field: bsky.FeedType feed_type = 4;
     */
    feedType: FeedType;
    constructor(data?: PartialMessage<GetAuthorFeedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetAuthorFeedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAuthorFeedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAuthorFeedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAuthorFeedRequest;
    static equals(a: GetAuthorFeedRequest | PlainMessage<GetAuthorFeedRequest> | undefined, b: GetAuthorFeedRequest | PlainMessage<GetAuthorFeedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.AuthorFeedItem
 */
export declare class AuthorFeedItem extends Message<AuthorFeedItem> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string repost = 3;
     */
    repost: string;
    /**
     * @generated from field: string repost_cid = 4;
     */
    repostCid: string;
    /**
     * @generated from field: bool posts_and_author_threads = 5;
     */
    postsAndAuthorThreads: boolean;
    /**
     * @generated from field: bool posts_no_replies = 6;
     */
    postsNoReplies: boolean;
    /**
     * @generated from field: bool posts_with_media = 7;
     */
    postsWithMedia: boolean;
    /**
     * @generated from field: bool is_reply = 8;
     */
    isReply: boolean;
    /**
     * @generated from field: bool is_repost = 9;
     */
    isRepost: boolean;
    /**
     * @generated from field: bool is_quote_post = 10;
     */
    isQuotePost: boolean;
    /**
     * @generated from field: bool posts_with_video = 11;
     */
    postsWithVideo: boolean;
    constructor(data?: PartialMessage<AuthorFeedItem>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.AuthorFeedItem";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AuthorFeedItem;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AuthorFeedItem;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AuthorFeedItem;
    static equals(a: AuthorFeedItem | PlainMessage<AuthorFeedItem> | undefined, b: AuthorFeedItem | PlainMessage<AuthorFeedItem> | undefined): boolean;
}
/**
 * @generated from message bsky.GetAuthorFeedResponse
 */
export declare class GetAuthorFeedResponse extends Message<GetAuthorFeedResponse> {
    /**
     * @generated from field: repeated bsky.AuthorFeedItem items = 1;
     */
    items: AuthorFeedItem[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetAuthorFeedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetAuthorFeedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAuthorFeedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAuthorFeedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAuthorFeedResponse;
    static equals(a: GetAuthorFeedResponse | PlainMessage<GetAuthorFeedResponse> | undefined, b: GetAuthorFeedResponse | PlainMessage<GetAuthorFeedResponse> | undefined): boolean;
}
/**
 * - Returns recent posts authored by users followed by a given DID, paginated
 *     - `getTimeline`
 *
 * @generated from message bsky.GetTimelineRequest
 */
export declare class GetTimelineRequest extends Message<GetTimelineRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    /**
     * @generated from field: bool exclude_replies = 4;
     */
    excludeReplies: boolean;
    /**
     * @generated from field: bool exclude_reposts = 5;
     */
    excludeReposts: boolean;
    /**
     * @generated from field: bool exclude_quotes = 6;
     */
    excludeQuotes: boolean;
    constructor(data?: PartialMessage<GetTimelineRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetTimelineRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTimelineRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTimelineRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTimelineRequest;
    static equals(a: GetTimelineRequest | PlainMessage<GetTimelineRequest> | undefined, b: GetTimelineRequest | PlainMessage<GetTimelineRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetTimelineResponse
 */
export declare class GetTimelineResponse extends Message<GetTimelineResponse> {
    /**
     * @generated from field: repeated bsky.TimelineFeedItem items = 1;
     */
    items: TimelineFeedItem[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetTimelineResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetTimelineResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTimelineResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTimelineResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTimelineResponse;
    static equals(a: GetTimelineResponse | PlainMessage<GetTimelineResponse> | undefined, b: GetTimelineResponse | PlainMessage<GetTimelineResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.TimelineFeedItem
 */
export declare class TimelineFeedItem extends Message<TimelineFeedItem> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string repost = 3;
     */
    repost: string;
    /**
     * @generated from field: string repost_cid = 4;
     */
    repostCid: string;
    /**
     * @generated from field: bool is_reply = 5;
     */
    isReply: boolean;
    /**
     * @generated from field: bool is_repost = 6;
     */
    isRepost: boolean;
    /**
     * @generated from field: bool is_quote_post = 7;
     */
    isQuotePost: boolean;
    constructor(data?: PartialMessage<TimelineFeedItem>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TimelineFeedItem";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TimelineFeedItem;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TimelineFeedItem;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TimelineFeedItem;
    static equals(a: TimelineFeedItem | PlainMessage<TimelineFeedItem> | undefined, b: TimelineFeedItem | PlainMessage<TimelineFeedItem> | undefined): boolean;
}
/**
 * - Return recent post uris from users in list A
 *     - `getListFeed`
 *     - (This is essentially the same as `getTimeline` but instead of follows of a did, it is list items of a list)
 *
 * @generated from message bsky.GetListFeedRequest
 */
export declare class GetListFeedRequest extends Message<GetListFeedRequest> {
    /**
     * @generated from field: string list_uri = 1;
     */
    listUri: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    /**
     * @generated from field: bool exclude_replies = 4;
     */
    excludeReplies: boolean;
    /**
     * @generated from field: bool exclude_reposts = 5;
     */
    excludeReposts: boolean;
    /**
     * @generated from field: bool exclude_quotes = 6;
     */
    excludeQuotes: boolean;
    constructor(data?: PartialMessage<GetListFeedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListFeedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListFeedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListFeedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListFeedRequest;
    static equals(a: GetListFeedRequest | PlainMessage<GetListFeedRequest> | undefined, b: GetListFeedRequest | PlainMessage<GetListFeedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetListFeedResponse
 */
export declare class GetListFeedResponse extends Message<GetListFeedResponse> {
    /**
     * @generated from field: repeated bsky.TimelineFeedItem items = 1;
     */
    items: TimelineFeedItem[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetListFeedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetListFeedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListFeedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListFeedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListFeedResponse;
    static equals(a: GetListFeedResponse | PlainMessage<GetListFeedResponse> | undefined, b: GetListFeedResponse | PlainMessage<GetListFeedResponse> | undefined): boolean;
}
/**
 * Return posts uris of any replies N levels above or M levels below post A
 *
 * @generated from message bsky.GetThreadRequest
 */
export declare class GetThreadRequest extends Message<GetThreadRequest> {
    /**
     * @generated from field: string post_uri = 1;
     */
    postUri: string;
    /**
     * @generated from field: int32 above = 2;
     */
    above: number;
    /**
     * @generated from field: int32 below = 3;
     */
    below: number;
    constructor(data?: PartialMessage<GetThreadRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadRequest;
    static equals(a: GetThreadRequest | PlainMessage<GetThreadRequest> | undefined, b: GetThreadRequest | PlainMessage<GetThreadRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetThreadResponse
 */
export declare class GetThreadResponse extends Message<GetThreadResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetThreadResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetThreadResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetThreadResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetThreadResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetThreadResponse;
    static equals(a: GetThreadResponse | PlainMessage<GetThreadResponse> | undefined, b: GetThreadResponse | PlainMessage<GetThreadResponse> | undefined): boolean;
}
/**
 * - Return DIDs of actors matching term, paginated
 *     - `searchActors` skeleton
 *
 * @generated from message bsky.SearchActorsRequest
 */
export declare class SearchActorsRequest extends Message<SearchActorsRequest> {
    /**
     * @generated from field: string term = 1;
     */
    term: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchActorsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchActorsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchActorsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchActorsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchActorsRequest;
    static equals(a: SearchActorsRequest | PlainMessage<SearchActorsRequest> | undefined, b: SearchActorsRequest | PlainMessage<SearchActorsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.SearchActorsResponse
 */
export declare class SearchActorsResponse extends Message<SearchActorsResponse> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchActorsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchActorsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchActorsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchActorsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchActorsResponse;
    static equals(a: SearchActorsResponse | PlainMessage<SearchActorsResponse> | undefined, b: SearchActorsResponse | PlainMessage<SearchActorsResponse> | undefined): boolean;
}
/**
 * - Return uris of posts matching term, paginated
 *     - `searchPosts` skeleton
 *
 * @generated from message bsky.SearchPostsRequest
 */
export declare class SearchPostsRequest extends Message<SearchPostsRequest> {
    /**
     * @generated from field: string term = 1;
     */
    term: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchPostsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchPostsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchPostsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchPostsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchPostsRequest;
    static equals(a: SearchPostsRequest | PlainMessage<SearchPostsRequest> | undefined, b: SearchPostsRequest | PlainMessage<SearchPostsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.SearchPostsResponse
 */
export declare class SearchPostsResponse extends Message<SearchPostsResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchPostsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchPostsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchPostsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchPostsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchPostsResponse;
    static equals(a: SearchPostsResponse | PlainMessage<SearchPostsResponse> | undefined, b: SearchPostsResponse | PlainMessage<SearchPostsResponse> | undefined): boolean;
}
/**
 * - Return uris of starter packs matching term, paginated
 *     - `searchStarterPacks` skeleton
 *
 * @generated from message bsky.SearchStarterPacksRequest
 */
export declare class SearchStarterPacksRequest extends Message<SearchStarterPacksRequest> {
    /**
     * @generated from field: string term = 1;
     */
    term: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchStarterPacksRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchStarterPacksRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchStarterPacksRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchStarterPacksRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchStarterPacksRequest;
    static equals(a: SearchStarterPacksRequest | PlainMessage<SearchStarterPacksRequest> | undefined, b: SearchStarterPacksRequest | PlainMessage<SearchStarterPacksRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.SearchStarterPacksResponse
 */
export declare class SearchStarterPacksResponse extends Message<SearchStarterPacksResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<SearchStarterPacksResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SearchStarterPacksResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SearchStarterPacksResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SearchStarterPacksResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SearchStarterPacksResponse;
    static equals(a: SearchStarterPacksResponse | PlainMessage<SearchStarterPacksResponse> | undefined, b: SearchStarterPacksResponse | PlainMessage<SearchStarterPacksResponse> | undefined): boolean;
}
/**
 * - Return DIDs of suggested follows for a user, excluding anyone they already follow
 *     - `getSuggestions`, `getSuggestedFollowsByActor`
 *
 * @generated from message bsky.GetFollowSuggestionsRequest
 */
export declare class GetFollowSuggestionsRequest extends Message<GetFollowSuggestionsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string relative_to_did = 2;
     */
    relativeToDid: string;
    /**
     * @generated from field: int32 limit = 3;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 4;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowSuggestionsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowSuggestionsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowSuggestionsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowSuggestionsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowSuggestionsRequest;
    static equals(a: GetFollowSuggestionsRequest | PlainMessage<GetFollowSuggestionsRequest> | undefined, b: GetFollowSuggestionsRequest | PlainMessage<GetFollowSuggestionsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowSuggestionsResponse
 */
export declare class GetFollowSuggestionsResponse extends Message<GetFollowSuggestionsResponse> {
    /**
     * @generated from field: repeated string dids = 1;
     */
    dids: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetFollowSuggestionsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowSuggestionsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowSuggestionsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowSuggestionsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowSuggestionsResponse;
    static equals(a: GetFollowSuggestionsResponse | PlainMessage<GetFollowSuggestionsResponse> | undefined, b: GetFollowSuggestionsResponse | PlainMessage<GetFollowSuggestionsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.SuggestedEntity
 */
export declare class SuggestedEntity extends Message<SuggestedEntity> {
    /**
     * @generated from field: string tag = 1;
     */
    tag: string;
    /**
     * @generated from field: string subject = 2;
     */
    subject: string;
    /**
     * @generated from field: string subject_type = 3;
     */
    subjectType: string;
    /**
     * @generated from field: int64 priority = 4;
     */
    priority: bigint;
    constructor(data?: PartialMessage<SuggestedEntity>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.SuggestedEntity";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SuggestedEntity;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SuggestedEntity;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SuggestedEntity;
    static equals(a: SuggestedEntity | PlainMessage<SuggestedEntity> | undefined, b: SuggestedEntity | PlainMessage<SuggestedEntity> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSuggestedEntitiesRequest
 */
export declare class GetSuggestedEntitiesRequest extends Message<GetSuggestedEntitiesRequest> {
    /**
     * @generated from field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetSuggestedEntitiesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSuggestedEntitiesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSuggestedEntitiesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSuggestedEntitiesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSuggestedEntitiesRequest;
    static equals(a: GetSuggestedEntitiesRequest | PlainMessage<GetSuggestedEntitiesRequest> | undefined, b: GetSuggestedEntitiesRequest | PlainMessage<GetSuggestedEntitiesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSuggestedEntitiesResponse
 */
export declare class GetSuggestedEntitiesResponse extends Message<GetSuggestedEntitiesResponse> {
    /**
     * @generated from field: repeated bsky.SuggestedEntity entities = 1;
     */
    entities: SuggestedEntity[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetSuggestedEntitiesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSuggestedEntitiesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSuggestedEntitiesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSuggestedEntitiesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSuggestedEntitiesResponse;
    static equals(a: GetSuggestedEntitiesResponse | PlainMessage<GetSuggestedEntitiesResponse> | undefined, b: GetSuggestedEntitiesResponse | PlainMessage<GetSuggestedEntitiesResponse> | undefined): boolean;
}
/**
 * - Get all labels on a subjects A, B, C (uri or did) issued by dids D, E, F…
 *     - label hydration on nearly every view
 *
 * @generated from message bsky.GetLabelsRequest
 */
export declare class GetLabelsRequest extends Message<GetLabelsRequest> {
    /**
     * @generated from field: repeated string subjects = 1;
     */
    subjects: string[];
    /**
     * @generated from field: repeated string issuers = 2;
     */
    issuers: string[];
    constructor(data?: PartialMessage<GetLabelsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLabelsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLabelsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLabelsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLabelsRequest;
    static equals(a: GetLabelsRequest | PlainMessage<GetLabelsRequest> | undefined, b: GetLabelsRequest | PlainMessage<GetLabelsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLabelsResponse
 */
export declare class GetLabelsResponse extends Message<GetLabelsResponse> {
    /**
     * @generated from field: repeated bytes labels = 1;
     */
    labels: Uint8Array[];
    constructor(data?: PartialMessage<GetLabelsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLabelsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLabelsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLabelsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLabelsResponse;
    static equals(a: GetLabelsResponse | PlainMessage<GetLabelsResponse> | undefined, b: GetLabelsResponse | PlainMessage<GetLabelsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorStarterPacksRequest
 */
export declare class GetActorStarterPacksRequest extends Message<GetActorStarterPacksRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorStarterPacksRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorStarterPacksRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorStarterPacksRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorStarterPacksRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorStarterPacksRequest;
    static equals(a: GetActorStarterPacksRequest | PlainMessage<GetActorStarterPacksRequest> | undefined, b: GetActorStarterPacksRequest | PlainMessage<GetActorStarterPacksRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorStarterPacksResponse
 */
export declare class GetActorStarterPacksResponse extends Message<GetActorStarterPacksResponse> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorStarterPacksResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorStarterPacksResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorStarterPacksResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorStarterPacksResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorStarterPacksResponse;
    static equals(a: GetActorStarterPacksResponse | PlainMessage<GetActorStarterPacksResponse> | undefined, b: GetActorStarterPacksResponse | PlainMessage<GetActorStarterPacksResponse> | undefined): boolean;
}
/**
 * - Latest repo rev of user w/ DID
 *     - Read-after-write header in`getProfile`, `getProfiles`, `getActorLikes`, `getAuthorFeed`, `getListFeed`, `getPostThread`, `getTimeline`.  Could it be view dependent?
 *
 * @generated from message bsky.GetLatestRevRequest
 */
export declare class GetLatestRevRequest extends Message<GetLatestRevRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    constructor(data?: PartialMessage<GetLatestRevRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLatestRevRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLatestRevRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLatestRevRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLatestRevRequest;
    static equals(a: GetLatestRevRequest | PlainMessage<GetLatestRevRequest> | undefined, b: GetLatestRevRequest | PlainMessage<GetLatestRevRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetLatestRevResponse
 */
export declare class GetLatestRevResponse extends Message<GetLatestRevResponse> {
    /**
     * @generated from field: string rev = 1;
     */
    rev: string;
    constructor(data?: PartialMessage<GetLatestRevResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetLatestRevResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetLatestRevResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetLatestRevResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetLatestRevResponse;
    static equals(a: GetLatestRevResponse | PlainMessage<GetLatestRevResponse> | undefined, b: GetLatestRevResponse | PlainMessage<GetLatestRevResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetIdentityByDidRequest
 */
export declare class GetIdentityByDidRequest extends Message<GetIdentityByDidRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    constructor(data?: PartialMessage<GetIdentityByDidRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetIdentityByDidRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetIdentityByDidRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetIdentityByDidRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetIdentityByDidRequest;
    static equals(a: GetIdentityByDidRequest | PlainMessage<GetIdentityByDidRequest> | undefined, b: GetIdentityByDidRequest | PlainMessage<GetIdentityByDidRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetIdentityByDidResponse
 */
export declare class GetIdentityByDidResponse extends Message<GetIdentityByDidResponse> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: bytes keys = 3;
     */
    keys: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: bytes services = 4;
     */
    services: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: google.protobuf.Timestamp updated = 5;
     */
    updated?: Timestamp;
    constructor(data?: PartialMessage<GetIdentityByDidResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetIdentityByDidResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetIdentityByDidResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetIdentityByDidResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetIdentityByDidResponse;
    static equals(a: GetIdentityByDidResponse | PlainMessage<GetIdentityByDidResponse> | undefined, b: GetIdentityByDidResponse | PlainMessage<GetIdentityByDidResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetIdentityByHandleRequest
 */
export declare class GetIdentityByHandleRequest extends Message<GetIdentityByHandleRequest> {
    /**
     * @generated from field: string handle = 1;
     */
    handle: string;
    constructor(data?: PartialMessage<GetIdentityByHandleRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetIdentityByHandleRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetIdentityByHandleRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetIdentityByHandleRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetIdentityByHandleRequest;
    static equals(a: GetIdentityByHandleRequest | PlainMessage<GetIdentityByHandleRequest> | undefined, b: GetIdentityByHandleRequest | PlainMessage<GetIdentityByHandleRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetIdentityByHandleResponse
 */
export declare class GetIdentityByHandleResponse extends Message<GetIdentityByHandleResponse> {
    /**
     * @generated from field: string handle = 1;
     */
    handle: string;
    /**
     * @generated from field: string did = 2;
     */
    did: string;
    /**
     * @generated from field: bytes keys = 3;
     */
    keys: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: bytes services = 4;
     */
    services: Uint8Array<ArrayBuffer>;
    /**
     * @generated from field: google.protobuf.Timestamp updated = 5;
     */
    updated?: Timestamp;
    constructor(data?: PartialMessage<GetIdentityByHandleResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetIdentityByHandleResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetIdentityByHandleResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetIdentityByHandleResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetIdentityByHandleResponse;
    static equals(a: GetIdentityByHandleResponse | PlainMessage<GetIdentityByHandleResponse> | undefined, b: GetIdentityByHandleResponse | PlainMessage<GetIdentityByHandleResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlobTakedownRequest
 */
export declare class GetBlobTakedownRequest extends Message<GetBlobTakedownRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    constructor(data?: PartialMessage<GetBlobTakedownRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlobTakedownRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlobTakedownRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlobTakedownRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlobTakedownRequest;
    static equals(a: GetBlobTakedownRequest | PlainMessage<GetBlobTakedownRequest> | undefined, b: GetBlobTakedownRequest | PlainMessage<GetBlobTakedownRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBlobTakedownResponse
 */
export declare class GetBlobTakedownResponse extends Message<GetBlobTakedownResponse> {
    /**
     * @generated from field: bool taken_down = 1;
     */
    takenDown: boolean;
    /**
     * @generated from field: string takedown_ref = 2;
     */
    takedownRef: string;
    constructor(data?: PartialMessage<GetBlobTakedownResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBlobTakedownResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBlobTakedownResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBlobTakedownResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBlobTakedownResponse;
    static equals(a: GetBlobTakedownResponse | PlainMessage<GetBlobTakedownResponse> | undefined, b: GetBlobTakedownResponse | PlainMessage<GetBlobTakedownResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorTakedownRequest
 */
export declare class GetActorTakedownRequest extends Message<GetActorTakedownRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    constructor(data?: PartialMessage<GetActorTakedownRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorTakedownRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorTakedownRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorTakedownRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorTakedownRequest;
    static equals(a: GetActorTakedownRequest | PlainMessage<GetActorTakedownRequest> | undefined, b: GetActorTakedownRequest | PlainMessage<GetActorTakedownRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorTakedownResponse
 */
export declare class GetActorTakedownResponse extends Message<GetActorTakedownResponse> {
    /**
     * @generated from field: bool taken_down = 1;
     */
    takenDown: boolean;
    /**
     * @generated from field: string takedown_ref = 2;
     */
    takedownRef: string;
    constructor(data?: PartialMessage<GetActorTakedownResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorTakedownResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorTakedownResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorTakedownResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorTakedownResponse;
    static equals(a: GetActorTakedownResponse | PlainMessage<GetActorTakedownResponse> | undefined, b: GetActorTakedownResponse | PlainMessage<GetActorTakedownResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRecordTakedownRequest
 */
export declare class GetRecordTakedownRequest extends Message<GetRecordTakedownRequest> {
    /**
     * @generated from field: string record_uri = 1;
     */
    recordUri: string;
    constructor(data?: PartialMessage<GetRecordTakedownRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRecordTakedownRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRecordTakedownRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRecordTakedownRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRecordTakedownRequest;
    static equals(a: GetRecordTakedownRequest | PlainMessage<GetRecordTakedownRequest> | undefined, b: GetRecordTakedownRequest | PlainMessage<GetRecordTakedownRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetRecordTakedownResponse
 */
export declare class GetRecordTakedownResponse extends Message<GetRecordTakedownResponse> {
    /**
     * @generated from field: bool taken_down = 1;
     */
    takenDown: boolean;
    /**
     * @generated from field: string takedown_ref = 2;
     */
    takedownRef: string;
    constructor(data?: PartialMessage<GetRecordTakedownResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetRecordTakedownResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetRecordTakedownResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetRecordTakedownResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetRecordTakedownResponse;
    static equals(a: GetRecordTakedownResponse | PlainMessage<GetRecordTakedownResponse> | undefined, b: GetRecordTakedownResponse | PlainMessage<GetRecordTakedownResponse> | undefined): boolean;
}
/**
 *
 * Bookmarks
 *
 *
 * @generated from message bsky.Bookmark
 */
export declare class Bookmark extends Message<Bookmark> {
    /**
     * @generated from field: bsky.StashRef ref = 1;
     */
    ref?: StashRef;
    /**
     * @generated from field: string subject_uri = 2;
     */
    subjectUri: string;
    /**
     * @generated from field: string subject_cid = 3;
     */
    subjectCid: string;
    /**
     * @generated from field: google.protobuf.Timestamp indexed_at = 4;
     */
    indexedAt?: Timestamp;
    constructor(data?: PartialMessage<Bookmark>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.Bookmark";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Bookmark;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Bookmark;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Bookmark;
    static equals(a: Bookmark | PlainMessage<Bookmark> | undefined, b: Bookmark | PlainMessage<Bookmark> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBookmarksByActorAndSubjectsRequest
 */
export declare class GetBookmarksByActorAndSubjectsRequest extends Message<GetBookmarksByActorAndSubjectsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string uris = 2;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetBookmarksByActorAndSubjectsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBookmarksByActorAndSubjectsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBookmarksByActorAndSubjectsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBookmarksByActorAndSubjectsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBookmarksByActorAndSubjectsRequest;
    static equals(a: GetBookmarksByActorAndSubjectsRequest | PlainMessage<GetBookmarksByActorAndSubjectsRequest> | undefined, b: GetBookmarksByActorAndSubjectsRequest | PlainMessage<GetBookmarksByActorAndSubjectsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetBookmarksByActorAndSubjectsResponse
 */
export declare class GetBookmarksByActorAndSubjectsResponse extends Message<GetBookmarksByActorAndSubjectsResponse> {
    /**
     * @generated from field: repeated bsky.Bookmark bookmarks = 1;
     */
    bookmarks: Bookmark[];
    constructor(data?: PartialMessage<GetBookmarksByActorAndSubjectsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetBookmarksByActorAndSubjectsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetBookmarksByActorAndSubjectsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetBookmarksByActorAndSubjectsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetBookmarksByActorAndSubjectsResponse;
    static equals(a: GetBookmarksByActorAndSubjectsResponse | PlainMessage<GetBookmarksByActorAndSubjectsResponse> | undefined, b: GetBookmarksByActorAndSubjectsResponse | PlainMessage<GetBookmarksByActorAndSubjectsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorBookmarksRequest
 */
export declare class GetActorBookmarksRequest extends Message<GetActorBookmarksRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorBookmarksRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorBookmarksRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorBookmarksRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorBookmarksRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorBookmarksRequest;
    static equals(a: GetActorBookmarksRequest | PlainMessage<GetActorBookmarksRequest> | undefined, b: GetActorBookmarksRequest | PlainMessage<GetActorBookmarksRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.BookmarkInfo
 */
export declare class BookmarkInfo extends Message<BookmarkInfo> {
    /**
     * stash key
     *
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: string subject = 2;
     */
    subject: string;
    constructor(data?: PartialMessage<BookmarkInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.BookmarkInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BookmarkInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BookmarkInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BookmarkInfo;
    static equals(a: BookmarkInfo | PlainMessage<BookmarkInfo> | undefined, b: BookmarkInfo | PlainMessage<BookmarkInfo> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorBookmarksResponse
 */
export declare class GetActorBookmarksResponse extends Message<GetActorBookmarksResponse> {
    /**
     * @generated from field: repeated bsky.BookmarkInfo bookmarks = 1;
     */
    bookmarks: BookmarkInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorBookmarksResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorBookmarksResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorBookmarksResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorBookmarksResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorBookmarksResponse;
    static equals(a: GetActorBookmarksResponse | PlainMessage<GetActorBookmarksResponse> | undefined, b: GetActorBookmarksResponse | PlainMessage<GetActorBookmarksResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorDraftsRequest
 */
export declare class GetActorDraftsRequest extends Message<GetActorDraftsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorDraftsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorDraftsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorDraftsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorDraftsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorDraftsRequest;
    static equals(a: GetActorDraftsRequest | PlainMessage<GetActorDraftsRequest> | undefined, b: GetActorDraftsRequest | PlainMessage<GetActorDraftsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.DraftInfo
 */
export declare class DraftInfo extends Message<DraftInfo> {
    /**
     * stash key
     *
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 2;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 3;
     */
    updatedAt?: Timestamp;
    /**
     * @generated from field: bytes payload = 4;
     */
    payload: Uint8Array<ArrayBuffer>;
    constructor(data?: PartialMessage<DraftInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DraftInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DraftInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DraftInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DraftInfo;
    static equals(a: DraftInfo | PlainMessage<DraftInfo> | undefined, b: DraftInfo | PlainMessage<DraftInfo> | undefined): boolean;
}
/**
 * @generated from message bsky.GetActorDraftsResponse
 */
export declare class GetActorDraftsResponse extends Message<GetActorDraftsResponse> {
    /**
     * @generated from field: repeated bsky.DraftInfo drafts = 1;
     */
    drafts: DraftInfo[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetActorDraftsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetActorDraftsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetActorDraftsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetActorDraftsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetActorDraftsResponse;
    static equals(a: GetActorDraftsResponse | PlainMessage<GetActorDraftsResponse> | undefined, b: GetActorDraftsResponse | PlainMessage<GetActorDraftsResponse> | undefined): boolean;
}
/**
 * GetFollowsFollowing gets the list of DIDs that the actor follows that also follow the targets
 *
 * @generated from message bsky.GetFollowsFollowingRequest
 */
export declare class GetFollowsFollowingRequest extends Message<GetFollowsFollowingRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: repeated string target_dids = 2;
     */
    targetDids: string[];
    constructor(data?: PartialMessage<GetFollowsFollowingRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowsFollowingRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowsFollowingRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowsFollowingRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowsFollowingRequest;
    static equals(a: GetFollowsFollowingRequest | PlainMessage<GetFollowsFollowingRequest> | undefined, b: GetFollowsFollowingRequest | PlainMessage<GetFollowsFollowingRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.FollowsFollowing
 */
export declare class FollowsFollowing extends Message<FollowsFollowing> {
    /**
     * @generated from field: string target_did = 1;
     */
    targetDid: string;
    /**
     * @generated from field: repeated string dids = 2;
     */
    dids: string[];
    constructor(data?: PartialMessage<FollowsFollowing>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.FollowsFollowing";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FollowsFollowing;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FollowsFollowing;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FollowsFollowing;
    static equals(a: FollowsFollowing | PlainMessage<FollowsFollowing> | undefined, b: FollowsFollowing | PlainMessage<FollowsFollowing> | undefined): boolean;
}
/**
 * @generated from message bsky.GetFollowsFollowingResponse
 */
export declare class GetFollowsFollowingResponse extends Message<GetFollowsFollowingResponse> {
    /**
     * @generated from field: repeated bsky.FollowsFollowing results = 1;
     */
    results: FollowsFollowing[];
    constructor(data?: PartialMessage<GetFollowsFollowingResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetFollowsFollowingResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetFollowsFollowingResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetFollowsFollowingResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetFollowsFollowingResponse;
    static equals(a: GetFollowsFollowingResponse | PlainMessage<GetFollowsFollowingResponse> | undefined, b: GetFollowsFollowingResponse | PlainMessage<GetFollowsFollowingResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSitemapIndexRequest
 */
export declare class GetSitemapIndexRequest extends Message<GetSitemapIndexRequest> {
    /**
     * @generated from field: bsky.SitemapPageType type = 1;
     */
    type: SitemapPageType;
    constructor(data?: PartialMessage<GetSitemapIndexRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSitemapIndexRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSitemapIndexRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSitemapIndexRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSitemapIndexRequest;
    static equals(a: GetSitemapIndexRequest | PlainMessage<GetSitemapIndexRequest> | undefined, b: GetSitemapIndexRequest | PlainMessage<GetSitemapIndexRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSitemapIndexResponse
 */
export declare class GetSitemapIndexResponse extends Message<GetSitemapIndexResponse> {
    /**
     * GZIP compressed XML sitemap
     *
     * @generated from field: bytes sitemap = 1;
     */
    sitemap: Uint8Array<ArrayBuffer>;
    constructor(data?: PartialMessage<GetSitemapIndexResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSitemapIndexResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSitemapIndexResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSitemapIndexResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSitemapIndexResponse;
    static equals(a: GetSitemapIndexResponse | PlainMessage<GetSitemapIndexResponse> | undefined, b: GetSitemapIndexResponse | PlainMessage<GetSitemapIndexResponse> | undefined): boolean;
}
/**
 * Sitemap HTTP paths are typically of the form `/type/yyyy-mm-dd/N.xml.gz`, i.e. `/users/2025-01-01/1.xml.gz`
 *
 * @generated from message bsky.GetSitemapPageRequest
 */
export declare class GetSitemapPageRequest extends Message<GetSitemapPageRequest> {
    /**
     * @generated from field: bsky.SitemapPageType type = 1;
     */
    type: SitemapPageType;
    /**
     * @generated from field: google.protobuf.Timestamp date = 2;
     */
    date?: Timestamp;
    /**
     * One-indexed
     *
     * @generated from field: int32 bucket = 3;
     */
    bucket: number;
    constructor(data?: PartialMessage<GetSitemapPageRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSitemapPageRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSitemapPageRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSitemapPageRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSitemapPageRequest;
    static equals(a: GetSitemapPageRequest | PlainMessage<GetSitemapPageRequest> | undefined, b: GetSitemapPageRequest | PlainMessage<GetSitemapPageRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetSitemapPageResponse
 */
export declare class GetSitemapPageResponse extends Message<GetSitemapPageResponse> {
    /**
     * GZIP compressed XML sitemap
     *
     * @generated from field: bytes sitemap = 1;
     */
    sitemap: Uint8Array<ArrayBuffer>;
    constructor(data?: PartialMessage<GetSitemapPageResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetSitemapPageResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSitemapPageResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSitemapPageResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSitemapPageResponse;
    static equals(a: GetSitemapPageResponse | PlainMessage<GetSitemapPageResponse> | undefined, b: GetSitemapPageResponse | PlainMessage<GetSitemapPageResponse> | undefined): boolean;
}
/**
 * Ping
 *
 * @generated from message bsky.PingRequest
 */
export declare class PingRequest extends Message<PingRequest> {
    constructor(data?: PartialMessage<PingRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PingRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingRequest;
    static equals(a: PingRequest | PlainMessage<PingRequest> | undefined, b: PingRequest | PlainMessage<PingRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.PingResponse
 */
export declare class PingResponse extends Message<PingResponse> {
    constructor(data?: PartialMessage<PingResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PingResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingResponse;
    static equals(a: PingResponse | PlainMessage<PingResponse> | undefined, b: PingResponse | PlainMessage<PingResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.StashRef
 */
export declare class StashRef extends Message<StashRef> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string namespace = 2;
     */
    namespace: string;
    /**
     * @generated from field: string key = 3;
     */
    key: string;
    constructor(data?: PartialMessage<StashRef>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.StashRef";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StashRef;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StashRef;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StashRef;
    static equals(a: StashRef | PlainMessage<StashRef> | undefined, b: StashRef | PlainMessage<StashRef> | undefined): boolean;
}
/**
 * - Returns recent para posts authored by a given DID, paginated
 *     - `com.para.feed.getAuthorFeed`
 *
 * @generated from message bsky.GetParaAuthorFeedRequest
 */
export declare class GetParaAuthorFeedRequest extends Message<GetParaAuthorFeedRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaAuthorFeedRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaAuthorFeedRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaAuthorFeedRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaAuthorFeedRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaAuthorFeedRequest;
    static equals(a: GetParaAuthorFeedRequest | PlainMessage<GetParaAuthorFeedRequest> | undefined, b: GetParaAuthorFeedRequest | PlainMessage<GetParaAuthorFeedRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaAuthorFeedItem
 */
export declare class ParaAuthorFeedItem extends Message<ParaAuthorFeedItem> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string author = 3;
     */
    author: string;
    /**
     * @generated from field: string text = 4;
     */
    text: string;
    /**
     * @generated from field: string created_at = 5;
     */
    createdAt: string;
    /**
     * @generated from field: optional string reply_root = 6;
     */
    replyRoot?: string;
    /**
     * @generated from field: optional string reply_parent = 7;
     */
    replyParent?: string;
    /**
     * @generated from field: repeated string langs = 8;
     */
    langs: string[];
    /**
     * @generated from field: repeated string tags = 9;
     */
    tags: string[];
    /**
     * @generated from field: repeated string flairs = 10;
     */
    flairs: string[];
    /**
     * @generated from field: optional string post_type = 11;
     */
    postType?: string;
    constructor(data?: PartialMessage<ParaAuthorFeedItem>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaAuthorFeedItem";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaAuthorFeedItem;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaAuthorFeedItem;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaAuthorFeedItem;
    static equals(a: ParaAuthorFeedItem | PlainMessage<ParaAuthorFeedItem> | undefined, b: ParaAuthorFeedItem | PlainMessage<ParaAuthorFeedItem> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaAuthorFeedResponse
 */
export declare class GetParaAuthorFeedResponse extends Message<GetParaAuthorFeedResponse> {
    /**
     * @generated from field: repeated bsky.ParaAuthorFeedItem items = 1;
     */
    items: ParaAuthorFeedItem[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaAuthorFeedResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaAuthorFeedResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaAuthorFeedResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaAuthorFeedResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaAuthorFeedResponse;
    static equals(a: GetParaAuthorFeedResponse | PlainMessage<GetParaAuthorFeedResponse> | undefined, b: GetParaAuthorFeedResponse | PlainMessage<GetParaAuthorFeedResponse> | undefined): boolean;
}
/**
 * - Returns recent para posts authored by followed users and self, paginated
 *     - `com.para.feed.getTimeline`
 *
 * @generated from message bsky.GetParaTimelineRequest
 */
export declare class GetParaTimelineRequest extends Message<GetParaTimelineRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaTimelineRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaTimelineRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaTimelineRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaTimelineRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaTimelineRequest;
    static equals(a: GetParaTimelineRequest | PlainMessage<GetParaTimelineRequest> | undefined, b: GetParaTimelineRequest | PlainMessage<GetParaTimelineRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaTimelineResponse
 */
export declare class GetParaTimelineResponse extends Message<GetParaTimelineResponse> {
    /**
     * @generated from field: repeated bsky.ParaAuthorFeedItem items = 1;
     */
    items: ParaAuthorFeedItem[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaTimelineResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaTimelineResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaTimelineResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaTimelineResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaTimelineResponse;
    static equals(a: GetParaTimelineResponse | PlainMessage<GetParaTimelineResponse> | undefined, b: GetParaTimelineResponse | PlainMessage<GetParaTimelineResponse> | undefined): boolean;
}
/**
 * - Returns para posts for a specific set of uris
 *     - `com.para.feed.getPosts`
 *
 * @generated from message bsky.GetParaPostsRequest
 */
export declare class GetParaPostsRequest extends Message<GetParaPostsRequest> {
    /**
     * @generated from field: repeated string uris = 1;
     */
    uris: string[];
    constructor(data?: PartialMessage<GetParaPostsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPostsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPostsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPostsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPostsRequest;
    static equals(a: GetParaPostsRequest | PlainMessage<GetParaPostsRequest> | undefined, b: GetParaPostsRequest | PlainMessage<GetParaPostsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaPostsResponse
 */
export declare class GetParaPostsResponse extends Message<GetParaPostsResponse> {
    /**
     * @generated from field: repeated bsky.ParaAuthorFeedItem items = 1;
     */
    items: ParaAuthorFeedItem[];
    constructor(data?: PartialMessage<GetParaPostsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPostsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPostsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPostsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPostsResponse;
    static equals(a: GetParaPostsResponse | PlainMessage<GetParaPostsResponse> | undefined, b: GetParaPostsResponse | PlainMessage<GetParaPostsResponse> | undefined): boolean;
}
/**
 * - Returns a para thread around a given post uri
 *     - `com.para.feed.getPostThread`
 *
 * @generated from message bsky.GetParaThreadRequest
 */
export declare class GetParaThreadRequest extends Message<GetParaThreadRequest> {
    /**
     * @generated from field: string post_uri = 1;
     */
    postUri: string;
    /**
     * @generated from field: int32 above = 2;
     */
    above: number;
    /**
     * @generated from field: int32 below = 3;
     */
    below: number;
    constructor(data?: PartialMessage<GetParaThreadRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaThreadRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaThreadRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaThreadRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaThreadRequest;
    static equals(a: GetParaThreadRequest | PlainMessage<GetParaThreadRequest> | undefined, b: GetParaThreadRequest | PlainMessage<GetParaThreadRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaThreadResponse
 */
export declare class GetParaThreadResponse extends Message<GetParaThreadResponse> {
    /**
     * @generated from field: optional bsky.ParaAuthorFeedItem post = 1;
     */
    post?: ParaAuthorFeedItem;
    /**
     * @generated from field: repeated bsky.ParaAuthorFeedItem parents = 2;
     */
    parents: ParaAuthorFeedItem[];
    /**
     * @generated from field: repeated bsky.ParaAuthorFeedItem replies = 3;
     */
    replies: ParaAuthorFeedItem[];
    constructor(data?: PartialMessage<GetParaThreadResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaThreadResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaThreadResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaThreadResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaThreadResponse;
    static equals(a: GetParaThreadResponse | PlainMessage<GetParaThreadResponse> | undefined, b: GetParaThreadResponse | PlainMessage<GetParaThreadResponse> | undefined): boolean;
}
/**
 * - Returns Para social metadata for a specific post uri
 *     - `com.para.social.getPostMeta`
 *
 * @generated from message bsky.GetParaPostMetaRequest
 */
export declare class GetParaPostMetaRequest extends Message<GetParaPostMetaRequest> {
    /**
     * @generated from field: string post_uri = 1;
     */
    postUri: string;
    constructor(data?: PartialMessage<GetParaPostMetaRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPostMetaRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPostMetaRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPostMetaRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPostMetaRequest;
    static equals(a: GetParaPostMetaRequest | PlainMessage<GetParaPostMetaRequest> | undefined, b: GetParaPostMetaRequest | PlainMessage<GetParaPostMetaRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaPostMeta
 */
export declare class ParaPostMeta extends Message<ParaPostMeta> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string author = 2;
     */
    author: string;
    /**
     * @generated from field: optional string post_type = 3;
     */
    postType?: string;
    /**
     * @generated from field: optional bool official = 4;
     */
    official?: boolean;
    /**
     * @generated from field: optional string party = 5;
     */
    party?: string;
    /**
     * @generated from field: optional string community = 6;
     */
    community?: string;
    /**
     * @generated from field: optional string category = 7;
     */
    category?: string;
    /**
     * @generated from field: repeated string tags = 8;
     */
    tags: string[];
    /**
     * @generated from field: repeated string flairs = 9;
     */
    flairs: string[];
    /**
     * @generated from field: int32 vote_score = 10;
     */
    voteScore: number;
    /**
     * @generated from field: string interaction_mode = 11;
     */
    interactionMode: string;
    /**
     * @generated from field: string created_at = 12;
     */
    createdAt: string;
    constructor(data?: PartialMessage<ParaPostMeta>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaPostMeta";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaPostMeta;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaPostMeta;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaPostMeta;
    static equals(a: ParaPostMeta | PlainMessage<ParaPostMeta> | undefined, b: ParaPostMeta | PlainMessage<ParaPostMeta> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaPostMetaResponse
 */
export declare class GetParaPostMetaResponse extends Message<GetParaPostMetaResponse> {
    /**
     * @generated from field: optional bsky.ParaPostMeta post = 1;
     */
    post?: ParaPostMeta;
    constructor(data?: PartialMessage<GetParaPostMetaResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPostMetaResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPostMetaResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPostMetaResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPostMetaResponse;
    static equals(a: GetParaPostMetaResponse | PlainMessage<GetParaPostMetaResponse> | undefined, b: GetParaPostMetaResponse | PlainMessage<GetParaPostMetaResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaPolicyTallyRequest
 */
export declare class GetParaPolicyTallyRequest extends Message<GetParaPolicyTallyRequest> {
    /**
     * @generated from field: string post_uri = 1;
     */
    postUri: string;
    constructor(data?: PartialMessage<GetParaPolicyTallyRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPolicyTallyRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPolicyTallyRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPolicyTallyRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPolicyTallyRequest;
    static equals(a: GetParaPolicyTallyRequest | PlainMessage<GetParaPolicyTallyRequest> | undefined, b: GetParaPolicyTallyRequest | PlainMessage<GetParaPolicyTallyRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaPolicySignalBucket
 */
export declare class ParaPolicySignalBucket extends Message<ParaPolicySignalBucket> {
    /**
     * @generated from field: int32 signal = 1;
     */
    signal: number;
    /**
     * @generated from field: int32 count = 2;
     */
    count: number;
    constructor(data?: PartialMessage<ParaPolicySignalBucket>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaPolicySignalBucket";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaPolicySignalBucket;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaPolicySignalBucket;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaPolicySignalBucket;
    static equals(a: ParaPolicySignalBucket | PlainMessage<ParaPolicySignalBucket> | undefined, b: ParaPolicySignalBucket | PlainMessage<ParaPolicySignalBucket> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaPolicyTally
 */
export declare class ParaPolicyTally extends Message<ParaPolicyTally> {
    /**
     * @generated from field: string subject = 1;
     */
    subject: string;
    /**
     * @generated from field: string subject_type = 2;
     */
    subjectType: string;
    /**
     * @generated from field: string community = 3;
     */
    community: string;
    /**
     * @generated from field: int32 vote_count = 4;
     */
    voteCount: number;
    /**
     * @generated from field: int32 direct_vote_count = 5;
     */
    directVoteCount: number;
    /**
     * @generated from field: int32 delegated_vote_count = 6;
     */
    delegatedVoteCount: number;
    /**
     * @generated from field: int32 signal_sum = 7;
     */
    signalSum: number;
    /**
     * @generated from field: double signal_average = 8;
     */
    signalAverage: number;
    /**
     * @generated from field: int32 eligible_voter_count = 9;
     */
    eligibleVoterCount: number;
    /**
     * @generated from field: int32 quorum_target = 10;
     */
    quorumTarget: number;
    /**
     * @generated from field: bool quorum_met = 11;
     */
    quorumMet: boolean;
    /**
     * @generated from field: bool official = 12;
     */
    official: boolean;
    /**
     * @generated from field: bool certified = 13;
     */
    certified: boolean;
    /**
     * @generated from field: string outcome = 14;
     */
    outcome: string;
    /**
     * @generated from field: string state = 15;
     */
    state: string;
    /**
     * @generated from field: repeated bsky.ParaPolicySignalBucket breakdown = 16;
     */
    breakdown: ParaPolicySignalBucket[];
    /**
     * @generated from field: string computed_at = 17;
     */
    computedAt: string;
    constructor(data?: PartialMessage<ParaPolicyTally>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaPolicyTally";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaPolicyTally;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaPolicyTally;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaPolicyTally;
    static equals(a: ParaPolicyTally | PlainMessage<ParaPolicyTally> | undefined, b: ParaPolicyTally | PlainMessage<ParaPolicyTally> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaPolicyTallyResponse
 */
export declare class GetParaPolicyTallyResponse extends Message<GetParaPolicyTallyResponse> {
    /**
     * @generated from field: optional bsky.ParaPolicyTally tally = 1;
     */
    tally?: ParaPolicyTally;
    constructor(data?: PartialMessage<GetParaPolicyTallyResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaPolicyTallyResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaPolicyTallyResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaPolicyTallyResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaPolicyTallyResponse;
    static equals(a: GetParaPolicyTallyResponse | PlainMessage<GetParaPolicyTallyResponse> | undefined, b: GetParaPolicyTallyResponse | PlainMessage<GetParaPolicyTallyResponse> | undefined): boolean;
}
/**
 * - Returns para profile stats and current para status for an actor
 *     - `com.para.actor.getProfileStats`
 *
 * @generated from message bsky.GetParaProfileStatsRequest
 */
export declare class GetParaProfileStatsRequest extends Message<GetParaProfileStatsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    constructor(data?: PartialMessage<GetParaProfileStatsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaProfileStatsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaProfileStatsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaProfileStatsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaProfileStatsRequest;
    static equals(a: GetParaProfileStatsRequest | PlainMessage<GetParaProfileStatsRequest> | undefined, b: GetParaProfileStatsRequest | PlainMessage<GetParaProfileStatsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaContributions
 */
export declare class ParaContributions extends Message<ParaContributions> {
    /**
     * @generated from field: int32 policies = 1;
     */
    policies: number;
    /**
     * @generated from field: int32 matters = 2;
     */
    matters: number;
    /**
     * @generated from field: int32 comments = 3;
     */
    comments: number;
    constructor(data?: PartialMessage<ParaContributions>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaContributions";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaContributions;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaContributions;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaContributions;
    static equals(a: ParaContributions | PlainMessage<ParaContributions> | undefined, b: ParaContributions | PlainMessage<ParaContributions> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaProfileStats
 */
export declare class ParaProfileStats extends Message<ParaProfileStats> {
    /**
     * @generated from field: int32 influence = 1;
     */
    influence: number;
    /**
     * @generated from field: int32 votes_received_all_time = 2;
     */
    votesReceivedAllTime: number;
    /**
     * @generated from field: int32 votes_cast_all_time = 3;
     */
    votesCastAllTime: number;
    /**
     * @generated from field: bsky.ParaContributions contributions = 4;
     */
    contributions?: ParaContributions;
    /**
     * @generated from field: repeated string active_in = 5;
     */
    activeIn: string[];
    /**
     * @generated from field: string computed_at = 6;
     */
    computedAt: string;
    constructor(data?: PartialMessage<ParaProfileStats>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaProfileStats";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaProfileStats;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaProfileStats;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaProfileStats;
    static equals(a: ParaProfileStats | PlainMessage<ParaProfileStats> | undefined, b: ParaProfileStats | PlainMessage<ParaProfileStats> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaStatusView
 */
export declare class ParaStatusView extends Message<ParaStatusView> {
    /**
     * @generated from field: string status = 1;
     */
    status: string;
    /**
     * @generated from field: optional string party = 2;
     */
    party?: string;
    /**
     * @generated from field: optional string community = 3;
     */
    community?: string;
    /**
     * @generated from field: string created_at = 4;
     */
    createdAt: string;
    constructor(data?: PartialMessage<ParaStatusView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaStatusView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaStatusView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaStatusView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaStatusView;
    static equals(a: ParaStatusView | PlainMessage<ParaStatusView> | undefined, b: ParaStatusView | PlainMessage<ParaStatusView> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaProfileStatsResponse
 */
export declare class GetParaProfileStatsResponse extends Message<GetParaProfileStatsResponse> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: bsky.ParaProfileStats stats = 2;
     */
    stats?: ParaProfileStats;
    /**
     * @generated from field: optional bsky.ParaStatusView status = 3;
     */
    status?: ParaStatusView;
    constructor(data?: PartialMessage<GetParaProfileStatsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaProfileStatsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaProfileStatsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaProfileStatsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaProfileStatsResponse;
    static equals(a: GetParaProfileStatsResponse | PlainMessage<GetParaProfileStatsResponse> | undefined, b: GetParaProfileStatsResponse | PlainMessage<GetParaProfileStatsResponse> | undefined): boolean;
}
/**
 * - Returns governance-oriented community roster and summary
 *     - `com.para.community.getGovernance`
 *
 * @generated from message bsky.GetParaCommunityGovernanceRequest
 */
export declare class GetParaCommunityGovernanceRequest extends Message<GetParaCommunityGovernanceRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    constructor(data?: PartialMessage<GetParaCommunityGovernanceRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityGovernanceRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityGovernanceRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityGovernanceRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityGovernanceRequest;
    static equals(a: GetParaCommunityGovernanceRequest | PlainMessage<GetParaCommunityGovernanceRequest> | undefined, b: GetParaCommunityGovernanceRequest | PlainMessage<GetParaCommunityGovernanceRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunitySummary
 */
export declare class ParaCommunitySummary extends Message<ParaCommunitySummary> {
    /**
     * @generated from field: int32 members = 1;
     */
    members: number;
    /**
     * @generated from field: int32 visible_posters = 2;
     */
    visiblePosters: number;
    /**
     * @generated from field: int32 policy_posts = 3;
     */
    policyPosts: number;
    /**
     * @generated from field: int32 matter_posts = 4;
     */
    matterPosts: number;
    /**
     * @generated from field: int32 badge_holders = 5;
     */
    badgeHolders: number;
    constructor(data?: PartialMessage<ParaCommunitySummary>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunitySummary";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunitySummary;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunitySummary;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunitySummary;
    static equals(a: ParaCommunitySummary | PlainMessage<ParaCommunitySummary> | undefined, b: ParaCommunitySummary | PlainMessage<ParaCommunitySummary> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityMember
 */
export declare class ParaCommunityMember extends Message<ParaCommunityMember> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: optional string handle = 2;
     */
    handle?: string;
    /**
     * @generated from field: optional string display_name = 3;
     */
    displayName?: string;
    /**
     * @generated from field: optional string avatar = 4;
     */
    avatar?: string;
    /**
     * @generated from field: optional string party = 5;
     */
    party?: string;
    /**
     * @generated from field: int32 influence = 6;
     */
    influence: number;
    /**
     * @generated from field: int32 votes_received_all_time = 7;
     */
    votesReceivedAllTime: number;
    /**
     * @generated from field: int32 votes_cast_all_time = 8;
     */
    votesCastAllTime: number;
    /**
     * @generated from field: int32 policy_posts = 9;
     */
    policyPosts: number;
    /**
     * @generated from field: int32 matter_posts = 10;
     */
    matterPosts: number;
    constructor(data?: PartialMessage<ParaCommunityMember>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityMember";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityMember;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityMember;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityMember;
    static equals(a: ParaCommunityMember | PlainMessage<ParaCommunityMember> | undefined, b: ParaCommunityMember | PlainMessage<ParaCommunityMember> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityModerator
 */
export declare class ParaCommunityModerator extends Message<ParaCommunityModerator> {
    /**
     * @generated from field: bsky.ParaCommunityMember member = 1;
     */
    member?: ParaCommunityMember;
    /**
     * @generated from field: string role = 2;
     */
    role: string;
    /**
     * @generated from field: string badge = 3;
     */
    badge: string;
    constructor(data?: PartialMessage<ParaCommunityModerator>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityModerator";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityModerator;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityModerator;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityModerator;
    static equals(a: ParaCommunityModerator | PlainMessage<ParaCommunityModerator> | undefined, b: ParaCommunityModerator | PlainMessage<ParaCommunityModerator> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityOfficial
 */
export declare class ParaCommunityOfficial extends Message<ParaCommunityOfficial> {
    /**
     * @generated from field: bsky.ParaCommunityMember member = 1;
     */
    member?: ParaCommunityMember;
    /**
     * @generated from field: string office = 2;
     */
    office: string;
    /**
     * @generated from field: string mandate = 3;
     */
    mandate: string;
    constructor(data?: PartialMessage<ParaCommunityOfficial>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityOfficial";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityOfficial;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityOfficial;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityOfficial;
    static equals(a: ParaCommunityOfficial | PlainMessage<ParaCommunityOfficial> | undefined, b: ParaCommunityOfficial | PlainMessage<ParaCommunityOfficial> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityDeputyRole
 */
export declare class ParaCommunityDeputyRole extends Message<ParaCommunityDeputyRole> {
    /**
     * @generated from field: string tier = 1;
     */
    tier: string;
    /**
     * @generated from field: string role = 2;
     */
    role: string;
    /**
     * @generated from field: bsky.ParaCommunityMember active_holder = 3;
     */
    activeHolder?: ParaCommunityMember;
    /**
     * @generated from field: int32 votes_backing_role = 4;
     */
    votesBackingRole: number;
    /**
     * @generated from field: repeated string applicants = 5;
     */
    applicants: string[];
    constructor(data?: PartialMessage<ParaCommunityDeputyRole>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityDeputyRole";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityDeputyRole;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityDeputyRole;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityDeputyRole;
    static equals(a: ParaCommunityDeputyRole | PlainMessage<ParaCommunityDeputyRole> | undefined, b: ParaCommunityDeputyRole | PlainMessage<ParaCommunityDeputyRole> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityGovernanceMetadata
 */
export declare class ParaCommunityGovernanceMetadata extends Message<ParaCommunityGovernanceMetadata> {
    /**
     * @generated from field: int32 term_length_days = 1;
     */
    termLengthDays: number;
    /**
     * @generated from field: string review_cadence = 2;
     */
    reviewCadence: string;
    /**
     * @generated from field: string escalation_path = 3;
     */
    escalationPath: string;
    /**
     * @generated from field: string public_contact = 4;
     */
    publicContact: string;
    /**
     * @generated from field: string last_published_at = 5;
     */
    lastPublishedAt: string;
    /**
     * @generated from field: string state = 6;
     */
    state: string;
    /**
     * @generated from field: repeated string matter_flair_ids = 7;
     */
    matterFlairIds: string[];
    /**
     * @generated from field: repeated string policy_flair_ids = 8;
     */
    policyFlairIds: string[];
    constructor(data?: PartialMessage<ParaCommunityGovernanceMetadata>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityGovernanceMetadata";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityGovernanceMetadata;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceMetadata;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceMetadata;
    static equals(a: ParaCommunityGovernanceMetadata | PlainMessage<ParaCommunityGovernanceMetadata> | undefined, b: ParaCommunityGovernanceMetadata | PlainMessage<ParaCommunityGovernanceMetadata> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityGovernanceHistoryEntry
 */
export declare class ParaCommunityGovernanceHistoryEntry extends Message<ParaCommunityGovernanceHistoryEntry> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string action = 2;
     */
    action: string;
    /**
     * @generated from field: string actor_did = 3;
     */
    actorDid: string;
    /**
     * @generated from field: string actor_handle = 4;
     */
    actorHandle: string;
    /**
     * @generated from field: string created_at = 5;
     */
    createdAt: string;
    /**
     * @generated from field: string summary = 6;
     */
    summary: string;
    constructor(data?: PartialMessage<ParaCommunityGovernanceHistoryEntry>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityGovernanceHistoryEntry";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityGovernanceHistoryEntry;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceHistoryEntry;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceHistoryEntry;
    static equals(a: ParaCommunityGovernanceHistoryEntry | PlainMessage<ParaCommunityGovernanceHistoryEntry> | undefined, b: ParaCommunityGovernanceHistoryEntry | PlainMessage<ParaCommunityGovernanceHistoryEntry> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityGovernanceResponse
 */
export declare class GetParaCommunityGovernanceResponse extends Message<GetParaCommunityGovernanceResponse> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: bsky.ParaCommunitySummary summary = 2;
     */
    summary?: ParaCommunitySummary;
    /**
     * @generated from field: repeated bsky.ParaCommunityModerator moderators = 3;
     */
    moderators: ParaCommunityModerator[];
    /**
     * @generated from field: repeated bsky.ParaCommunityOfficial officials = 4;
     */
    officials: ParaCommunityOfficial[];
    /**
     * @generated from field: repeated bsky.ParaCommunityDeputyRole deputies = 5;
     */
    deputies: ParaCommunityDeputyRole[];
    /**
     * @generated from field: string computed_at = 6;
     */
    computedAt: string;
    /**
     * @generated from field: bsky.ParaCommunityGovernanceMetadata metadata = 7;
     */
    metadata?: ParaCommunityGovernanceMetadata;
    /**
     * @generated from field: repeated bsky.ParaCommunityGovernanceHistoryEntry edit_history = 8;
     */
    editHistory: ParaCommunityGovernanceHistoryEntry[];
    constructor(data?: PartialMessage<GetParaCommunityGovernanceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityGovernanceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityGovernanceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityGovernanceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityGovernanceResponse;
    static equals(a: GetParaCommunityGovernanceResponse | PlainMessage<GetParaCommunityGovernanceResponse> | undefined, b: GetParaCommunityGovernanceResponse | PlainMessage<GetParaCommunityGovernanceResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityBoardRequest
 */
export declare class GetParaCommunityBoardRequest extends Message<GetParaCommunityBoardRequest> {
    /**
     * @generated from field: string community_id = 1;
     */
    communityId: string;
    /**
     * @generated from field: string uri = 2;
     */
    uri: string;
    /**
     * @generated from field: string viewer_did = 3;
     */
    viewerDid: string;
    constructor(data?: PartialMessage<GetParaCommunityBoardRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityBoardRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityBoardRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityBoardRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityBoardRequest;
    static equals(a: GetParaCommunityBoardRequest | PlainMessage<GetParaCommunityBoardRequest> | undefined, b: GetParaCommunityBoardRequest | PlainMessage<GetParaCommunityBoardRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityBoardView
 */
export declare class ParaCommunityBoardView extends Message<ParaCommunityBoardView> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string creator_did = 3;
     */
    creatorDid: string;
    /**
     * @generated from field: string creator_handle = 4;
     */
    creatorHandle: string;
    /**
     * @generated from field: string creator_display_name = 5;
     */
    creatorDisplayName: string;
    /**
     * @generated from field: string community_id = 6;
     */
    communityId: string;
    /**
     * @generated from field: string slug = 7;
     */
    slug: string;
    /**
     * @generated from field: string name = 8;
     */
    name: string;
    /**
     * @generated from field: string description = 9;
     */
    description: string;
    /**
     * @generated from field: string quadrant = 10;
     */
    quadrant: string;
    /**
     * @generated from field: string delegates_chat_id = 11;
     */
    delegatesChatId: string;
    /**
     * @generated from field: string subdelegates_chat_id = 12;
     */
    subdelegatesChatId: string;
    /**
     * @generated from field: int32 member_count = 13;
     */
    memberCount: number;
    /**
     * @generated from field: string viewer_membership_state = 14;
     */
    viewerMembershipState: string;
    /**
     * @generated from field: repeated string viewer_roles = 15;
     */
    viewerRoles: string[];
    /**
     * @generated from field: string created_at = 16;
     */
    createdAt: string;
    /**
     * @generated from field: string status = 17;
     */
    status: string;
    /**
     * @generated from field: bsky.ParaCommunityGovernanceSummary governance_summary = 18;
     */
    governanceSummary?: ParaCommunityGovernanceSummary;
    constructor(data?: PartialMessage<ParaCommunityBoardView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityBoardView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityBoardView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityBoardView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityBoardView;
    static equals(a: ParaCommunityBoardView | PlainMessage<ParaCommunityBoardView> | undefined, b: ParaCommunityBoardView | PlainMessage<ParaCommunityBoardView> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityGovernanceSummary
 */
export declare class ParaCommunityGovernanceSummary extends Message<ParaCommunityGovernanceSummary> {
    /**
     * @generated from field: int32 moderator_count = 1;
     */
    moderatorCount: number;
    /**
     * @generated from field: int32 official_count = 2;
     */
    officialCount: number;
    /**
     * @generated from field: int32 deputy_role_count = 3;
     */
    deputyRoleCount: number;
    /**
     * @generated from field: string last_published_at = 4;
     */
    lastPublishedAt: string;
    constructor(data?: PartialMessage<ParaCommunityGovernanceSummary>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityGovernanceSummary";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityGovernanceSummary;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceSummary;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityGovernanceSummary;
    static equals(a: ParaCommunityGovernanceSummary | PlainMessage<ParaCommunityGovernanceSummary> | undefined, b: ParaCommunityGovernanceSummary | PlainMessage<ParaCommunityGovernanceSummary> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityBoardResponse
 */
export declare class GetParaCommunityBoardResponse extends Message<GetParaCommunityBoardResponse> {
    /**
     * @generated from field: bsky.ParaCommunityBoardView board = 1;
     */
    board?: ParaCommunityBoardView;
    /**
     * @generated from field: bsky.ParaCommunityGovernanceSummary governance_summary = 2;
     */
    governanceSummary?: ParaCommunityGovernanceSummary;
    constructor(data?: PartialMessage<GetParaCommunityBoardResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityBoardResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityBoardResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityBoardResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityBoardResponse;
    static equals(a: GetParaCommunityBoardResponse | PlainMessage<GetParaCommunityBoardResponse> | undefined, b: GetParaCommunityBoardResponse | PlainMessage<GetParaCommunityBoardResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityBoardsRequest
 */
export declare class GetParaCommunityBoardsRequest extends Message<GetParaCommunityBoardsRequest> {
    /**
     * @generated from field: string viewer_did = 1;
     */
    viewerDid: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string query = 3;
     */
    query: string;
    /**
     * @generated from field: string state = 4;
     */
    state: string;
    /**
     * @generated from field: string participation_kind = 5;
     */
    participationKind: string;
    /**
     * @generated from field: string flair_id = 6;
     */
    flairId: string;
    /**
     * @generated from field: string sort = 7;
     */
    sort: string;
    /**
     * @generated from field: string cursor = 8;
     */
    cursor: string;
    /**
     * @generated from field: optional string quadrant = 9;
     */
    quadrant?: string;
    constructor(data?: PartialMessage<GetParaCommunityBoardsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityBoardsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityBoardsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityBoardsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityBoardsRequest;
    static equals(a: GetParaCommunityBoardsRequest | PlainMessage<GetParaCommunityBoardsRequest> | undefined, b: GetParaCommunityBoardsRequest | PlainMessage<GetParaCommunityBoardsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityBoardsResponse
 */
export declare class GetParaCommunityBoardsResponse extends Message<GetParaCommunityBoardsResponse> {
    /**
     * @generated from field: repeated bsky.ParaCommunityBoardView boards = 1;
     */
    boards: ParaCommunityBoardView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaCommunityBoardsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityBoardsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityBoardsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityBoardsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityBoardsResponse;
    static equals(a: GetParaCommunityBoardsResponse | PlainMessage<GetParaCommunityBoardsResponse> | undefined, b: GetParaCommunityBoardsResponse | PlainMessage<GetParaCommunityBoardsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityMembersRequest
 */
export declare class GetParaCommunityMembersRequest extends Message<GetParaCommunityMembersRequest> {
    /**
     * @generated from field: string community_id = 1;
     */
    communityId: string;
    /**
     * @generated from field: string membership_state = 2;
     */
    membershipState: string;
    /**
     * @generated from field: string role = 3;
     */
    role: string;
    /**
     * @generated from field: string sort = 4;
     */
    sort: string;
    /**
     * @generated from field: int32 limit = 5;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 6;
     */
    cursor: string;
    /**
     * @generated from field: string viewer_did = 7;
     */
    viewerDid: string;
    /**
     * @generated from field: bool viewer_is_admin = 8;
     */
    viewerIsAdmin: boolean;
    constructor(data?: PartialMessage<GetParaCommunityMembersRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityMembersRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityMembersRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityMembersRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityMembersRequest;
    static equals(a: GetParaCommunityMembersRequest | PlainMessage<GetParaCommunityMembersRequest> | undefined, b: GetParaCommunityMembersRequest | PlainMessage<GetParaCommunityMembersRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCommunityMemberView
 */
export declare class ParaCommunityMemberView extends Message<ParaCommunityMemberView> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * @generated from field: string avatar = 4;
     */
    avatar: string;
    /**
     * @generated from field: string membership_state = 5;
     */
    membershipState: string;
    /**
     * @generated from field: repeated string roles = 6;
     */
    roles: string[];
    /**
     * @generated from field: string joined_at = 7;
     */
    joinedAt: string;
    /**
     * @generated from field: int32 votes_cast = 8;
     */
    votesCast: number;
    /**
     * @generated from field: int32 delegations_received = 9;
     */
    delegationsReceived: number;
    /**
     * @generated from field: int32 policy_posts = 10;
     */
    policyPosts: number;
    /**
     * @generated from field: int32 matter_posts = 11;
     */
    matterPosts: number;
    constructor(data?: PartialMessage<ParaCommunityMemberView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCommunityMemberView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCommunityMemberView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCommunityMemberView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCommunityMemberView;
    static equals(a: ParaCommunityMemberView | PlainMessage<ParaCommunityMemberView> | undefined, b: ParaCommunityMemberView | PlainMessage<ParaCommunityMemberView> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCommunityMembersResponse
 */
export declare class GetParaCommunityMembersResponse extends Message<GetParaCommunityMembersResponse> {
    /**
     * @generated from field: repeated bsky.ParaCommunityMemberView members = 1;
     */
    members: ParaCommunityMemberView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaCommunityMembersResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCommunityMembersResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCommunityMembersResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCommunityMembersResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCommunityMembersResponse;
    static equals(a: GetParaCommunityMembersResponse | PlainMessage<GetParaCommunityMembersResponse> | undefined, b: GetParaCommunityMembersResponse | PlainMessage<GetParaCommunityMembersResponse> | undefined): boolean;
}
/**
 * - Returns indexed Cabildeos and aggregate summaries, paginated
 *     - `com.para.civic.listCabildeos`
 *
 * @generated from message bsky.GetParaCabildeosRequest
 */
export declare class GetParaCabildeosRequest extends Message<GetParaCabildeosRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string phase = 2;
     */
    phase: string;
    /**
     * @generated from field: int32 limit = 3;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 4;
     */
    cursor: string;
    /**
     * @generated from field: string viewer_did = 5;
     */
    viewerDid: string;
    constructor(data?: PartialMessage<GetParaCabildeosRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeosRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeosRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeosRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeosRequest;
    static equals(a: GetParaCabildeosRequest | PlainMessage<GetParaCabildeosRequest> | undefined, b: GetParaCabildeosRequest | PlainMessage<GetParaCabildeosRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoOption
 */
export declare class ParaCabildeoOption extends Message<ParaCabildeoOption> {
    /**
     * @generated from field: string label = 1;
     */
    label: string;
    /**
     * @generated from field: string description = 2;
     */
    description: string;
    /**
     * @generated from field: bool is_consensus = 3;
     */
    isConsensus: boolean;
    constructor(data?: PartialMessage<ParaCabildeoOption>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoOption";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoOption;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoOption;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoOption;
    static equals(a: ParaCabildeoOption | PlainMessage<ParaCabildeoOption> | undefined, b: ParaCabildeoOption | PlainMessage<ParaCabildeoOption> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoOptionSummary
 */
export declare class ParaCabildeoOptionSummary extends Message<ParaCabildeoOptionSummary> {
    /**
     * @generated from field: int32 option_index = 1;
     */
    optionIndex: number;
    /**
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * @generated from field: int32 votes = 3;
     */
    votes: number;
    /**
     * @generated from field: int32 positions = 4;
     */
    positions: number;
    constructor(data?: PartialMessage<ParaCabildeoOptionSummary>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoOptionSummary";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoOptionSummary;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoOptionSummary;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoOptionSummary;
    static equals(a: ParaCabildeoOptionSummary | PlainMessage<ParaCabildeoOptionSummary> | undefined, b: ParaCabildeoOptionSummary | PlainMessage<ParaCabildeoOptionSummary> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoPositionCounts
 */
export declare class ParaCabildeoPositionCounts extends Message<ParaCabildeoPositionCounts> {
    /**
     * @generated from field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from field: int32 for_count = 2;
     */
    forCount: number;
    /**
     * @generated from field: int32 against_count = 3;
     */
    againstCount: number;
    /**
     * @generated from field: int32 amendment_count = 4;
     */
    amendmentCount: number;
    /**
     * @generated from field: repeated bsky.ParaCabildeoOptionSummary by_option = 5;
     */
    byOption: ParaCabildeoOptionSummary[];
    constructor(data?: PartialMessage<ParaCabildeoPositionCounts>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoPositionCounts";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoPositionCounts;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoPositionCounts;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoPositionCounts;
    static equals(a: ParaCabildeoPositionCounts | PlainMessage<ParaCabildeoPositionCounts> | undefined, b: ParaCabildeoPositionCounts | PlainMessage<ParaCabildeoPositionCounts> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoVoteTotals
 */
export declare class ParaCabildeoVoteTotals extends Message<ParaCabildeoVoteTotals> {
    /**
     * @generated from field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from field: int32 direct = 2;
     */
    direct: number;
    /**
     * @generated from field: int32 delegated = 3;
     */
    delegated: number;
    constructor(data?: PartialMessage<ParaCabildeoVoteTotals>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoVoteTotals";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoVoteTotals;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoVoteTotals;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoVoteTotals;
    static equals(a: ParaCabildeoVoteTotals | PlainMessage<ParaCabildeoVoteTotals> | undefined, b: ParaCabildeoVoteTotals | PlainMessage<ParaCabildeoVoteTotals> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoOutcomeSummary
 */
export declare class ParaCabildeoOutcomeSummary extends Message<ParaCabildeoOutcomeSummary> {
    /**
     * @generated from field: optional int32 winning_option = 1;
     */
    winningOption?: number;
    /**
     * @generated from field: int32 total_participants = 2;
     */
    totalParticipants: number;
    /**
     * @generated from field: double effective_total_power = 3;
     */
    effectiveTotalPower: number;
    /**
     * @generated from field: bool tie = 4;
     */
    tie: boolean;
    /**
     * @generated from field: repeated bsky.ParaCabildeoOptionSummary breakdown = 5;
     */
    breakdown: ParaCabildeoOptionSummary[];
    constructor(data?: PartialMessage<ParaCabildeoOutcomeSummary>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoOutcomeSummary";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoOutcomeSummary;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoOutcomeSummary;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoOutcomeSummary;
    static equals(a: ParaCabildeoOutcomeSummary | PlainMessage<ParaCabildeoOutcomeSummary> | undefined, b: ParaCabildeoOutcomeSummary | PlainMessage<ParaCabildeoOutcomeSummary> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoViewerContext
 */
export declare class ParaCabildeoViewerContext extends Message<ParaCabildeoViewerContext> {
    /**
     * @generated from field: optional int32 current_vote_option = 1;
     */
    currentVoteOption?: number;
    /**
     * @generated from field: bool current_vote_is_direct = 2;
     */
    currentVoteIsDirect: boolean;
    /**
     * @generated from field: string active_delegation = 3;
     */
    activeDelegation: string;
    /**
     * @generated from field: bool delegate_has_voted = 4;
     */
    delegateHasVoted: boolean;
    /**
     * @generated from field: optional int32 delegated_vote_option = 5;
     */
    delegatedVoteOption?: number;
    /**
     * @generated from field: string delegated_voted_at = 6;
     */
    delegatedVotedAt: string;
    /**
     * @generated from field: string grace_period_ends_at = 7;
     */
    gracePeriodEndsAt: string;
    /**
     * @generated from field: bool delegate_vote_dismissed = 8;
     */
    delegateVoteDismissed: boolean;
    constructor(data?: PartialMessage<ParaCabildeoViewerContext>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoViewerContext";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoViewerContext;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoViewerContext;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoViewerContext;
    static equals(a: ParaCabildeoViewerContext | PlainMessage<ParaCabildeoViewerContext> | undefined, b: ParaCabildeoViewerContext | PlainMessage<ParaCabildeoViewerContext> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoLiveSession
 */
export declare class ParaCabildeoLiveSession extends Message<ParaCabildeoLiveSession> {
    /**
     * @generated from field: bool is_live = 1;
     */
    isLive: boolean;
    /**
     * @generated from field: string host_did = 2;
     */
    hostDid: string;
    /**
     * @generated from field: int32 active_participant_count = 3;
     */
    activeParticipantCount: number;
    /**
     * @generated from field: string started_at = 4;
     */
    startedAt: string;
    /**
     * @generated from field: repeated string participant_preview_dids = 5;
     */
    participantPreviewDids: string[];
    constructor(data?: PartialMessage<ParaCabildeoLiveSession>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoLiveSession";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoLiveSession;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoLiveSession;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoLiveSession;
    static equals(a: ParaCabildeoLiveSession | PlainMessage<ParaCabildeoLiveSession> | undefined, b: ParaCabildeoLiveSession | PlainMessage<ParaCabildeoLiveSession> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoLive
 */
export declare class ParaCabildeoLive extends Message<ParaCabildeoLive> {
    /**
     * @generated from field: string cabildeo_uri = 1;
     */
    cabildeoUri: string;
    /**
     * @generated from field: string community = 2;
     */
    community: string;
    /**
     * @generated from field: string phase = 3;
     */
    phase: string;
    /**
     * @generated from field: string expires_at = 4;
     */
    expiresAt: string;
    /**
     * @generated from field: string live_uri = 5;
     */
    liveUri: string;
    constructor(data?: PartialMessage<ParaCabildeoLive>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoLive";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoLive;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoLive;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoLive;
    static equals(a: ParaCabildeoLive | PlainMessage<ParaCabildeoLive> | undefined, b: ParaCabildeoLive | PlainMessage<ParaCabildeoLive> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoView
 */
export declare class ParaCabildeoView extends Message<ParaCabildeoView> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string creator = 3;
     */
    creator: string;
    /**
     * @generated from field: string indexed_at = 4;
     */
    indexedAt: string;
    /**
     * @generated from field: string title = 5;
     */
    title: string;
    /**
     * @generated from field: string description = 6;
     */
    description: string;
    /**
     * @generated from field: string community = 7;
     */
    community: string;
    /**
     * @generated from field: repeated string communities = 8;
     */
    communities: string[];
    /**
     * @generated from field: repeated string flairs = 9;
     */
    flairs: string[];
    /**
     * @generated from field: string region = 10;
     */
    region: string;
    /**
     * @generated from field: bool geo_restricted = 11;
     */
    geoRestricted: boolean;
    /**
     * @generated from field: repeated bsky.ParaCabildeoOption options = 12;
     */
    options: ParaCabildeoOption[];
    /**
     * @generated from field: optional int32 min_quorum = 13;
     */
    minQuorum?: number;
    /**
     * @generated from field: string phase = 14;
     */
    phase: string;
    /**
     * @generated from field: string phase_deadline = 15;
     */
    phaseDeadline: string;
    /**
     * @generated from field: string created_at = 16;
     */
    createdAt: string;
    /**
     * @generated from field: repeated bsky.ParaCabildeoOptionSummary option_summary = 17;
     */
    optionSummary: ParaCabildeoOptionSummary[];
    /**
     * @generated from field: bsky.ParaCabildeoPositionCounts position_counts = 18;
     */
    positionCounts?: ParaCabildeoPositionCounts;
    /**
     * @generated from field: bsky.ParaCabildeoVoteTotals vote_totals = 19;
     */
    voteTotals?: ParaCabildeoVoteTotals;
    /**
     * @generated from field: optional bsky.ParaCabildeoOutcomeSummary outcome_summary = 20;
     */
    outcomeSummary?: ParaCabildeoOutcomeSummary;
    /**
     * @generated from field: optional bsky.ParaCabildeoViewerContext viewer_context = 21;
     */
    viewerContext?: ParaCabildeoViewerContext;
    /**
     * @generated from field: optional bsky.ParaCabildeoLiveSession live_session = 22;
     */
    liveSession?: ParaCabildeoLiveSession;
    constructor(data?: PartialMessage<ParaCabildeoView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoView;
    static equals(a: ParaCabildeoView | PlainMessage<ParaCabildeoView> | undefined, b: ParaCabildeoView | PlainMessage<ParaCabildeoView> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCabildeosResponse
 */
export declare class GetParaCabildeosResponse extends Message<GetParaCabildeosResponse> {
    /**
     * @generated from field: repeated bsky.ParaCabildeoView items = 1;
     */
    items: ParaCabildeoView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaCabildeosResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeosResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeosResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeosResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeosResponse;
    static equals(a: GetParaCabildeosResponse | PlainMessage<GetParaCabildeosResponse> | undefined, b: GetParaCabildeosResponse | PlainMessage<GetParaCabildeosResponse> | undefined): boolean;
}
/**
 * - Returns a single indexed Cabildeo and aggregate summaries
 *     - `com.para.civic.getCabildeo`
 *
 * @generated from message bsky.GetParaCabildeoRequest
 */
export declare class GetParaCabildeoRequest extends Message<GetParaCabildeoRequest> {
    /**
     * @generated from field: string cabildeo_uri = 1;
     */
    cabildeoUri: string;
    /**
     * @generated from field: string viewer_did = 2;
     */
    viewerDid: string;
    constructor(data?: PartialMessage<GetParaCabildeoRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeoRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeoRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeoRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeoRequest;
    static equals(a: GetParaCabildeoRequest | PlainMessage<GetParaCabildeoRequest> | undefined, b: GetParaCabildeoRequest | PlainMessage<GetParaCabildeoRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCabildeoResponse
 */
export declare class GetParaCabildeoResponse extends Message<GetParaCabildeoResponse> {
    /**
     * @generated from field: optional bsky.ParaCabildeoView cabildeo = 1;
     */
    cabildeo?: ParaCabildeoView;
    constructor(data?: PartialMessage<GetParaCabildeoResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeoResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeoResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeoResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeoResponse;
    static equals(a: GetParaCabildeoResponse | PlainMessage<GetParaCabildeoResponse> | undefined, b: GetParaCabildeoResponse | PlainMessage<GetParaCabildeoResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaCabildeoPositionView
 */
export declare class ParaCabildeoPositionView extends Message<ParaCabildeoPositionView> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string creator = 3;
     */
    creator: string;
    /**
     * @generated from field: string indexed_at = 4;
     */
    indexedAt: string;
    /**
     * @generated from field: string cabildeo = 5;
     */
    cabildeo: string;
    /**
     * @generated from field: string stance = 6;
     */
    stance: string;
    /**
     * @generated from field: optional int32 option_index = 7;
     */
    optionIndex?: number;
    /**
     * @generated from field: string text = 8;
     */
    text: string;
    /**
     * @generated from field: string compass_quadrant = 9;
     */
    compassQuadrant: string;
    /**
     * @generated from field: string created_at = 10;
     */
    createdAt: string;
    constructor(data?: PartialMessage<ParaCabildeoPositionView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaCabildeoPositionView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaCabildeoPositionView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaCabildeoPositionView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaCabildeoPositionView;
    static equals(a: ParaCabildeoPositionView | PlainMessage<ParaCabildeoPositionView> | undefined, b: ParaCabildeoPositionView | PlainMessage<ParaCabildeoPositionView> | undefined): boolean;
}
/**
 * - Returns indexed positions for a Cabildeo, paginated
 *     - `com.para.civic.listCabildeoPositions`
 *
 * @generated from message bsky.GetParaCabildeoPositionsRequest
 */
export declare class GetParaCabildeoPositionsRequest extends Message<GetParaCabildeoPositionsRequest> {
    /**
     * @generated from field: string cabildeo_uri = 1;
     */
    cabildeoUri: string;
    /**
     * @generated from field: string stance = 2;
     */
    stance: string;
    /**
     * @generated from field: int32 limit = 3;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 4;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaCabildeoPositionsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeoPositionsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeoPositionsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeoPositionsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeoPositionsRequest;
    static equals(a: GetParaCabildeoPositionsRequest | PlainMessage<GetParaCabildeoPositionsRequest> | undefined, b: GetParaCabildeoPositionsRequest | PlainMessage<GetParaCabildeoPositionsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaCabildeoPositionsResponse
 */
export declare class GetParaCabildeoPositionsResponse extends Message<GetParaCabildeoPositionsResponse> {
    /**
     * @generated from field: repeated bsky.ParaCabildeoPositionView positions = 1;
     */
    positions: ParaCabildeoPositionView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaCabildeoPositionsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaCabildeoPositionsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaCabildeoPositionsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaCabildeoPositionsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaCabildeoPositionsResponse;
    static equals(a: GetParaCabildeoPositionsResponse | PlainMessage<GetParaCabildeoPositionsResponse> | undefined, b: GetParaCabildeoPositionsResponse | PlainMessage<GetParaCabildeoPositionsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaDelegationCandidatesRequest
 */
export declare class GetParaDelegationCandidatesRequest extends Message<GetParaDelegationCandidatesRequest> {
    /**
     * @generated from field: string cabildeo_uri = 1;
     */
    cabildeoUri: string;
    /**
     * @generated from field: string community_id = 2;
     */
    communityId: string;
    /**
     * @generated from field: int32 limit = 3;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 4;
     */
    cursor: string;
    /**
     * @generated from field: string viewer_did = 5;
     */
    viewerDid: string;
    /**
     * @generated from field: bool viewer_is_admin = 6;
     */
    viewerIsAdmin: boolean;
    constructor(data?: PartialMessage<GetParaDelegationCandidatesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDelegationCandidatesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDelegationCandidatesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDelegationCandidatesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDelegationCandidatesRequest;
    static equals(a: GetParaDelegationCandidatesRequest | PlainMessage<GetParaDelegationCandidatesRequest> | undefined, b: GetParaDelegationCandidatesRequest | PlainMessage<GetParaDelegationCandidatesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaDelegationCandidateView
 */
export declare class ParaDelegationCandidateView extends Message<ParaDelegationCandidateView> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * @generated from field: string avatar = 4;
     */
    avatar: string;
    /**
     * @generated from field: string description = 5;
     */
    description: string;
    /**
     * @generated from field: repeated string roles = 6;
     */
    roles: string[];
    /**
     * @generated from field: int32 active_delegation_count = 7;
     */
    activeDelegationCount: number;
    /**
     * @generated from field: bool has_voted = 8;
     */
    hasVoted: boolean;
    /**
     * @generated from field: string voted_at = 9;
     */
    votedAt: string;
    /**
     * @generated from field: optional int32 selected_option = 10;
     */
    selectedOption?: number;
    constructor(data?: PartialMessage<ParaDelegationCandidateView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaDelegationCandidateView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaDelegationCandidateView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaDelegationCandidateView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaDelegationCandidateView;
    static equals(a: ParaDelegationCandidateView | PlainMessage<ParaDelegationCandidateView> | undefined, b: ParaDelegationCandidateView | PlainMessage<ParaDelegationCandidateView> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaDelegationCandidatesResponse
 */
export declare class GetParaDelegationCandidatesResponse extends Message<GetParaDelegationCandidatesResponse> {
    /**
     * @generated from field: repeated bsky.ParaDelegationCandidateView candidates = 1;
     */
    candidates: ParaDelegationCandidateView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaDelegationCandidatesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDelegationCandidatesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDelegationCandidatesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDelegationCandidatesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDelegationCandidatesResponse;
    static equals(a: GetParaDelegationCandidatesResponse | PlainMessage<GetParaDelegationCandidatesResponse> | undefined, b: GetParaDelegationCandidatesResponse | PlainMessage<GetParaDelegationCandidatesResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.PutParaCabildeoLivePresenceRequest
 */
export declare class PutParaCabildeoLivePresenceRequest extends Message<PutParaCabildeoLivePresenceRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string cabildeo_uri = 2;
     */
    cabildeoUri: string;
    /**
     * @generated from field: string session_id = 3;
     */
    sessionId: string;
    /**
     * @generated from field: bool present = 4;
     */
    present: boolean;
    /**
     * @generated from field: string host_live_uri = 5;
     */
    hostLiveUri: string;
    constructor(data?: PartialMessage<PutParaCabildeoLivePresenceRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PutParaCabildeoLivePresenceRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutParaCabildeoLivePresenceRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutParaCabildeoLivePresenceRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutParaCabildeoLivePresenceRequest;
    static equals(a: PutParaCabildeoLivePresenceRequest | PlainMessage<PutParaCabildeoLivePresenceRequest> | undefined, b: PutParaCabildeoLivePresenceRequest | PlainMessage<PutParaCabildeoLivePresenceRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.PutParaCabildeoLivePresenceResponse
 */
export declare class PutParaCabildeoLivePresenceResponse extends Message<PutParaCabildeoLivePresenceResponse> {
    /**
     * @generated from field: string cabildeo_uri = 1;
     */
    cabildeoUri: string;
    /**
     * @generated from field: bool present = 2;
     */
    present: boolean;
    /**
     * @generated from field: string expires_at = 3;
     */
    expiresAt: string;
    constructor(data?: PartialMessage<PutParaCabildeoLivePresenceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.PutParaCabildeoLivePresenceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutParaCabildeoLivePresenceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutParaCabildeoLivePresenceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutParaCabildeoLivePresenceResponse;
    static equals(a: PutParaCabildeoLivePresenceResponse | PlainMessage<PutParaCabildeoLivePresenceResponse> | undefined, b: PutParaCabildeoLivePresenceResponse | PlainMessage<PutParaCabildeoLivePresenceResponse> | undefined): boolean;
}
/**
 * - Returns indexed public highlights, paginated
 *     - `com.para.highlight.listHighlights`
 *
 * @generated from message bsky.GetParaHighlightsRequest
 */
export declare class GetParaHighlightsRequest extends Message<GetParaHighlightsRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string state = 2;
     */
    state: string;
    /**
     * @generated from field: string subject_uri = 3;
     */
    subjectUri: string;
    /**
     * @generated from field: string creator = 4;
     */
    creator: string;
    /**
     * @generated from field: int32 limit = 5;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 6;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaHighlightsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaHighlightsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaHighlightsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaHighlightsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaHighlightsRequest;
    static equals(a: GetParaHighlightsRequest | PlainMessage<GetParaHighlightsRequest> | undefined, b: GetParaHighlightsRequest | PlainMessage<GetParaHighlightsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaHighlightView
 */
export declare class ParaHighlightView extends Message<ParaHighlightView> {
    /**
     * @generated from field: string uri = 1;
     */
    uri: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string creator = 3;
     */
    creator: string;
    /**
     * @generated from field: string indexed_at = 4;
     */
    indexedAt: string;
    /**
     * @generated from field: string subject_uri = 5;
     */
    subjectUri: string;
    /**
     * @generated from field: string subject_cid = 6;
     */
    subjectCid: string;
    /**
     * @generated from field: string text = 7;
     */
    text: string;
    /**
     * @generated from field: int32 start = 8;
     */
    start: number;
    /**
     * @generated from field: int32 end = 9;
     */
    end: number;
    /**
     * @generated from field: string color = 10;
     */
    color: string;
    /**
     * @generated from field: string tag = 11;
     */
    tag: string;
    /**
     * @generated from field: string community = 12;
     */
    community: string;
    /**
     * @generated from field: string state = 13;
     */
    state: string;
    /**
     * @generated from field: string party = 14;
     */
    party: string;
    /**
     * @generated from field: string visibility = 15;
     */
    visibility: string;
    /**
     * @generated from field: string created_at = 16;
     */
    createdAt: string;
    constructor(data?: PartialMessage<ParaHighlightView>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaHighlightView";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaHighlightView;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaHighlightView;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaHighlightView;
    static equals(a: ParaHighlightView | PlainMessage<ParaHighlightView> | undefined, b: ParaHighlightView | PlainMessage<ParaHighlightView> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaHighlightsResponse
 */
export declare class GetParaHighlightsResponse extends Message<GetParaHighlightsResponse> {
    /**
     * @generated from field: repeated bsky.ParaHighlightView items = 1;
     */
    items: ParaHighlightView[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetParaHighlightsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaHighlightsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaHighlightsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaHighlightsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaHighlightsResponse;
    static equals(a: GetParaHighlightsResponse | PlainMessage<GetParaHighlightsResponse> | undefined, b: GetParaHighlightsResponse | PlainMessage<GetParaHighlightsResponse> | undefined): boolean;
}
/**
 * - Returns a single indexed highlight annotation
 *     - `com.para.highlight.getHighlight`
 *
 * @generated from message bsky.GetParaHighlightRequest
 */
export declare class GetParaHighlightRequest extends Message<GetParaHighlightRequest> {
    /**
     * @generated from field: string highlight_uri = 1;
     */
    highlightUri: string;
    constructor(data?: PartialMessage<GetParaHighlightRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaHighlightRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaHighlightRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaHighlightRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaHighlightRequest;
    static equals(a: GetParaHighlightRequest | PlainMessage<GetParaHighlightRequest> | undefined, b: GetParaHighlightRequest | PlainMessage<GetParaHighlightRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaHighlightResponse
 */
export declare class GetParaHighlightResponse extends Message<GetParaHighlightResponse> {
    /**
     * @generated from field: optional bsky.ParaHighlightView highlight = 1;
     */
    highlight?: ParaHighlightView;
    constructor(data?: PartialMessage<GetParaHighlightResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaHighlightResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaHighlightResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaHighlightResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaHighlightResponse;
    static equals(a: GetParaHighlightResponse | PlainMessage<GetParaHighlightResponse> | undefined, b: GetParaHighlightResponse | PlainMessage<GetParaHighlightResponse> | undefined): boolean;
}
/**
 * - Returns aggregate discourse metrics for a community
 *     - `com.para.discourse.getSnapshot`
 *
 * @generated from message bsky.GetParaDiscourseSnapshotRequest
 */
export declare class GetParaDiscourseSnapshotRequest extends Message<GetParaDiscourseSnapshotRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string timeframe = 2;
     */
    timeframe: string;
    constructor(data?: PartialMessage<GetParaDiscourseSnapshotRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseSnapshotRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseSnapshotRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseSnapshotRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseSnapshotRequest;
    static equals(a: GetParaDiscourseSnapshotRequest | PlainMessage<GetParaDiscourseSnapshotRequest> | undefined, b: GetParaDiscourseSnapshotRequest | PlainMessage<GetParaDiscourseSnapshotRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaDiscourseSnapshot
 */
export declare class ParaDiscourseSnapshot extends Message<ParaDiscourseSnapshot> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string bucket = 2;
     */
    bucket: string;
    /**
     * @generated from field: int32 post_count = 3;
     */
    postCount: number;
    /**
     * @generated from field: int32 unique_authors = 4;
     */
    uniqueAuthors: number;
    /**
     * @generated from field: double avg_constructiveness = 5;
     */
    avgConstructiveness: number;
    /**
     * @generated from field: double semantic_volatility = 6;
     */
    semanticVolatility: number;
    /**
     * @generated from field: double lexical_diversity = 7;
     */
    lexicalDiversity: number;
    /**
     * @generated from field: double polarization_delta = 8;
     */
    polarizationDelta: number;
    /**
     * @generated from field: double echo_chamber_index = 9;
     */
    echoChamberIndex: number;
    /**
     * JSON string
     *
     * @generated from field: string top_keywords = 10;
     */
    topKeywords: string;
    /**
     * JSON string
     *
     * @generated from field: string sentiment_distribution = 11;
     */
    sentimentDistribution: string;
    constructor(data?: PartialMessage<ParaDiscourseSnapshot>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaDiscourseSnapshot";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaDiscourseSnapshot;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaDiscourseSnapshot;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaDiscourseSnapshot;
    static equals(a: ParaDiscourseSnapshot | PlainMessage<ParaDiscourseSnapshot> | undefined, b: ParaDiscourseSnapshot | PlainMessage<ParaDiscourseSnapshot> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaDiscourseSnapshotResponse
 */
export declare class GetParaDiscourseSnapshotResponse extends Message<GetParaDiscourseSnapshotResponse> {
    /**
     * @generated from field: repeated bsky.ParaDiscourseSnapshot snapshots = 1;
     */
    snapshots: ParaDiscourseSnapshot[];
    constructor(data?: PartialMessage<GetParaDiscourseSnapshotResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseSnapshotResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseSnapshotResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseSnapshotResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseSnapshotResponse;
    static equals(a: GetParaDiscourseSnapshotResponse | PlainMessage<GetParaDiscourseSnapshotResponse> | undefined, b: GetParaDiscourseSnapshotResponse | PlainMessage<GetParaDiscourseSnapshotResponse> | undefined): boolean;
}
/**
 * - Returns emergent topic clusters for a community
 *     - `com.para.discourse.getTopics`
 *
 * @generated from message bsky.GetParaDiscourseTopicsRequest
 */
export declare class GetParaDiscourseTopicsRequest extends Message<GetParaDiscourseTopicsRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string timeframe = 2;
     */
    timeframe: string;
    constructor(data?: PartialMessage<GetParaDiscourseTopicsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseTopicsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseTopicsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseTopicsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseTopicsRequest;
    static equals(a: GetParaDiscourseTopicsRequest | PlainMessage<GetParaDiscourseTopicsRequest> | undefined, b: GetParaDiscourseTopicsRequest | PlainMessage<GetParaDiscourseTopicsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaTopicCluster
 */
export declare class ParaTopicCluster extends Message<ParaTopicCluster> {
    /**
     * @generated from field: string cluster_label = 1;
     */
    clusterLabel: string;
    /**
     * JSON string
     *
     * @generated from field: string keywords = 2;
     */
    keywords: string;
    /**
     * @generated from field: int32 post_count = 3;
     */
    postCount: number;
    /**
     * @generated from field: int32 author_count = 4;
     */
    authorCount: number;
    /**
     * @generated from field: double avg_sentiment = 5;
     */
    avgSentiment: number;
    constructor(data?: PartialMessage<ParaTopicCluster>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaTopicCluster";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaTopicCluster;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaTopicCluster;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaTopicCluster;
    static equals(a: ParaTopicCluster | PlainMessage<ParaTopicCluster> | undefined, b: ParaTopicCluster | PlainMessage<ParaTopicCluster> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaDiscourseTopicsResponse
 */
export declare class GetParaDiscourseTopicsResponse extends Message<GetParaDiscourseTopicsResponse> {
    /**
     * @generated from field: repeated bsky.ParaTopicCluster topics = 1;
     */
    topics: ParaTopicCluster[];
    constructor(data?: PartialMessage<GetParaDiscourseTopicsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseTopicsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseTopicsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseTopicsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseTopicsResponse;
    static equals(a: GetParaDiscourseTopicsResponse | PlainMessage<GetParaDiscourseTopicsResponse> | undefined, b: GetParaDiscourseTopicsResponse | PlainMessage<GetParaDiscourseTopicsResponse> | undefined): boolean;
}
/**
 * - Returns the sentiment breakdown for a community
 *     - `com.para.discourse.getSentiment`
 *
 * @generated from message bsky.GetParaDiscourseSentimentRequest
 */
export declare class GetParaDiscourseSentimentRequest extends Message<GetParaDiscourseSentimentRequest> {
    /**
     * @generated from field: string community = 1;
     */
    community: string;
    /**
     * @generated from field: string timeframe = 2;
     */
    timeframe: string;
    constructor(data?: PartialMessage<GetParaDiscourseSentimentRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseSentimentRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseSentimentRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseSentimentRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseSentimentRequest;
    static equals(a: GetParaDiscourseSentimentRequest | PlainMessage<GetParaDiscourseSentimentRequest> | undefined, b: GetParaDiscourseSentimentRequest | PlainMessage<GetParaDiscourseSentimentRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ParaSentimentDistribution
 */
export declare class ParaSentimentDistribution extends Message<ParaSentimentDistribution> {
    /**
     * @generated from field: double anger = 1;
     */
    anger: number;
    /**
     * @generated from field: double fear = 2;
     */
    fear: number;
    /**
     * @generated from field: double trust = 3;
     */
    trust: number;
    /**
     * @generated from field: double uncertainty = 4;
     */
    uncertainty: number;
    /**
     * @generated from field: double neutral = 5;
     */
    neutral: number;
    constructor(data?: PartialMessage<ParaSentimentDistribution>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ParaSentimentDistribution";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ParaSentimentDistribution;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ParaSentimentDistribution;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ParaSentimentDistribution;
    static equals(a: ParaSentimentDistribution | PlainMessage<ParaSentimentDistribution> | undefined, b: ParaSentimentDistribution | PlainMessage<ParaSentimentDistribution> | undefined): boolean;
}
/**
 * @generated from message bsky.GetParaDiscourseSentimentResponse
 */
export declare class GetParaDiscourseSentimentResponse extends Message<GetParaDiscourseSentimentResponse> {
    /**
     * @generated from field: bsky.ParaSentimentDistribution sentiment = 1;
     */
    sentiment?: ParaSentimentDistribution;
    constructor(data?: PartialMessage<GetParaDiscourseSentimentResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.GetParaDiscourseSentimentResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetParaDiscourseSentimentResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetParaDiscourseSentimentResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetParaDiscourseSentimentResponse;
    static equals(a: GetParaDiscourseSentimentResponse | PlainMessage<GetParaDiscourseSentimentResponse> | undefined, b: GetParaDiscourseSentimentResponse | PlainMessage<GetParaDiscourseSentimentResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.UpdateActorUpstreamStatusRequest
 */
export declare class UpdateActorUpstreamStatusRequest extends Message<UpdateActorUpstreamStatusRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: bool active = 2;
     */
    active: boolean;
    /**
     * @generated from field: string upstream_status = 3;
     */
    upstreamStatus: string;
    constructor(data?: PartialMessage<UpdateActorUpstreamStatusRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UpdateActorUpstreamStatusRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateActorUpstreamStatusRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateActorUpstreamStatusRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateActorUpstreamStatusRequest;
    static equals(a: UpdateActorUpstreamStatusRequest | PlainMessage<UpdateActorUpstreamStatusRequest> | undefined, b: UpdateActorUpstreamStatusRequest | PlainMessage<UpdateActorUpstreamStatusRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.UpdateActorUpstreamStatusResponse
 */
export declare class UpdateActorUpstreamStatusResponse extends Message<UpdateActorUpstreamStatusResponse> {
    constructor(data?: PartialMessage<UpdateActorUpstreamStatusResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UpdateActorUpstreamStatusResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateActorUpstreamStatusResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateActorUpstreamStatusResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateActorUpstreamStatusResponse;
    static equals(a: UpdateActorUpstreamStatusResponse | PlainMessage<UpdateActorUpstreamStatusResponse> | undefined, b: UpdateActorUpstreamStatusResponse | PlainMessage<UpdateActorUpstreamStatusResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownActorRequest
 */
export declare class TakedownActorRequest extends Message<TakedownActorRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string ref = 2;
     */
    ref: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 3;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<TakedownActorRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownActorRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownActorRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownActorRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownActorRequest;
    static equals(a: TakedownActorRequest | PlainMessage<TakedownActorRequest> | undefined, b: TakedownActorRequest | PlainMessage<TakedownActorRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownActorResponse
 */
export declare class TakedownActorResponse extends Message<TakedownActorResponse> {
    constructor(data?: PartialMessage<TakedownActorResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownActorResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownActorResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownActorResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownActorResponse;
    static equals(a: TakedownActorResponse | PlainMessage<TakedownActorResponse> | undefined, b: TakedownActorResponse | PlainMessage<TakedownActorResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownActorRequest
 */
export declare class UntakedownActorRequest extends Message<UntakedownActorRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 2;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<UntakedownActorRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownActorRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownActorRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownActorRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownActorRequest;
    static equals(a: UntakedownActorRequest | PlainMessage<UntakedownActorRequest> | undefined, b: UntakedownActorRequest | PlainMessage<UntakedownActorRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownActorResponse
 */
export declare class UntakedownActorResponse extends Message<UntakedownActorResponse> {
    constructor(data?: PartialMessage<UntakedownActorResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownActorResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownActorResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownActorResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownActorResponse;
    static equals(a: UntakedownActorResponse | PlainMessage<UntakedownActorResponse> | undefined, b: UntakedownActorResponse | PlainMessage<UntakedownActorResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownBlobRequest
 */
export declare class TakedownBlobRequest extends Message<TakedownBlobRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: string ref = 3;
     */
    ref: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 4;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<TakedownBlobRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownBlobRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownBlobRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownBlobRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownBlobRequest;
    static equals(a: TakedownBlobRequest | PlainMessage<TakedownBlobRequest> | undefined, b: TakedownBlobRequest | PlainMessage<TakedownBlobRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownBlobResponse
 */
export declare class TakedownBlobResponse extends Message<TakedownBlobResponse> {
    constructor(data?: PartialMessage<TakedownBlobResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownBlobResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownBlobResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownBlobResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownBlobResponse;
    static equals(a: TakedownBlobResponse | PlainMessage<TakedownBlobResponse> | undefined, b: TakedownBlobResponse | PlainMessage<TakedownBlobResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownBlobRequest
 */
export declare class UntakedownBlobRequest extends Message<UntakedownBlobRequest> {
    /**
     * @generated from field: string did = 1;
     */
    did: string;
    /**
     * @generated from field: string cid = 2;
     */
    cid: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 3;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<UntakedownBlobRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownBlobRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownBlobRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownBlobRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownBlobRequest;
    static equals(a: UntakedownBlobRequest | PlainMessage<UntakedownBlobRequest> | undefined, b: UntakedownBlobRequest | PlainMessage<UntakedownBlobRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownBlobResponse
 */
export declare class UntakedownBlobResponse extends Message<UntakedownBlobResponse> {
    constructor(data?: PartialMessage<UntakedownBlobResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownBlobResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownBlobResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownBlobResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownBlobResponse;
    static equals(a: UntakedownBlobResponse | PlainMessage<UntakedownBlobResponse> | undefined, b: UntakedownBlobResponse | PlainMessage<UntakedownBlobResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownRecordRequest
 */
export declare class TakedownRecordRequest extends Message<TakedownRecordRequest> {
    /**
     * @generated from field: string record_uri = 1;
     */
    recordUri: string;
    /**
     * @generated from field: string ref = 2;
     */
    ref: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 3;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<TakedownRecordRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownRecordRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownRecordRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownRecordRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownRecordRequest;
    static equals(a: TakedownRecordRequest | PlainMessage<TakedownRecordRequest> | undefined, b: TakedownRecordRequest | PlainMessage<TakedownRecordRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.TakedownRecordResponse
 */
export declare class TakedownRecordResponse extends Message<TakedownRecordResponse> {
    constructor(data?: PartialMessage<TakedownRecordResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.TakedownRecordResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TakedownRecordResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TakedownRecordResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TakedownRecordResponse;
    static equals(a: TakedownRecordResponse | PlainMessage<TakedownRecordResponse> | undefined, b: TakedownRecordResponse | PlainMessage<TakedownRecordResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownRecordRequest
 */
export declare class UntakedownRecordRequest extends Message<UntakedownRecordRequest> {
    /**
     * @generated from field: string record_uri = 1;
     */
    recordUri: string;
    /**
     * @generated from field: google.protobuf.Timestamp seen = 2;
     */
    seen?: Timestamp;
    constructor(data?: PartialMessage<UntakedownRecordRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownRecordRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownRecordRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownRecordRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownRecordRequest;
    static equals(a: UntakedownRecordRequest | PlainMessage<UntakedownRecordRequest> | undefined, b: UntakedownRecordRequest | PlainMessage<UntakedownRecordRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.UntakedownRecordResponse
 */
export declare class UntakedownRecordResponse extends Message<UntakedownRecordResponse> {
    constructor(data?: PartialMessage<UntakedownRecordResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.UntakedownRecordResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UntakedownRecordResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UntakedownRecordResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UntakedownRecordResponse;
    static equals(a: UntakedownRecordResponse | PlainMessage<UntakedownRecordResponse> | undefined, b: UntakedownRecordResponse | PlainMessage<UntakedownRecordResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateActorMuteRequest
 */
export declare class CreateActorMuteRequest extends Message<CreateActorMuteRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string subject_did = 2;
     */
    subjectDid: string;
    constructor(data?: PartialMessage<CreateActorMuteRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateActorMuteRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateActorMuteRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateActorMuteRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateActorMuteRequest;
    static equals(a: CreateActorMuteRequest | PlainMessage<CreateActorMuteRequest> | undefined, b: CreateActorMuteRequest | PlainMessage<CreateActorMuteRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateActorMuteResponse
 */
export declare class CreateActorMuteResponse extends Message<CreateActorMuteResponse> {
    constructor(data?: PartialMessage<CreateActorMuteResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateActorMuteResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateActorMuteResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateActorMuteResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateActorMuteResponse;
    static equals(a: CreateActorMuteResponse | PlainMessage<CreateActorMuteResponse> | undefined, b: CreateActorMuteResponse | PlainMessage<CreateActorMuteResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteActorMuteRequest
 */
export declare class DeleteActorMuteRequest extends Message<DeleteActorMuteRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string subject_did = 2;
     */
    subjectDid: string;
    constructor(data?: PartialMessage<DeleteActorMuteRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteActorMuteRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteActorMuteRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteActorMuteRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteActorMuteRequest;
    static equals(a: DeleteActorMuteRequest | PlainMessage<DeleteActorMuteRequest> | undefined, b: DeleteActorMuteRequest | PlainMessage<DeleteActorMuteRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteActorMuteResponse
 */
export declare class DeleteActorMuteResponse extends Message<DeleteActorMuteResponse> {
    constructor(data?: PartialMessage<DeleteActorMuteResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteActorMuteResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteActorMuteResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteActorMuteResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteActorMuteResponse;
    static equals(a: DeleteActorMuteResponse | PlainMessage<DeleteActorMuteResponse> | undefined, b: DeleteActorMuteResponse | PlainMessage<DeleteActorMuteResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearActorMutesRequest
 */
export declare class ClearActorMutesRequest extends Message<ClearActorMutesRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    constructor(data?: PartialMessage<ClearActorMutesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearActorMutesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearActorMutesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearActorMutesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearActorMutesRequest;
    static equals(a: ClearActorMutesRequest | PlainMessage<ClearActorMutesRequest> | undefined, b: ClearActorMutesRequest | PlainMessage<ClearActorMutesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearActorMutesResponse
 */
export declare class ClearActorMutesResponse extends Message<ClearActorMutesResponse> {
    constructor(data?: PartialMessage<ClearActorMutesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearActorMutesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearActorMutesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearActorMutesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearActorMutesResponse;
    static equals(a: ClearActorMutesResponse | PlainMessage<ClearActorMutesResponse> | undefined, b: ClearActorMutesResponse | PlainMessage<ClearActorMutesResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateActorMutelistSubscriptionRequest
 */
export declare class CreateActorMutelistSubscriptionRequest extends Message<CreateActorMutelistSubscriptionRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string subject_uri = 2;
     */
    subjectUri: string;
    constructor(data?: PartialMessage<CreateActorMutelistSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateActorMutelistSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateActorMutelistSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateActorMutelistSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateActorMutelistSubscriptionRequest;
    static equals(a: CreateActorMutelistSubscriptionRequest | PlainMessage<CreateActorMutelistSubscriptionRequest> | undefined, b: CreateActorMutelistSubscriptionRequest | PlainMessage<CreateActorMutelistSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateActorMutelistSubscriptionResponse
 */
export declare class CreateActorMutelistSubscriptionResponse extends Message<CreateActorMutelistSubscriptionResponse> {
    constructor(data?: PartialMessage<CreateActorMutelistSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateActorMutelistSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateActorMutelistSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateActorMutelistSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateActorMutelistSubscriptionResponse;
    static equals(a: CreateActorMutelistSubscriptionResponse | PlainMessage<CreateActorMutelistSubscriptionResponse> | undefined, b: CreateActorMutelistSubscriptionResponse | PlainMessage<CreateActorMutelistSubscriptionResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteActorMutelistSubscriptionRequest
 */
export declare class DeleteActorMutelistSubscriptionRequest extends Message<DeleteActorMutelistSubscriptionRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string subject_uri = 2;
     */
    subjectUri: string;
    constructor(data?: PartialMessage<DeleteActorMutelistSubscriptionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteActorMutelistSubscriptionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteActorMutelistSubscriptionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteActorMutelistSubscriptionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteActorMutelistSubscriptionRequest;
    static equals(a: DeleteActorMutelistSubscriptionRequest | PlainMessage<DeleteActorMutelistSubscriptionRequest> | undefined, b: DeleteActorMutelistSubscriptionRequest | PlainMessage<DeleteActorMutelistSubscriptionRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteActorMutelistSubscriptionResponse
 */
export declare class DeleteActorMutelistSubscriptionResponse extends Message<DeleteActorMutelistSubscriptionResponse> {
    constructor(data?: PartialMessage<DeleteActorMutelistSubscriptionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteActorMutelistSubscriptionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteActorMutelistSubscriptionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteActorMutelistSubscriptionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteActorMutelistSubscriptionResponse;
    static equals(a: DeleteActorMutelistSubscriptionResponse | PlainMessage<DeleteActorMutelistSubscriptionResponse> | undefined, b: DeleteActorMutelistSubscriptionResponse | PlainMessage<DeleteActorMutelistSubscriptionResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearActorMutelistSubscriptionsRequest
 */
export declare class ClearActorMutelistSubscriptionsRequest extends Message<ClearActorMutelistSubscriptionsRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    constructor(data?: PartialMessage<ClearActorMutelistSubscriptionsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearActorMutelistSubscriptionsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearActorMutelistSubscriptionsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearActorMutelistSubscriptionsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearActorMutelistSubscriptionsRequest;
    static equals(a: ClearActorMutelistSubscriptionsRequest | PlainMessage<ClearActorMutelistSubscriptionsRequest> | undefined, b: ClearActorMutelistSubscriptionsRequest | PlainMessage<ClearActorMutelistSubscriptionsRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearActorMutelistSubscriptionsResponse
 */
export declare class ClearActorMutelistSubscriptionsResponse extends Message<ClearActorMutelistSubscriptionsResponse> {
    constructor(data?: PartialMessage<ClearActorMutelistSubscriptionsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearActorMutelistSubscriptionsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearActorMutelistSubscriptionsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearActorMutelistSubscriptionsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearActorMutelistSubscriptionsResponse;
    static equals(a: ClearActorMutelistSubscriptionsResponse | PlainMessage<ClearActorMutelistSubscriptionsResponse> | undefined, b: ClearActorMutelistSubscriptionsResponse | PlainMessage<ClearActorMutelistSubscriptionsResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateThreadMuteRequest
 */
export declare class CreateThreadMuteRequest extends Message<CreateThreadMuteRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string thread_root = 2;
     */
    threadRoot: string;
    constructor(data?: PartialMessage<CreateThreadMuteRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateThreadMuteRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateThreadMuteRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateThreadMuteRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateThreadMuteRequest;
    static equals(a: CreateThreadMuteRequest | PlainMessage<CreateThreadMuteRequest> | undefined, b: CreateThreadMuteRequest | PlainMessage<CreateThreadMuteRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.CreateThreadMuteResponse
 */
export declare class CreateThreadMuteResponse extends Message<CreateThreadMuteResponse> {
    constructor(data?: PartialMessage<CreateThreadMuteResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.CreateThreadMuteResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateThreadMuteResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateThreadMuteResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateThreadMuteResponse;
    static equals(a: CreateThreadMuteResponse | PlainMessage<CreateThreadMuteResponse> | undefined, b: CreateThreadMuteResponse | PlainMessage<CreateThreadMuteResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteThreadMuteRequest
 */
export declare class DeleteThreadMuteRequest extends Message<DeleteThreadMuteRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string thread_root = 2;
     */
    threadRoot: string;
    constructor(data?: PartialMessage<DeleteThreadMuteRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteThreadMuteRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteThreadMuteRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteThreadMuteRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteThreadMuteRequest;
    static equals(a: DeleteThreadMuteRequest | PlainMessage<DeleteThreadMuteRequest> | undefined, b: DeleteThreadMuteRequest | PlainMessage<DeleteThreadMuteRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.DeleteThreadMuteResponse
 */
export declare class DeleteThreadMuteResponse extends Message<DeleteThreadMuteResponse> {
    constructor(data?: PartialMessage<DeleteThreadMuteResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.DeleteThreadMuteResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteThreadMuteResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteThreadMuteResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteThreadMuteResponse;
    static equals(a: DeleteThreadMuteResponse | PlainMessage<DeleteThreadMuteResponse> | undefined, b: DeleteThreadMuteResponse | PlainMessage<DeleteThreadMuteResponse> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearThreadMutesRequest
 */
export declare class ClearThreadMutesRequest extends Message<ClearThreadMutesRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    constructor(data?: PartialMessage<ClearThreadMutesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearThreadMutesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearThreadMutesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearThreadMutesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearThreadMutesRequest;
    static equals(a: ClearThreadMutesRequest | PlainMessage<ClearThreadMutesRequest> | undefined, b: ClearThreadMutesRequest | PlainMessage<ClearThreadMutesRequest> | undefined): boolean;
}
/**
 * @generated from message bsky.ClearThreadMutesResponse
 */
export declare class ClearThreadMutesResponse extends Message<ClearThreadMutesResponse> {
    constructor(data?: PartialMessage<ClearThreadMutesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsky.ClearThreadMutesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClearThreadMutesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClearThreadMutesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClearThreadMutesResponse;
    static equals(a: ClearThreadMutesResponse | PlainMessage<ClearThreadMutesResponse> | undefined, b: ClearThreadMutesResponse | PlainMessage<ClearThreadMutesResponse> | undefined): boolean;
}
//# sourceMappingURL=bsky_pb.d.ts.map
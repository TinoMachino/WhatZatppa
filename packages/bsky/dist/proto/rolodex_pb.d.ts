import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
/**
 * Ping
 *
 * @generated from message rolodex.PingRequest
 */
export declare class PingRequest extends Message<PingRequest> {
    constructor(data?: PartialMessage<PingRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.PingRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingRequest;
    static equals(a: PingRequest | PlainMessage<PingRequest> | undefined, b: PingRequest | PlainMessage<PingRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.PingResponse
 */
export declare class PingResponse extends Message<PingResponse> {
    constructor(data?: PartialMessage<PingResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.PingResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingResponse;
    static equals(a: PingResponse | PlainMessage<PingResponse> | undefined, b: PingResponse | PlainMessage<PingResponse> | undefined): boolean;
}
/**
 * GetSyncStatus
 *
 * @generated from message rolodex.GetSyncStatusRequest
 */
export declare class GetSyncStatusRequest extends Message<GetSyncStatusRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    constructor(data?: PartialMessage<GetSyncStatusRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.GetSyncStatusRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSyncStatusRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSyncStatusRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSyncStatusRequest;
    static equals(a: GetSyncStatusRequest | PlainMessage<GetSyncStatusRequest> | undefined, b: GetSyncStatusRequest | PlainMessage<GetSyncStatusRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.SyncStatus
 */
export declare class SyncStatus extends Message<SyncStatus> {
    /**
     * @generated from field: google.protobuf.Timestamp synced_at = 1;
     */
    syncedAt?: Timestamp;
    /**
     * @generated from field: int32 matches_count = 2;
     */
    matchesCount: number;
    constructor(data?: PartialMessage<SyncStatus>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.SyncStatus";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SyncStatus;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SyncStatus;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SyncStatus;
    static equals(a: SyncStatus | PlainMessage<SyncStatus> | undefined, b: SyncStatus | PlainMessage<SyncStatus> | undefined): boolean;
}
/**
 * @generated from message rolodex.GetSyncStatusResponse
 */
export declare class GetSyncStatusResponse extends Message<GetSyncStatusResponse> {
    /**
     * @generated from field: rolodex.SyncStatus status = 1;
     */
    status?: SyncStatus;
    constructor(data?: PartialMessage<GetSyncStatusResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.GetSyncStatusResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSyncStatusResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSyncStatusResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSyncStatusResponse;
    static equals(a: GetSyncStatusResponse | PlainMessage<GetSyncStatusResponse> | undefined, b: GetSyncStatusResponse | PlainMessage<GetSyncStatusResponse> | undefined): boolean;
}
/**
 * StartPhoneVerification
 *
 * @generated from message rolodex.StartPhoneVerificationRequest
 */
export declare class StartPhoneVerificationRequest extends Message<StartPhoneVerificationRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    /**
     * @generated from field: string phone = 2;
     */
    phone: string;
    constructor(data?: PartialMessage<StartPhoneVerificationRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.StartPhoneVerificationRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StartPhoneVerificationRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StartPhoneVerificationRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StartPhoneVerificationRequest;
    static equals(a: StartPhoneVerificationRequest | PlainMessage<StartPhoneVerificationRequest> | undefined, b: StartPhoneVerificationRequest | PlainMessage<StartPhoneVerificationRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.StartPhoneVerificationResponse
 */
export declare class StartPhoneVerificationResponse extends Message<StartPhoneVerificationResponse> {
    constructor(data?: PartialMessage<StartPhoneVerificationResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.StartPhoneVerificationResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StartPhoneVerificationResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StartPhoneVerificationResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StartPhoneVerificationResponse;
    static equals(a: StartPhoneVerificationResponse | PlainMessage<StartPhoneVerificationResponse> | undefined, b: StartPhoneVerificationResponse | PlainMessage<StartPhoneVerificationResponse> | undefined): boolean;
}
/**
 * VerifyPhone
 *
 * @generated from message rolodex.VerifyPhoneRequest
 */
export declare class VerifyPhoneRequest extends Message<VerifyPhoneRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    /**
     * @generated from field: string phone = 2;
     */
    phone: string;
    /**
     * @generated from field: string verification_code = 3;
     */
    verificationCode: string;
    constructor(data?: PartialMessage<VerifyPhoneRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.VerifyPhoneRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerifyPhoneRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerifyPhoneRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerifyPhoneRequest;
    static equals(a: VerifyPhoneRequest | PlainMessage<VerifyPhoneRequest> | undefined, b: VerifyPhoneRequest | PlainMessage<VerifyPhoneRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.VerifyPhoneResponse
 */
export declare class VerifyPhoneResponse extends Message<VerifyPhoneResponse> {
    /**
     * @generated from field: string token = 1;
     */
    token: string;
    constructor(data?: PartialMessage<VerifyPhoneResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.VerifyPhoneResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VerifyPhoneResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VerifyPhoneResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VerifyPhoneResponse;
    static equals(a: VerifyPhoneResponse | PlainMessage<VerifyPhoneResponse> | undefined, b: VerifyPhoneResponse | PlainMessage<VerifyPhoneResponse> | undefined): boolean;
}
/**
 * ImportContacts
 *
 * @generated from message rolodex.ImportContactsRequest
 */
export declare class ImportContactsRequest extends Message<ImportContactsRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    /**
     * @generated from field: string token = 2;
     */
    token: string;
    /**
     * @generated from field: repeated string contacts = 3;
     */
    contacts: string[];
    constructor(data?: PartialMessage<ImportContactsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.ImportContactsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportContactsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportContactsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportContactsRequest;
    static equals(a: ImportContactsRequest | PlainMessage<ImportContactsRequest> | undefined, b: ImportContactsRequest | PlainMessage<ImportContactsRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.ImportContactsMatch
 */
export declare class ImportContactsMatch extends Message<ImportContactsMatch> {
    /**
     * To which index of the input contacts this contact corresponds.
     *
     * @generated from field: int32 input_index = 1;
     */
    inputIndex: number;
    /**
     * @generated from field: string subject = 2;
     */
    subject: string;
    constructor(data?: PartialMessage<ImportContactsMatch>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.ImportContactsMatch";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportContactsMatch;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportContactsMatch;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportContactsMatch;
    static equals(a: ImportContactsMatch | PlainMessage<ImportContactsMatch> | undefined, b: ImportContactsMatch | PlainMessage<ImportContactsMatch> | undefined): boolean;
}
/**
 * @generated from message rolodex.ImportContactsResponse
 */
export declare class ImportContactsResponse extends Message<ImportContactsResponse> {
    /**
     * @generated from field: repeated rolodex.ImportContactsMatch matches = 1;
     */
    matches: ImportContactsMatch[];
    constructor(data?: PartialMessage<ImportContactsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.ImportContactsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImportContactsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImportContactsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImportContactsResponse;
    static equals(a: ImportContactsResponse | PlainMessage<ImportContactsResponse> | undefined, b: ImportContactsResponse | PlainMessage<ImportContactsResponse> | undefined): boolean;
}
/**
 * GetMatches
 *
 * @generated from message rolodex.GetMatchesRequest
 */
export declare class GetMatchesRequest extends Message<GetMatchesRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from field: string cursor = 3;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMatchesRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.GetMatchesRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMatchesRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMatchesRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMatchesRequest;
    static equals(a: GetMatchesRequest | PlainMessage<GetMatchesRequest> | undefined, b: GetMatchesRequest | PlainMessage<GetMatchesRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.GetMatchesResponse
 */
export declare class GetMatchesResponse extends Message<GetMatchesResponse> {
    /**
     * @generated from field: repeated string subjects = 1;
     */
    subjects: string[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<GetMatchesResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.GetMatchesResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMatchesResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMatchesResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMatchesResponse;
    static equals(a: GetMatchesResponse | PlainMessage<GetMatchesResponse> | undefined, b: GetMatchesResponse | PlainMessage<GetMatchesResponse> | undefined): boolean;
}
/**
 * DismissMatch
 *
 * @generated from message rolodex.DismissMatchRequest
 */
export declare class DismissMatchRequest extends Message<DismissMatchRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    /**
     * @generated from field: string subject = 2;
     */
    subject: string;
    constructor(data?: PartialMessage<DismissMatchRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.DismissMatchRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DismissMatchRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DismissMatchRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DismissMatchRequest;
    static equals(a: DismissMatchRequest | PlainMessage<DismissMatchRequest> | undefined, b: DismissMatchRequest | PlainMessage<DismissMatchRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.DismissMatchResponse
 */
export declare class DismissMatchResponse extends Message<DismissMatchResponse> {
    /**
     * @generated from field: int32 matches_count = 1;
     */
    matchesCount: number;
    constructor(data?: PartialMessage<DismissMatchResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.DismissMatchResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DismissMatchResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DismissMatchResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DismissMatchResponse;
    static equals(a: DismissMatchResponse | PlainMessage<DismissMatchResponse> | undefined, b: DismissMatchResponse | PlainMessage<DismissMatchResponse> | undefined): boolean;
}
/**
 * RemoveData
 *
 * @generated from message rolodex.RemoveDataRequest
 */
export declare class RemoveDataRequest extends Message<RemoveDataRequest> {
    /**
     * @generated from field: string actor = 1;
     */
    actor: string;
    constructor(data?: PartialMessage<RemoveDataRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.RemoveDataRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RemoveDataRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RemoveDataRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RemoveDataRequest;
    static equals(a: RemoveDataRequest | PlainMessage<RemoveDataRequest> | undefined, b: RemoveDataRequest | PlainMessage<RemoveDataRequest> | undefined): boolean;
}
/**
 * @generated from message rolodex.RemoveDataResponse
 */
export declare class RemoveDataResponse extends Message<RemoveDataResponse> {
    /**
     * @generated from field: int32 contacts_count = 1;
     */
    contactsCount: number;
    /**
     * @generated from field: int32 matches_count = 2;
     */
    matchesCount: number;
    constructor(data?: PartialMessage<RemoveDataResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "rolodex.RemoveDataResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RemoveDataResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RemoveDataResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RemoveDataResponse;
    static equals(a: RemoveDataResponse | PlainMessage<RemoveDataResponse> | undefined, b: RemoveDataResponse | PlainMessage<RemoveDataResponse> | undefined): boolean;
}
//# sourceMappingURL=rolodex_pb.d.ts.map
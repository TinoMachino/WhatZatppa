import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
/**
 * @generated from enum bsync.Method
 */
export declare enum Method {
    /**
     * @generated from enum value: METHOD_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: METHOD_CREATE = 1;
     */
    CREATE = 1,
    /**
     * @generated from enum value: METHOD_UPDATE = 2;
     */
    UPDATE = 2,
    /**
     * @generated from enum value: METHOD_DELETE = 3;
     */
    DELETE = 3
}
/**
 * @generated from message bsync.MuteOperation
 */
export declare class MuteOperation extends Message<MuteOperation> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: bsync.MuteOperation.Type type = 2;
     */
    type: MuteOperation_Type;
    /**
     * @generated from field: string actor_did = 3;
     */
    actorDid: string;
    /**
     * @generated from field: string subject = 4;
     */
    subject: string;
    constructor(data?: PartialMessage<MuteOperation>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.MuteOperation";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MuteOperation;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MuteOperation;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MuteOperation;
    static equals(a: MuteOperation | PlainMessage<MuteOperation> | undefined, b: MuteOperation | PlainMessage<MuteOperation> | undefined): boolean;
}
/**
 * @generated from enum bsync.MuteOperation.Type
 */
export declare enum MuteOperation_Type {
    /**
     * @generated from enum value: TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TYPE_ADD = 1;
     */
    ADD = 1,
    /**
     * @generated from enum value: TYPE_REMOVE = 2;
     */
    REMOVE = 2,
    /**
     * @generated from enum value: TYPE_CLEAR = 3;
     */
    CLEAR = 3
}
/**
 * @generated from message bsync.AddMuteOperationRequest
 */
export declare class AddMuteOperationRequest extends Message<AddMuteOperationRequest> {
    /**
     * @generated from field: bsync.MuteOperation.Type type = 1;
     */
    type: MuteOperation_Type;
    /**
     * @generated from field: string actor_did = 2;
     */
    actorDid: string;
    /**
     * @generated from field: string subject = 3;
     */
    subject: string;
    constructor(data?: PartialMessage<AddMuteOperationRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.AddMuteOperationRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddMuteOperationRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddMuteOperationRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddMuteOperationRequest;
    static equals(a: AddMuteOperationRequest | PlainMessage<AddMuteOperationRequest> | undefined, b: AddMuteOperationRequest | PlainMessage<AddMuteOperationRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.AddMuteOperationResponse
 */
export declare class AddMuteOperationResponse extends Message<AddMuteOperationResponse> {
    /**
     * @generated from field: bsync.MuteOperation operation = 1;
     */
    operation?: MuteOperation;
    constructor(data?: PartialMessage<AddMuteOperationResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.AddMuteOperationResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddMuteOperationResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddMuteOperationResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddMuteOperationResponse;
    static equals(a: AddMuteOperationResponse | PlainMessage<AddMuteOperationResponse> | undefined, b: AddMuteOperationResponse | PlainMessage<AddMuteOperationResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanMuteOperationsRequest
 */
export declare class ScanMuteOperationsRequest extends Message<ScanMuteOperationsRequest> {
    /**
     * @generated from field: string cursor = 1;
     */
    cursor: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    constructor(data?: PartialMessage<ScanMuteOperationsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanMuteOperationsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanMuteOperationsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanMuteOperationsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanMuteOperationsRequest;
    static equals(a: ScanMuteOperationsRequest | PlainMessage<ScanMuteOperationsRequest> | undefined, b: ScanMuteOperationsRequest | PlainMessage<ScanMuteOperationsRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanMuteOperationsResponse
 */
export declare class ScanMuteOperationsResponse extends Message<ScanMuteOperationsResponse> {
    /**
     * @generated from field: repeated bsync.MuteOperation operations = 1;
     */
    operations: MuteOperation[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<ScanMuteOperationsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanMuteOperationsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanMuteOperationsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanMuteOperationsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanMuteOperationsResponse;
    static equals(a: ScanMuteOperationsResponse | PlainMessage<ScanMuteOperationsResponse> | undefined, b: ScanMuteOperationsResponse | PlainMessage<ScanMuteOperationsResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.NotifOperation
 */
export declare class NotifOperation extends Message<NotifOperation> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string actor_did = 2;
     */
    actorDid: string;
    /**
     * @generated from field: optional bool priority = 3;
     */
    priority?: boolean;
    constructor(data?: PartialMessage<NotifOperation>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.NotifOperation";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NotifOperation;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NotifOperation;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NotifOperation;
    static equals(a: NotifOperation | PlainMessage<NotifOperation> | undefined, b: NotifOperation | PlainMessage<NotifOperation> | undefined): boolean;
}
/**
 * @generated from message bsync.AddNotifOperationRequest
 */
export declare class AddNotifOperationRequest extends Message<AddNotifOperationRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: optional bool priority = 2;
     */
    priority?: boolean;
    constructor(data?: PartialMessage<AddNotifOperationRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.AddNotifOperationRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddNotifOperationRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddNotifOperationRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddNotifOperationRequest;
    static equals(a: AddNotifOperationRequest | PlainMessage<AddNotifOperationRequest> | undefined, b: AddNotifOperationRequest | PlainMessage<AddNotifOperationRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.AddNotifOperationResponse
 */
export declare class AddNotifOperationResponse extends Message<AddNotifOperationResponse> {
    /**
     * @generated from field: bsync.NotifOperation operation = 1;
     */
    operation?: NotifOperation;
    constructor(data?: PartialMessage<AddNotifOperationResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.AddNotifOperationResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddNotifOperationResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddNotifOperationResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddNotifOperationResponse;
    static equals(a: AddNotifOperationResponse | PlainMessage<AddNotifOperationResponse> | undefined, b: AddNotifOperationResponse | PlainMessage<AddNotifOperationResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanNotifOperationsRequest
 */
export declare class ScanNotifOperationsRequest extends Message<ScanNotifOperationsRequest> {
    /**
     * @generated from field: string cursor = 1;
     */
    cursor: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    constructor(data?: PartialMessage<ScanNotifOperationsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanNotifOperationsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanNotifOperationsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanNotifOperationsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanNotifOperationsRequest;
    static equals(a: ScanNotifOperationsRequest | PlainMessage<ScanNotifOperationsRequest> | undefined, b: ScanNotifOperationsRequest | PlainMessage<ScanNotifOperationsRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanNotifOperationsResponse
 */
export declare class ScanNotifOperationsResponse extends Message<ScanNotifOperationsResponse> {
    /**
     * @generated from field: repeated bsync.NotifOperation operations = 1;
     */
    operations: NotifOperation[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<ScanNotifOperationsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanNotifOperationsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanNotifOperationsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanNotifOperationsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanNotifOperationsResponse;
    static equals(a: ScanNotifOperationsResponse | PlainMessage<ScanNotifOperationsResponse> | undefined, b: ScanNotifOperationsResponse | PlainMessage<ScanNotifOperationsResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.Operation
 */
export declare class Operation extends Message<Operation> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string actor_did = 2;
     */
    actorDid: string;
    /**
     * @generated from field: string namespace = 3;
     */
    namespace: string;
    /**
     * @generated from field: string key = 4;
     */
    key: string;
    /**
     * @generated from field: bsync.Method method = 5;
     */
    method: Method;
    /**
     * @generated from field: bytes payload = 6;
     */
    payload: Uint8Array<ArrayBuffer>;
    constructor(data?: PartialMessage<Operation>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.Operation";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Operation;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Operation;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Operation;
    static equals(a: Operation | PlainMessage<Operation> | undefined, b: Operation | PlainMessage<Operation> | undefined): boolean;
}
/**
 * @generated from message bsync.PutOperationRequest
 */
export declare class PutOperationRequest extends Message<PutOperationRequest> {
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
     * @generated from field: bsync.Method method = 4;
     */
    method: Method;
    /**
     * @generated from field: bytes payload = 5;
     */
    payload: Uint8Array<ArrayBuffer>;
    constructor(data?: PartialMessage<PutOperationRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.PutOperationRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutOperationRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutOperationRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutOperationRequest;
    static equals(a: PutOperationRequest | PlainMessage<PutOperationRequest> | undefined, b: PutOperationRequest | PlainMessage<PutOperationRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.PutOperationResponse
 */
export declare class PutOperationResponse extends Message<PutOperationResponse> {
    /**
     * @generated from field: bsync.Operation operation = 1;
     */
    operation?: Operation;
    constructor(data?: PartialMessage<PutOperationResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.PutOperationResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PutOperationResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PutOperationResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PutOperationResponse;
    static equals(a: PutOperationResponse | PlainMessage<PutOperationResponse> | undefined, b: PutOperationResponse | PlainMessage<PutOperationResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanOperationsRequest
 */
export declare class ScanOperationsRequest extends Message<ScanOperationsRequest> {
    /**
     * @generated from field: string cursor = 1;
     */
    cursor: string;
    /**
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    constructor(data?: PartialMessage<ScanOperationsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanOperationsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanOperationsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanOperationsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanOperationsRequest;
    static equals(a: ScanOperationsRequest | PlainMessage<ScanOperationsRequest> | undefined, b: ScanOperationsRequest | PlainMessage<ScanOperationsRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.ScanOperationsResponse
 */
export declare class ScanOperationsResponse extends Message<ScanOperationsResponse> {
    /**
     * @generated from field: repeated bsync.Operation operations = 1;
     */
    operations: Operation[];
    /**
     * @generated from field: string cursor = 2;
     */
    cursor: string;
    constructor(data?: PartialMessage<ScanOperationsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.ScanOperationsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ScanOperationsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ScanOperationsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ScanOperationsResponse;
    static equals(a: ScanOperationsResponse | PlainMessage<ScanOperationsResponse> | undefined, b: ScanOperationsResponse | PlainMessage<ScanOperationsResponse> | undefined): boolean;
}
/**
 * @generated from message bsync.DeleteOperationsByActorAndNamespaceRequest
 */
export declare class DeleteOperationsByActorAndNamespaceRequest extends Message<DeleteOperationsByActorAndNamespaceRequest> {
    /**
     * @generated from field: string actor_did = 1;
     */
    actorDid: string;
    /**
     * @generated from field: string namespace = 2;
     */
    namespace: string;
    constructor(data?: PartialMessage<DeleteOperationsByActorAndNamespaceRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.DeleteOperationsByActorAndNamespaceRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteOperationsByActorAndNamespaceRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteOperationsByActorAndNamespaceRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteOperationsByActorAndNamespaceRequest;
    static equals(a: DeleteOperationsByActorAndNamespaceRequest | PlainMessage<DeleteOperationsByActorAndNamespaceRequest> | undefined, b: DeleteOperationsByActorAndNamespaceRequest | PlainMessage<DeleteOperationsByActorAndNamespaceRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.DeleteOperationsByActorAndNamespaceResponse
 */
export declare class DeleteOperationsByActorAndNamespaceResponse extends Message<DeleteOperationsByActorAndNamespaceResponse> {
    /**
     * @generated from field: int32 deleted_count = 1;
     */
    deletedCount: number;
    constructor(data?: PartialMessage<DeleteOperationsByActorAndNamespaceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.DeleteOperationsByActorAndNamespaceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteOperationsByActorAndNamespaceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteOperationsByActorAndNamespaceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteOperationsByActorAndNamespaceResponse;
    static equals(a: DeleteOperationsByActorAndNamespaceResponse | PlainMessage<DeleteOperationsByActorAndNamespaceResponse> | undefined, b: DeleteOperationsByActorAndNamespaceResponse | PlainMessage<DeleteOperationsByActorAndNamespaceResponse> | undefined): boolean;
}
/**
 * Ping
 *
 * @generated from message bsync.PingRequest
 */
export declare class PingRequest extends Message<PingRequest> {
    constructor(data?: PartialMessage<PingRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.PingRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingRequest;
    static equals(a: PingRequest | PlainMessage<PingRequest> | undefined, b: PingRequest | PlainMessage<PingRequest> | undefined): boolean;
}
/**
 * @generated from message bsync.PingResponse
 */
export declare class PingResponse extends Message<PingResponse> {
    constructor(data?: PartialMessage<PingResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "bsync.PingResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PingResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PingResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PingResponse;
    static equals(a: PingResponse | PlainMessage<PingResponse> | undefined, b: PingResponse | PlainMessage<PingResponse> | undefined): boolean;
}
//# sourceMappingURL=bsync_pb.d.ts.map
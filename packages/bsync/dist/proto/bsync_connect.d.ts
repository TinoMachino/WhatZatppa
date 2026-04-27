import { AddMuteOperationRequest, AddMuteOperationResponse, AddNotifOperationRequest, AddNotifOperationResponse, DeleteOperationsByActorAndNamespaceRequest, DeleteOperationsByActorAndNamespaceResponse, PingRequest, PingResponse, PutOperationRequest, PutOperationResponse, ScanMuteOperationsRequest, ScanMuteOperationsResponse, ScanNotifOperationsRequest, ScanNotifOperationsResponse, ScanOperationsRequest, ScanOperationsResponse } from "./bsync_pb";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service bsync.Service
 */
export declare const Service: {
    readonly typeName: "bsync.Service";
    readonly methods: {
        /**
         * Sync
         *
         * @generated from rpc bsync.Service.AddMuteOperation
         */
        readonly addMuteOperation: {
            readonly name: "AddMuteOperation";
            readonly I: typeof AddMuteOperationRequest;
            readonly O: typeof AddMuteOperationResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.ScanMuteOperations
         */
        readonly scanMuteOperations: {
            readonly name: "ScanMuteOperations";
            readonly I: typeof ScanMuteOperationsRequest;
            readonly O: typeof ScanMuteOperationsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.AddNotifOperation
         */
        readonly addNotifOperation: {
            readonly name: "AddNotifOperation";
            readonly I: typeof AddNotifOperationRequest;
            readonly O: typeof AddNotifOperationResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.ScanNotifOperations
         */
        readonly scanNotifOperations: {
            readonly name: "ScanNotifOperations";
            readonly I: typeof ScanNotifOperationsRequest;
            readonly O: typeof ScanNotifOperationsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.PutOperation
         */
        readonly putOperation: {
            readonly name: "PutOperation";
            readonly I: typeof PutOperationRequest;
            readonly O: typeof PutOperationResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.ScanOperations
         */
        readonly scanOperations: {
            readonly name: "ScanOperations";
            readonly I: typeof ScanOperationsRequest;
            readonly O: typeof ScanOperationsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsync.Service.DeleteOperationsByActorAndNamespace
         */
        readonly deleteOperationsByActorAndNamespace: {
            readonly name: "DeleteOperationsByActorAndNamespace";
            readonly I: typeof DeleteOperationsByActorAndNamespaceRequest;
            readonly O: typeof DeleteOperationsByActorAndNamespaceResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Ping
         *
         * @generated from rpc bsync.Service.Ping
         */
        readonly ping: {
            readonly name: "Ping";
            readonly I: typeof PingRequest;
            readonly O: typeof PingResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=bsync_connect.d.ts.map
import { DismissMatchRequest, DismissMatchResponse, GetMatchesRequest, GetMatchesResponse, GetSyncStatusRequest, GetSyncStatusResponse, ImportContactsRequest, ImportContactsResponse, PingRequest, PingResponse, RemoveDataRequest, RemoveDataResponse, StartPhoneVerificationRequest, StartPhoneVerificationResponse, VerifyPhoneRequest, VerifyPhoneResponse } from "./rolodex_pb";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service rolodex.RolodexService
 */
export declare const RolodexService: {
    readonly typeName: "rolodex.RolodexService";
    readonly methods: {
        /**
         * @generated from rpc rolodex.RolodexService.Ping
         */
        readonly ping: {
            readonly name: "Ping";
            readonly I: typeof PingRequest;
            readonly O: typeof PingResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.GetSyncStatus
         */
        readonly getSyncStatus: {
            readonly name: "GetSyncStatus";
            readonly I: typeof GetSyncStatusRequest;
            readonly O: typeof GetSyncStatusResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.StartPhoneVerification
         */
        readonly startPhoneVerification: {
            readonly name: "StartPhoneVerification";
            readonly I: typeof StartPhoneVerificationRequest;
            readonly O: typeof StartPhoneVerificationResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.VerifyPhone
         */
        readonly verifyPhone: {
            readonly name: "VerifyPhone";
            readonly I: typeof VerifyPhoneRequest;
            readonly O: typeof VerifyPhoneResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.ImportContacts
         */
        readonly importContacts: {
            readonly name: "ImportContacts";
            readonly I: typeof ImportContactsRequest;
            readonly O: typeof ImportContactsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.GetMatches
         */
        readonly getMatches: {
            readonly name: "GetMatches";
            readonly I: typeof GetMatchesRequest;
            readonly O: typeof GetMatchesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.DismissMatch
         */
        readonly dismissMatch: {
            readonly name: "DismissMatch";
            readonly I: typeof DismissMatchRequest;
            readonly O: typeof DismissMatchResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc rolodex.RolodexService.RemoveData
         */
        readonly removeData: {
            readonly name: "RemoveData";
            readonly I: typeof RemoveDataRequest;
            readonly O: typeof RemoveDataResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=rolodex_connect.d.ts.map
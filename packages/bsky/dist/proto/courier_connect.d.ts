import { PingRequest, PingResponse, PushNotificationsRequest, PushNotificationsResponse, RegisterDeviceTokenRequest, RegisterDeviceTokenResponse, SetAgeRestrictedRequest, SetAgeRestrictedResponse, UnregisterDeviceTokenRequest, UnregisterDeviceTokenResponse } from "./courier_pb";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service courier.Service
 */
export declare const Service: {
    readonly typeName: "courier.Service";
    readonly methods: {
        /**
         * @generated from rpc courier.Service.Ping
         */
        readonly ping: {
            readonly name: "Ping";
            readonly I: typeof PingRequest;
            readonly O: typeof PingResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc courier.Service.PushNotifications
         */
        readonly pushNotifications: {
            readonly name: "PushNotifications";
            readonly I: typeof PushNotificationsRequest;
            readonly O: typeof PushNotificationsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc courier.Service.RegisterDeviceToken
         */
        readonly registerDeviceToken: {
            readonly name: "RegisterDeviceToken";
            readonly I: typeof RegisterDeviceTokenRequest;
            readonly O: typeof RegisterDeviceTokenResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc courier.Service.UnregisterDeviceToken
         */
        readonly unregisterDeviceToken: {
            readonly name: "UnregisterDeviceToken";
            readonly I: typeof UnregisterDeviceTokenRequest;
            readonly O: typeof UnregisterDeviceTokenResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc courier.Service.SetAgeRestricted
         */
        readonly setAgeRestricted: {
            readonly name: "SetAgeRestricted";
            readonly I: typeof SetAgeRestrictedRequest;
            readonly O: typeof SetAgeRestrictedResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=courier_connect.d.ts.map
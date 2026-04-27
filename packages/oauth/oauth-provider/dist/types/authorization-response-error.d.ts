import { z } from 'zod';
export declare const authorizationResponseErrorSchema: z.ZodUnion<[z.ZodEnum<["invalid_request", "unauthorized_client", "access_denied", "unsupported_response_type", "invalid_scope", "server_error", "temporarily_unavailable"]>, z.ZodEnum<["interaction_required", "login_required", "account_selection_required", "consent_required", "invalid_request_uri", "invalid_request_object", "request_not_supported", "request_uri_not_supported", "registration_not_supported"]>, z.ZodLiteral<"invalid_authorization_details">]>;
export type AuthorizationResponseError = z.infer<typeof authorizationResponseErrorSchema>;
export declare function isAuthorizationResponseError<T>(value: T): value is T & AuthorizationResponseError;
//# sourceMappingURL=authorization-response-error.d.ts.map
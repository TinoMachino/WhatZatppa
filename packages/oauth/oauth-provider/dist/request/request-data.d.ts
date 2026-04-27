import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { ClientAuth, ClientAuthLegacy } from '../client/client-auth.js';
import { ClientId } from '../client/client-id.js';
import { DeviceId } from '../device/device-id.js';
import { NonNullableKeys } from '../lib/util/type.js';
import { Sub } from '../oidc/sub.js';
import { Code } from './code.js';
export type { ClientAuth, ClientAuthLegacy, ClientId, Code, DeviceId, OAuthAuthorizationRequestParameters, Sub, };
export type RequestData = {
    clientId: ClientId;
    clientAuth: null | ClientAuth | ClientAuthLegacy;
    parameters: Readonly<OAuthAuthorizationRequestParameters>;
    expiresAt: Date;
    deviceId: DeviceId | null;
    sub: Sub | null;
    code: Code | null;
};
export type RequestDataAuthorized = NonNullableKeys<RequestData, 'sub' | 'deviceId'>;
export declare const isRequestDataAuthorized: (data: RequestData) => data is RequestDataAuthorized;
//# sourceMappingURL=request-data.d.ts.map
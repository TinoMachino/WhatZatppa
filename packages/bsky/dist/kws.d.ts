import { KwsExternalPayload } from './api/kws/types';
import { KwsConfig } from './config';
export declare const createKwsClient: (cfg: KwsConfig) => KwsClient;
/**
 * Thrown when the provided external payload exceeds KWS's character limit.
 * This is most commonly caused by DIDs that are too long, such as for
 * `did:web` DIDs. But it's very rare, and the client has special handling for
 * this case.
 */
export declare class KwsExternalPayloadError extends Error {
}
export type KWSSendEmailRequestCommon = {
    email: string;
    location: string;
    language: string;
    externalPayload: string;
};
export type KWSSendEmailRequest = (KWSSendEmailRequestCommon & {
    userContext: 'adult';
}) | (KWSSendEmailRequestCommon & {
    userContext: 'age';
    minimumAge: number;
});
export declare class KwsClient {
    cfg: KwsConfig;
    constructor(cfg: KwsConfig);
    private auth;
    private fetchWithAuth;
    /**
     * @deprecated Use `sendAdultVerifiedFlowEmail` or `sendAgeVerifiedFlowEmail` instead.
     */
    sendEmail({ countryCode, email, externalPayload, language, }: {
        countryCode: string;
        email: string;
        externalPayload: KwsExternalPayload;
        language: string;
    }): Promise<unknown>;
    /**
     * Sends a KWS verification email with the given properties.
     */
    email(props: KWSSendEmailRequest): Promise<unknown>;
    /**
     * Sends an email to the user initiating an `adult` verification flow, which
     * results in `adult-verified` events/webhooks.
     */
    sendAdultVerifiedFlowEmail(props: KWSSendEmailRequestCommon): Promise<unknown>;
    /**
     * Sends an email to the user initiating an `age` verification flow, which
     * results in `age-verified` events/webhooks.
     */
    sendAgeVerifiedFlowEmail(props: KWSSendEmailRequestCommon): Promise<unknown>;
}
//# sourceMappingURL=kws.d.ts.map
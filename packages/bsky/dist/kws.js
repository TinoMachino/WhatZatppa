"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KwsClient = exports.KwsExternalPayloadError = exports.createKwsClient = void 0;
const zod_1 = require("zod");
const util_1 = require("./api/kws/util");
const auth_verifier_1 = require("./auth-verifier");
const logger_1 = require("./logger");
const createKwsClient = (cfg) => {
    return new KwsClient(cfg);
};
exports.createKwsClient = createKwsClient;
// Not `.strict()` to avoid breaking if KWS adds fields.
const authResponseSchema = zod_1.z.object({
    access_token: zod_1.z.string(),
});
const EXTERNAL_PAYLOAD_CHAR_LIMIT = 200;
/**
 * Thrown when the provided external payload exceeds KWS's character limit.
 * This is most commonly caused by DIDs that are too long, such as for
 * `did:web` DIDs. But it's very rare, and the client has special handling for
 * this case.
 */
class KwsExternalPayloadError extends Error {
}
exports.KwsExternalPayloadError = KwsExternalPayloadError;
class KwsClient {
    constructor(cfg) {
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cfg
        });
    }
    async auth() {
        try {
            const res = await fetch(`${this.cfg.authOrigin}/auth/realms/kws/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: (0, auth_verifier_1.buildBasicAuth)(this.cfg.clientId, this.cfg.apiKey),
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    scope: 'verification',
                }),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch age assurance access token: status: ${res.status}, statusText: ${res.statusText}, errorText: ${errorText}`);
            }
            const auth = await res.json();
            const authResponse = authResponseSchema.parse(auth);
            return authResponse.access_token;
        }
        catch (err) {
            logger_1.httpLogger.error({ err }, 'Failed to authenticate with KWS');
            throw err;
        }
    }
    async fetchWithAuth(url, init) {
        const accessToken = await this.auth();
        return fetch(url, {
            ...init,
            headers: {
                ...(init.headers ?? {}),
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    /**
     * @deprecated Use `sendAdultVerifiedFlowEmail` or `sendAgeVerifiedFlowEmail` instead.
     */
    async sendEmail({ countryCode, email, externalPayload, language, }) {
        const serializedExternalPayload = (0, util_1.serializeExternalPayload)(externalPayload);
        if (serializedExternalPayload.length > EXTERNAL_PAYLOAD_CHAR_LIMIT) {
            throw new KwsExternalPayloadError();
        }
        const res = await this.fetchWithAuth(`${this.cfg.apiOrigin}/v1/verifications/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': this.cfg.userAgent,
            },
            body: JSON.stringify({
                email,
                externalPayload: serializedExternalPayload,
                language,
                location: countryCode,
                userContext: 'adult',
            }),
        });
        if (!res.ok) {
            const errorText = await res.text();
            logger_1.httpLogger.error({ status: res.status, statusText: res.statusText, errorText }, 'Failed to send age assurance email');
            throw new Error('Failed to send age assurance email');
        }
        return res.json();
    }
    /**
     * Sends a KWS verification email with the given properties.
     */
    async email(props) {
        const res = await this.fetchWithAuth(`${this.cfg.apiOrigin}/v1/verifications/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': this.cfg.userAgent,
            },
            body: JSON.stringify(props),
        });
        if (!res.ok) {
            const errorText = await res.text();
            logger_1.httpLogger.error({
                status: res.status,
                statusText: res.statusText,
                errorText,
                flow: props.userContext,
            }, 'Failed to send KWS email');
            throw new Error('Failed to send KWS email');
        }
        return res.json();
    }
    /**
     * Sends an email to the user initiating an `adult` verification flow, which
     * results in `adult-verified` events/webhooks.
     */
    async sendAdultVerifiedFlowEmail(props) {
        return this.email({
            ...props,
            userContext: 'adult',
        });
    }
    /**
     * Sends an email to the user initiating an `age` verification flow, which
     * results in `age-verified` events/webhooks.
     */
    async sendAgeVerifiedFlowEmail(props) {
        return this.email({
            ...props,
            userContext: 'age',
            minimumAge: 16, // KWS required value
        });
    }
}
exports.KwsClient = KwsClient;
//# sourceMappingURL=kws.js.map
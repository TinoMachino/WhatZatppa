"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountManager = void 0;
const oauth_types_1 = require("@atproto/oauth-types");
const invalid_credentials_error_js_1 = require("../errors/invalid-credentials-error.js");
const invalid_request_error_js_1 = require("../errors/invalid-request-error.js");
const hcaptcha_js_1 = require("../lib/hcaptcha.js");
const time_js_1 = require("../lib/util/time.js");
const TIMING_ATTACK_MITIGATION_DELAY = 400;
const BRUTE_FORCE_MITIGATION_DELAY = 300;
class AccountManager {
    store;
    hooks;
    inviteCodeRequired;
    hcaptchaClient;
    constructor(issuer, store, hooks, customization) {
        this.store = store;
        this.hooks = hooks;
        this.inviteCodeRequired = customization.inviteCodeRequired !== false;
        this.hcaptchaClient = customization.hcaptcha
            ? new hcaptcha_js_1.HCaptchaClient(new URL(issuer).hostname, customization.hcaptcha)
            : undefined;
    }
    async processHcaptchaToken(input, deviceId, deviceMetadata) {
        if (!this.hcaptchaClient) {
            return undefined;
        }
        if (!input.hcaptchaToken) {
            throw new invalid_request_error_js_1.InvalidRequestError('hCaptcha token is required');
        }
        const tokens = this.hcaptchaClient.buildClientTokens(deviceMetadata.ipAddress, input.handle, deviceMetadata.userAgent);
        const result = await this.hcaptchaClient
            .verify('signup', input.hcaptchaToken, deviceMetadata.ipAddress, tokens)
            .catch((err) => {
            throw invalid_request_error_js_1.InvalidRequestError.from(err, 'hCaptcha verification failed');
        });
        await this.hooks.onHcaptchaResult?.call(null, {
            input,
            deviceId,
            deviceMetadata,
            tokens,
            result,
        });
        try {
            this.hcaptchaClient.checkVerifyResult(result, tokens);
        }
        catch (err) {
            throw invalid_request_error_js_1.InvalidRequestError.from(err, 'hCaptcha verification failed');
        }
        return result;
    }
    async enforceInviteCode(input, _deviceId, _deviceMetadata) {
        if (!this.inviteCodeRequired) {
            return undefined;
        }
        if (!input.inviteCode) {
            throw new invalid_request_error_js_1.InvalidRequestError('Invite code is required');
        }
        return input.inviteCode;
    }
    async buildSignupData(input, deviceId, deviceMetadata) {
        const [hcaptchaResult, inviteCode] = await Promise.all([
            this.processHcaptchaToken(input, deviceId, deviceMetadata),
            this.enforceInviteCode(input, deviceId, deviceMetadata),
        ]);
        return { ...input, hcaptchaResult, inviteCode };
    }
    async createAccount(deviceId, deviceMetadata, input) {
        await this.hooks.onSignUpAttempt?.call(null, {
            input,
            deviceId,
            deviceMetadata,
        });
        const data = await this.buildSignupData(input, deviceId, deviceMetadata);
        // Mitigation against brute forcing email of users.
        // @TODO Add rate limit to all the OAuth routes.
        const account = await (0, time_js_1.constantTime)(BRUTE_FORCE_MITIGATION_DELAY, async () => {
            return this.store.createAccount(data);
        }).catch((err) => {
            throw invalid_request_error_js_1.InvalidRequestError.from(err, 'Account creation failed');
        });
        try {
            await this.hooks.onSignedUp?.call(null, {
                data,
                account,
                deviceId,
                deviceMetadata,
            });
            return account;
        }
        catch (err) {
            await this.removeDeviceAccount(deviceId, account.sub);
            throw invalid_request_error_js_1.InvalidRequestError.from(err, 'The account was successfully created but something went wrong, try signing-in.');
        }
    }
    async authenticateAccount(deviceId, deviceMetadata, data, clientId) {
        try {
            await this.hooks.onSignInAttempt?.call(null, {
                data,
                deviceId,
                deviceMetadata,
                clientId,
            });
            let account;
            try {
                account = await (0, time_js_1.constantTime)(TIMING_ATTACK_MITIGATION_DELAY, async () => {
                    return this.store.authenticateAccount(data);
                });
            }
            catch (err) {
                // Only notify for credential failures (e.g. unknown identifier, wrong
                // password). Server errors and flows that require an additional factor
                // (e.g. SecondAuthenticationFactorRequiredError) are not "failed
                // sign-ins" and do not trigger the hook.
                if (err instanceof invalid_request_error_js_1.InvalidRequestError) {
                    // Stores that throw the more specific `InvalidCredentialsError`
                    // can attach the matched subject identifier to distinguish
                    // "identifier known, password wrong" from "identifier unknown".
                    // This information is only exposed to the hook and is never
                    // surfaced to the client.
                    const isCredentialsError = err instanceof invalid_credentials_error_js_1.InvalidCredentialsError;
                    const sub = isCredentialsError ? err.sub ?? null : null;
                    // Swallow any error from the hook itself so that it does not mask
                    // the underlying authentication failure being reported.
                    try {
                        await this.hooks.onSignInFailed?.call(null, {
                            data,
                            error: err,
                            sub,
                            deviceId,
                            deviceMetadata,
                            clientId,
                        });
                    }
                    catch {
                        // noop
                    }
                    if (isCredentialsError) {
                        // Defensively downgrade to a plain InvalidRequestError
                        throw new invalid_request_error_js_1.InvalidRequestError(err.error_description);
                    }
                }
                throw err;
            }
            await this.hooks.onSignedIn?.call(null, {
                data,
                account,
                deviceId,
                deviceMetadata,
                clientId,
            });
            return account;
        }
        catch (err) {
            throw invalid_request_error_js_1.InvalidRequestError.from(err, 'Unable to sign-in due to an unexpected server error');
        }
    }
    async upsertDeviceAccount(deviceId, sub) {
        await this.store.upsertDeviceAccount(deviceId, sub);
    }
    async getDeviceAccount(deviceId, sub) {
        const deviceAccount = await this.store.getDeviceAccount(deviceId, sub);
        if (!deviceAccount)
            throw new invalid_request_error_js_1.InvalidRequestError(`Account not found`);
        return deviceAccount;
    }
    async setAuthorizedClient(account, client, data) {
        // "Loopback" clients are not distinguishable from one another.
        if ((0, oauth_types_1.isOAuthClientIdLoopback)(client.id))
            return;
        await this.store.setAuthorizedClient(account.sub, client.id, data);
    }
    async getAccount(sub) {
        return this.store.getAccount(sub);
    }
    async removeDeviceAccount(deviceId, sub) {
        return this.store.removeDeviceAccount(deviceId, sub);
    }
    async listDeviceAccounts(deviceId) {
        const deviceAccounts = await this.store.listDeviceAccounts({
            deviceId,
        });
        return deviceAccounts // Fool proof
            .filter((deviceAccount) => deviceAccount.deviceId === deviceId);
    }
    async listAccountDevices(sub) {
        const deviceAccounts = await this.store.listDeviceAccounts({
            sub,
        });
        return deviceAccounts // Fool proof
            .filter((deviceAccount) => deviceAccount.account.sub === sub);
    }
    async resetPasswordRequest(deviceId, deviceMetadata, input) {
        await this.hooks.onResetPasswordRequest?.call(null, {
            input,
            deviceId,
            deviceMetadata,
        });
        return (0, time_js_1.constantTime)(TIMING_ATTACK_MITIGATION_DELAY, async () => {
            const account = await this.store.resetPasswordRequest(input);
            if (!account) {
                return; // Silently ignore to prevent user enumeration
            }
            await this.hooks.onResetPasswordRequested?.call(null, {
                input,
                deviceId,
                deviceMetadata,
                account,
            });
        });
    }
    async resetPasswordConfirm(deviceId, deviceMetadata, input) {
        await this.hooks.onResetPasswordConfirm?.call(null, {
            input,
            deviceId,
            deviceMetadata,
        });
        return (0, time_js_1.constantTime)(TIMING_ATTACK_MITIGATION_DELAY, async () => {
            const account = await this.store.resetPasswordConfirm(input);
            if (!account) {
                throw new invalid_request_error_js_1.InvalidRequestError('Invalid token');
            }
            await this.hooks.onResetPasswordConfirmed?.call(null, {
                input,
                deviceId,
                deviceMetadata,
                account,
            });
        });
    }
    async verifyHandleAvailability(handle) {
        return (0, time_js_1.constantTime)(TIMING_ATTACK_MITIGATION_DELAY, async () => {
            return this.store.verifyHandleAvailability(handle);
        });
    }
}
exports.AccountManager = AccountManager;
//# sourceMappingURL=account-manager.js.map
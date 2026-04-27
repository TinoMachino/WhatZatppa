import { BrowserOAuthClient, } from '@atproto/oauth-client-browser';
export class ExpoOAuthClient extends BrowserOAuthClient {
    constructor({ clientMetadata, responseMode = 'fragment', ...options }) {
        super({ ...options, clientMetadata, responseMode });
    }
    async signIn(input, options) {
        // Force popup mode
        return this.signInPopup(input, {
            ...options,
            display: options?.display ?? 'touch',
        });
    }
    async handleCallback() {
        const params = this.readCallbackParams();
        if (!params)
            return null;
        const url = this.findRedirectUrl();
        if (!url)
            return null;
        const { session } = await this.initCallback(params, url);
        return session;
    }
}
//# sourceMappingURL=expo-oauth-client.web.js.map
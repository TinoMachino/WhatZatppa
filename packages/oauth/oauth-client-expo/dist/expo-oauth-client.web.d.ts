import { AuthorizeOptions, BrowserOAuthClient, OAuthSession } from '@atproto/oauth-client-browser';
import { ExpoOAuthClientInterface } from './expo-oauth-client-interface';
import { ExpoOAuthClientOptions } from './expo-oauth-client-options';
export declare class ExpoOAuthClient extends BrowserOAuthClient implements ExpoOAuthClientInterface {
    constructor({ clientMetadata, responseMode, ...options }: ExpoOAuthClientOptions);
    signIn(input: string, options?: AuthorizeOptions): Promise<OAuthSession>;
    handleCallback(): Promise<null | OAuthSession>;
}
//# sourceMappingURL=expo-oauth-client.web.d.ts.map
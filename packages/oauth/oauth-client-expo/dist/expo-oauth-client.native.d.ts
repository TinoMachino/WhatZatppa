import { AuthorizeOptions, OAuthClient, OAuthSession } from '@atproto/oauth-client';
import { ExpoOAuthClientInterface } from './expo-oauth-client-interface';
import { ExpoOAuthClientOptions } from './expo-oauth-client-options';
export declare const CUSTOM_URI_SCHEME_REGEX: RegExp;
export declare class ExpoOAuthClient extends OAuthClient implements ExpoOAuthClientInterface {
    #private;
    constructor(options: ExpoOAuthClientOptions);
    handleCallback(): Promise<null | OAuthSession>;
    signIn(input: string, options?: AuthorizeOptions): Promise<OAuthSession>;
    [Symbol.asyncDispose](): Promise<void>;
}
//# sourceMappingURL=expo-oauth-client.native.d.ts.map
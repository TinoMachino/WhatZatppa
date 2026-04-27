import type { Account } from '@atproto/oauth-provider-api';
import { OAuthAuthorizationRequestParameters, OAuthAuthorizationServerMetadata } from '@atproto/oauth-types';
import { ClientAuth } from '../client/client-auth.js';
import { ClientId } from '../client/client-id.js';
import { Client } from '../client/client.js';
import { DeviceId } from '../device/device-id.js';
import { LexiconManager } from '../lexicon/lexicon-manager.js';
import { RequestMetadata } from '../lib/http/request.js';
import { OAuthHooks } from '../oauth-hooks.js';
import { Signer } from '../signer/signer.js';
import { Code } from './code.js';
import { RequestDataAuthorized } from './request-data.js';
import { RequestStore } from './request-store.js';
import { RequestUri } from './request-uri.js';
export declare class RequestManager {
    protected readonly store: RequestStore;
    protected readonly lexiconManager: LexiconManager;
    protected readonly signer: Signer;
    protected readonly metadata: OAuthAuthorizationServerMetadata;
    protected readonly hooks: OAuthHooks;
    protected readonly tokenMaxAge: number;
    constructor(store: RequestStore, lexiconManager: LexiconManager, signer: Signer, metadata: OAuthAuthorizationServerMetadata, hooks: OAuthHooks, tokenMaxAge?: number);
    protected createTokenExpiry(): Date;
    createAuthorizationRequest(client: Client, clientAuth: null | ClientAuth, input: Readonly<OAuthAuthorizationRequestParameters>, deviceId: null | DeviceId): Promise<{
        requestUri: `urn:ietf:params:oauth:request_uri:req-${string}`;
        expiresAt: Date;
        parameters: Readonly<{
            client_id: string;
            response_type: "code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token";
            scope?: string | undefined;
            redirect_uri?: `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}` | undefined;
            authorization_details?: {
                type: string;
                locations?: `${string}:${string}`[] | undefined;
                actions?: string[] | undefined;
                datatypes?: string[] | undefined;
                identifier?: string | undefined;
                privileges?: string[] | undefined;
            }[] | undefined;
            nonce?: string | undefined;
            state?: string | undefined;
            code_challenge?: string | undefined;
            code_challenge_method?: "S256" | "plain" | undefined;
            dpop_jkt?: string | undefined;
            response_mode?: "query" | "fragment" | "form_post" | undefined;
            max_age?: number | undefined;
            claims?: Partial<Record<"id_token" | "userinfo", Partial<Record<"email" | "auth_time" | "nonce" | "acr" | "name" | "family_name" | "given_name" | "middle_name" | "nickname" | "preferred_username" | "gender" | "picture" | "profile" | "website" | "birthdate" | "zoneinfo" | "locale" | "updated_at" | "email_verified" | "phone_number" | "phone_number_verified" | "address", {
                value?: string | number | boolean | undefined;
                values?: (string | number | boolean)[] | undefined;
                essential?: boolean | undefined;
            } | null>>>> | undefined;
            login_hint?: string | undefined;
            ui_locales?: string | undefined;
            id_token_hint?: `${string}.${string}.${string}` | undefined;
            display?: "page" | "popup" | "touch" | "wap" | undefined;
            prompt?: "none" | "login" | "consent" | "select_account" | "create" | undefined;
        }>;
    }>;
    protected validate(client: Client, clientAuth: null | ClientAuth, parameters: Readonly<OAuthAuthorizationRequestParameters>): Promise<Readonly<OAuthAuthorizationRequestParameters>>;
    /**
     * Reads the {@link ClientId} associated with a request URI without any of
     * the validation or side-effects performed by {@link RequestManager.get}
     *
     * Returns `undefined` when no such request exists.
     */
    peekClientId(requestUri: RequestUri): Promise<ClientId | undefined>;
    get(requestUri: RequestUri, deviceId?: DeviceId, clientId?: ClientId): Promise<{
        requestUri: `urn:ietf:params:oauth:request_uri:req-${string}`;
        expiresAt: Date;
        parameters: Readonly<{
            client_id: string;
            response_type: "code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token";
            scope?: string | undefined;
            redirect_uri?: `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}` | undefined;
            authorization_details?: {
                type: string;
                locations?: `${string}:${string}`[] | undefined;
                actions?: string[] | undefined;
                datatypes?: string[] | undefined;
                identifier?: string | undefined;
                privileges?: string[] | undefined;
            }[] | undefined;
            nonce?: string | undefined;
            state?: string | undefined;
            code_challenge?: string | undefined;
            code_challenge_method?: "S256" | "plain" | undefined;
            dpop_jkt?: string | undefined;
            response_mode?: "query" | "fragment" | "form_post" | undefined;
            max_age?: number | undefined;
            claims?: Partial<Record<"id_token" | "userinfo", Partial<Record<"email" | "auth_time" | "nonce" | "acr" | "name" | "family_name" | "given_name" | "middle_name" | "nickname" | "preferred_username" | "gender" | "picture" | "profile" | "website" | "birthdate" | "zoneinfo" | "locale" | "updated_at" | "email_verified" | "phone_number" | "phone_number_verified" | "address", {
                value?: string | number | boolean | undefined;
                values?: (string | number | boolean)[] | undefined;
                essential?: boolean | undefined;
            } | null>>>> | undefined;
            login_hint?: string | undefined;
            ui_locales?: string | undefined;
            id_token_hint?: `${string}.${string}.${string}` | undefined;
            display?: "page" | "popup" | "touch" | "wap" | undefined;
            prompt?: "none" | "login" | "consent" | "select_account" | "create" | undefined;
        }>;
        clientId: string;
    }>;
    setAuthorized(requestUri: RequestUri, client: Client, account: Account, deviceId: DeviceId, deviceMetadata: RequestMetadata, scopeOverride?: string): Promise<Code>;
    /**
     * @note If this method throws an error, any token previously generated from
     * the same `code` **must** me revoked.
     */
    consumeCode(code: Code): Promise<RequestDataAuthorized>;
    delete(requestUri: RequestUri): Promise<void>;
}
//# sourceMappingURL=request-manager.d.ts.map
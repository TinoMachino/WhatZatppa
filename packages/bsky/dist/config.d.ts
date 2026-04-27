import { DidString } from '@atproto/lex';
type LiveNowConfig = {
    did: DidString;
    domains: string[];
}[];
export interface KwsConfig {
    apiKey: string;
    apiOrigin: string;
    authOrigin: string;
    clientId: string;
    redirectUrl: string;
    userAgent: string;
    /**
     * V1 secret used to validate `adult-verifieid` redirects
     */
    verificationSecret: string;
    /**
     * V1 secret used to validate `adult-verified` webhooks
     */
    webhookSecret: string;
    /**
     * V2 secret used to validate `age-verified` webhooks
     */
    ageVerifiedWebhookSecret: string;
    /**
     * V2 secret used to validate `age-verified` redirects
     */
    ageVerifiedRedirectSecret: string;
}
export interface ServerConfigValues {
    version?: string;
    debugMode?: boolean;
    port?: number;
    publicUrl?: string;
    serverDid: string;
    alternateAudienceDids: string[];
    entrywayJwtPublicKeyHex?: string;
    liveNowConfig?: LiveNowConfig;
    etcdHosts: string[];
    dataplaneUrls: string[];
    dataplaneUrlsEtcdKeyPrefix?: string;
    dataplaneHttpVersion?: '1.1' | '2';
    dataplaneIgnoreBadTls?: boolean;
    bsyncUrl: string;
    bsyncApiKey?: string;
    bsyncHttpVersion?: '1.1' | '2';
    bsyncIgnoreBadTls?: boolean;
    courierUrl?: string;
    courierApiKey?: string;
    courierHttpVersion?: '1.1' | '2';
    courierIgnoreBadTls?: boolean;
    rolodexUrl?: string;
    rolodexApiKey?: string;
    rolodexHttpVersion?: '1.1' | '2';
    rolodexIgnoreBadTls?: boolean;
    searchUrl?: string;
    searchTagsHide: Set<string>;
    suggestionsUrl?: string;
    suggestionsApiKey?: string;
    topicsUrl?: string;
    topicsApiKey?: string;
    cdnUrl?: string;
    videoPlaylistUrlPattern?: string;
    videoThumbnailUrlPattern?: string;
    blobRateLimitBypassKey?: string;
    blobRateLimitBypassHostname?: string;
    didPlcUrl: string;
    handleResolveNameservers?: string[];
    modServiceDid: string;
    adminPasswords: string[];
    labelsFromIssuerDids?: string[];
    indexedAtEpoch?: Date;
    blobCacheLocation?: string;
    eventProxyTrackingEndpoint?: string;
    growthBookApiHost?: string;
    growthBookClientKey?: string;
    bigThreadUris: Set<string>;
    bigThreadDepth?: number;
    maxThreadDepth?: number;
    maxThreadParents: number;
    threadTagsHide: Set<string>;
    threadTagsBumpDown: Set<string>;
    visibilityTagHide: string;
    visibilityTagRankPrefix: string;
    notificationsDelayMs?: number;
    clientCheckEmailConfirmed?: boolean;
    topicsEnabled?: boolean;
    disableSsrfProtection?: boolean;
    proxyAllowHTTP2?: boolean;
    proxyHeadersTimeout?: number;
    proxyBodyTimeout?: number;
    proxyMaxResponseSize?: number;
    proxyMaxRetries?: number;
    proxyPreferCompressed?: boolean;
    kws?: KwsConfig;
    debugFieldAllowedDids: Set<string>;
    draftsLimit: number;
    communityCreatorDids: string[];
}
export declare class ServerConfig {
    private cfg;
    private assignedPort?;
    constructor(cfg: ServerConfigValues);
    static readEnv(overrides?: Partial<ServerConfigValues>): ServerConfig;
    assignPort(port: number): void;
    get version(): string | undefined;
    get debugMode(): boolean;
    get port(): number | undefined;
    get publicUrl(): string | undefined;
    get serverDid(): string;
    get alternateAudienceDids(): string[];
    get entrywayJwtPublicKeyHex(): string | undefined;
    get liveNowConfig(): LiveNowConfig | undefined;
    get etcdHosts(): string[];
    get dataplaneUrlsEtcdKeyPrefix(): string | undefined;
    get dataplaneUrls(): string[];
    get dataplaneHttpVersion(): "2" | "1.1" | undefined;
    get dataplaneIgnoreBadTls(): boolean | undefined;
    get bsyncUrl(): string;
    get bsyncApiKey(): string | undefined;
    get bsyncHttpVersion(): "2" | "1.1" | undefined;
    get bsyncIgnoreBadTls(): boolean | undefined;
    get courierUrl(): string | undefined;
    get courierApiKey(): string | undefined;
    get courierHttpVersion(): "2" | "1.1" | undefined;
    get courierIgnoreBadTls(): boolean | undefined;
    get rolodexUrl(): string | undefined;
    get rolodexApiKey(): string | undefined;
    get rolodexHttpVersion(): "2" | "1.1" | undefined;
    get rolodexIgnoreBadTls(): boolean | undefined;
    get searchUrl(): string | undefined;
    get searchTagsHide(): Set<string>;
    get suggestionsUrl(): string | undefined;
    get suggestionsApiKey(): string | undefined;
    get topicsUrl(): string | undefined;
    get topicsApiKey(): string | undefined;
    get cdnUrl(): string | undefined;
    get videoPlaylistUrlPattern(): string | undefined;
    get videoThumbnailUrlPattern(): string | undefined;
    get blobRateLimitBypassKey(): string | undefined;
    get blobRateLimitBypassHostname(): string | undefined;
    get didPlcUrl(): string;
    get handleResolveNameservers(): string[] | undefined;
    get adminPasswords(): string[];
    get modServiceDid(): string;
    get labelsFromIssuerDids(): DidString[];
    get blobCacheLocation(): string | undefined;
    get eventProxyTrackingEndpoint(): string | undefined;
    get growthBookApiHost(): string | undefined;
    get growthBookClientKey(): string | undefined;
    get clientCheckEmailConfirmed(): boolean | undefined;
    get topicsEnabled(): boolean | undefined;
    get indexedAtEpoch(): Date | undefined;
    get bigThreadUris(): Set<string>;
    get bigThreadDepth(): number | undefined;
    get maxThreadDepth(): number | undefined;
    get maxThreadParents(): number;
    get threadTagsHide(): Set<string>;
    get threadTagsBumpDown(): Set<string>;
    get visibilityTagHide(): string;
    get visibilityTagRankPrefix(): string;
    get notificationsDelayMs(): number;
    get disableSsrfProtection(): boolean;
    get proxyAllowHTTP2(): boolean;
    get proxyHeadersTimeout(): number;
    get proxyBodyTimeout(): number;
    get proxyMaxResponseSize(): number;
    get proxyMaxRetries(): number;
    get proxyPreferCompressed(): boolean;
    get kws(): KwsConfig | undefined;
    get debugFieldAllowedDids(): Set<string>;
    get draftsLimit(): number;
    get communityCreatorDids(): string[];
}
export {};
//# sourceMappingURL=config.d.ts.map
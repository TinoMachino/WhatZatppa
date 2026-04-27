import { Client } from '@atproto/lex';
export type AppViewOptions = {
    url: string;
    did: string;
    cdnUrlPattern?: string;
    validateResponse?: boolean;
};
export declare class BskyAppView {
    did: string;
    url: string;
    client: Client;
    private cdnUrlPattern?;
    constructor(options: AppViewOptions);
    getImageUrl(pattern: string, did: string, cid: string): string | undefined;
}
//# sourceMappingURL=bsky-app-view.d.ts.map
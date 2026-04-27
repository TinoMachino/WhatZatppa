import { Client } from '@atproto/lex';
export type AppViewOptions = {
    url: string;
    did: string;
    cdnUrlPattern?: string;
};
export declare class AppView {
    did: string;
    client: Client;
    private cdnUrlPattern?;
    constructor(options: AppViewOptions);
    getImageUrl(pattern: string, did: string, cid: string): string | undefined;
}
//# sourceMappingURL=app-view.d.ts.map
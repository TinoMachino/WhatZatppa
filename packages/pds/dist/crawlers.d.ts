import { BackgroundQueue } from './background.js';
export declare class Crawlers {
    private readonly backgroundQueue;
    private readonly hostname;
    private readonly crawlers;
    private lastNotified;
    constructor(backgroundQueue: BackgroundQueue, hostname: string, crawlers: Iterable<string>);
    notifyOfUpdate(): void;
    private requestCrawl;
}
//# sourceMappingURL=crawlers.d.ts.map
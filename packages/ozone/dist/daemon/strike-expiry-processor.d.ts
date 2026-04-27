import { Database } from '../db';
import { StrikeServiceCreator } from '../mod-service/strike';
export declare class StrikeExpiryProcessor {
    private db;
    private strikeServiceCreator;
    destroyed: boolean;
    processingPromise: Promise<void>;
    timer?: NodeJS.Timeout;
    constructor(db: Database, strikeServiceCreator: StrikeServiceCreator);
    start(): void;
    poll(): void;
    destroy(): Promise<void>;
    initializeCursor(): Promise<void>;
    getCursor(): Promise<string | null>;
    updateCursor(cursor: string): Promise<void>;
    processExpiredStrikes(): Promise<void>;
}
//# sourceMappingURL=strike-expiry-processor.d.ts.map
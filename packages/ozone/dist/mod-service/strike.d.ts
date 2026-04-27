import { Database } from '../db';
export type StrikeServiceCreator = (db: Database) => StrikeService;
export declare class StrikeService {
    private db;
    constructor(db: Database);
    static creator(): (db: Database) => StrikeService;
    /**
     * Update the strike count in account_strike table
     */
    updateSubjectStrikeCount(subjectDid: string): Promise<void>;
    /**
     * Get distinct subjects with expired strikes since a given timestamp
     * Used by the strike expiry processor to find accounts that need strike count updates
     */
    getExpiredStrikeSubjects(afterTimestamp?: string): Promise<Array<{
        subjectDid: string;
    }>>;
}
//# sourceMappingURL=strike.d.ts.map
export declare const accountStrikeTableName = "account_strike";
export interface AccountStrike {
    did: string;
    firstStrikeAt: string | null;
    lastStrikeAt: string | null;
    activeStrikeCount: number;
    totalStrikeCount: number;
}
export type PartialDB = {
    [accountStrikeTableName]: AccountStrike;
};
//# sourceMappingURL=account_strike.d.ts.map
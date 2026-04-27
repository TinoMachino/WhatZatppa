import { l } from '@atproto/lex';
declare const $nsid = "com.para.discourse.getSnapshot";
export { $nsid };
/** Get aggregate discourse metrics for a community. */
declare const main: l.Query<"com.para.discourse.getSnapshot", l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, l.Payload<"application/json", l.ObjectSchema<{
    snapshots: l.ArraySchema<l.RefSchema<l.Validator<Snapshot, Snapshot>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.discourse.getSnapshot", $params: l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    snapshots: l.ArraySchema<l.RefSchema<l.Validator<Snapshot, Snapshot>>>;
}>>;
type Snapshot = {
    $type?: 'com.para.discourse.getSnapshot#snapshot';
    community: string;
    bucket: l.DatetimeString;
    postCount: number;
    uniqueAuthors: number;
    /**
     * Scaled 0-100
     */
    avgConstructiveness?: number;
    /**
     * Scaled 0-100
     */
    semanticVolatility?: number;
    /**
     * Scaled 0-100
     */
    lexicalDiversity?: number;
    /**
     * Scaled 0-100
     */
    polarizationDelta?: number;
    /**
     * Scaled 0-100
     */
    echoChamberIndex?: number;
    topKeywords?: string;
    sentimentDistribution?: string;
};
export type { Snapshot };
declare const snapshot: l.TypedObjectSchema<"com.para.discourse.getSnapshot#snapshot", l.Validator<Snapshot, Snapshot>>;
export { snapshot };
//# sourceMappingURL=getSnapshot.defs.d.ts.map
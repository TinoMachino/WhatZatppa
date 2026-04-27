import { l } from '@atproto/lex';
declare const $nsid = "com.para.discourse.getSentiment";
export { $nsid };
/** Get the sentiment breakdown for a community. */
declare const main: l.Query<"com.para.discourse.getSentiment", l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, l.Payload<"application/json", l.ObjectSchema<{
    sentiment: l.RefSchema<l.Validator<SentimentDistribution, SentimentDistribution>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.discourse.getSentiment", $params: l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    sentiment: l.RefSchema<l.Validator<SentimentDistribution, SentimentDistribution>>;
}>>;
type SentimentDistribution = {
    $type?: 'com.para.discourse.getSentiment#sentimentDistribution';
    /**
     * Scaled 0-100
     */
    anger: number;
    /**
     * Scaled 0-100
     */
    fear: number;
    /**
     * Scaled 0-100
     */
    trust: number;
    /**
     * Scaled 0-100
     */
    uncertainty: number;
    /**
     * Scaled 0-100
     */
    neutral: number;
};
export type { SentimentDistribution };
declare const sentimentDistribution: l.TypedObjectSchema<"com.para.discourse.getSentiment#sentimentDistribution", l.Validator<SentimentDistribution, SentimentDistribution>>;
export { sentimentDistribution };
//# sourceMappingURL=getSentiment.defs.d.ts.map
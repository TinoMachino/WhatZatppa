import { l } from '@atproto/lex';
declare const $nsid = "com.para.discourse.getTopics";
export { $nsid };
/** Get emergent topic clusters for a community. */
declare const main: l.Query<"com.para.discourse.getTopics", l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, l.Payload<"application/json", l.ObjectSchema<{
    topics: l.ArraySchema<l.RefSchema<l.Validator<Topic, Topic>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.discourse.getTopics", $params: l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{}>>;
    readonly timeframe: l.EnumSchema<"1h" | "24h" | "7d" | "30d">;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    topics: l.ArraySchema<l.RefSchema<l.Validator<Topic, Topic>>>;
}>>;
type Topic = {
    $type?: 'com.para.discourse.getTopics#topic';
    clusterLabel: string;
    keywords?: string;
    postCount: number;
    authorCount: number;
    /**
     * Scaled 0-100
     */
    avgSentiment?: number;
};
export type { Topic };
declare const topic: l.TypedObjectSchema<"com.para.discourse.getTopics#topic", l.Validator<Topic, Topic>>;
export { topic };
//# sourceMappingURL=getTopics.defs.d.ts.map
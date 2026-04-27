export declare const tableName = "post_subscription";
export interface PostSubscription {
    subscriberDid: string;
    postUri: string;
    indexedAt: string;
    reply: boolean;
    quote: boolean;
}
export type PartialDB = {
    [tableName]: PostSubscription;
};
//# sourceMappingURL=post-subscription.d.ts.map
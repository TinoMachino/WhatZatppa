import { l } from '@atproto/lex';
import * as FeedDefs from '../feed/defs.defs.js';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getPostThreadV2";
export { $nsid };
/** (NOTE: this endpoint is under development and WILL change without notice. Don't use it until it is moved out of `unspecced` or your application WILL break) Get posts in a thread. It is based in an anchor post at any depth of the tree, and returns posts above it (recursively resolving the parent, without further branching to their replies) and below it (recursive replies, with branching to their replies). Does not require auth, but additional metadata and filtering will be applied for authed requests. */
declare const main: l.Query<"app.bsky.unspecced.getPostThreadV2", l.ParamsSchema<{
    readonly anchor: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly above: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly below: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly branchingFactor: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["newest", "oldest", "top"];
    }>>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    thread: l.ArraySchema<l.RefSchema<l.Validator<ThreadItem, ThreadItem>>>;
    threadgate: l.OptionalSchema<l.RefSchema<l.Validator<FeedDefs.ThreadgateView, FeedDefs.ThreadgateView>>>;
    hasOtherReplies: l.BooleanSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getPostThreadV2", $params: l.ParamsSchema<{
    readonly anchor: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly above: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly below: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly branchingFactor: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["newest", "oldest", "top"];
    }>>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    thread: l.ArraySchema<l.RefSchema<l.Validator<ThreadItem, ThreadItem>>>;
    threadgate: l.OptionalSchema<l.RefSchema<l.Validator<FeedDefs.ThreadgateView, FeedDefs.ThreadgateView>>>;
    hasOtherReplies: l.BooleanSchema;
}>>;
type ThreadItem = {
    $type?: 'app.bsky.unspecced.getPostThreadV2#threadItem';
    uri: l.AtUriString;
    /**
     * The nesting level of this item in the thread. Depth 0 means the anchor item. Items above have negative depths, items below have positive depths.
     */
    depth: number;
    value: l.$Typed<UnspeccedDefs.ThreadItemPost> | l.$Typed<UnspeccedDefs.ThreadItemNoUnauthenticated> | l.$Typed<UnspeccedDefs.ThreadItemNotFound> | l.$Typed<UnspeccedDefs.ThreadItemBlocked> | l.Unknown$TypedObject;
};
export type { ThreadItem };
declare const threadItem: l.TypedObjectSchema<"app.bsky.unspecced.getPostThreadV2#threadItem", l.Validator<ThreadItem, ThreadItem>>;
export { threadItem };
//# sourceMappingURL=getPostThreadV2.defs.d.ts.map
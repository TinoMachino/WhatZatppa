import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getPostThreadOtherV2";
export { $nsid };
/** (NOTE: this endpoint is under development and WILL change without notice. Don't use it until it is moved out of `unspecced` or your application WILL break) Get additional posts under a thread e.g. replies hidden by threadgate. Based on an anchor post at any depth of the tree, returns top-level replies below that anchor. It does not include ancestors nor the anchor itself. This should be called after exhausting `app.bsky.unspecced.getPostThreadV2`. Does not require auth, but additional metadata and filtering will be applied for authed requests. */
declare const main: l.Query<"app.bsky.unspecced.getPostThreadOtherV2", l.ParamsSchema<{
    readonly anchor: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    thread: l.ArraySchema<l.RefSchema<l.Validator<ThreadItem, ThreadItem>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getPostThreadOtherV2", $params: l.ParamsSchema<{
    readonly anchor: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    thread: l.ArraySchema<l.RefSchema<l.Validator<ThreadItem, ThreadItem>>>;
}>>;
type ThreadItem = {
    $type?: 'app.bsky.unspecced.getPostThreadOtherV2#threadItem';
    uri: l.AtUriString;
    /**
     * The nesting level of this item in the thread. Depth 0 means the anchor item. Items above have negative depths, items below have positive depths.
     */
    depth: number;
    value: l.$Typed<UnspeccedDefs.ThreadItemPost> | l.Unknown$TypedObject;
};
export type { ThreadItem };
declare const threadItem: l.TypedObjectSchema<"app.bsky.unspecced.getPostThreadOtherV2#threadItem", l.Validator<ThreadItem, ThreadItem>>;
export { threadItem };
//# sourceMappingURL=getPostThreadOtherV2.defs.d.ts.map
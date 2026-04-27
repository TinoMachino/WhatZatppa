import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getFeedGenerator";
export { $nsid };
/** Get information about a feed generator. Implemented by AppView. */
declare const main: l.Query<"app.bsky.feed.getFeedGenerator", l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    view: l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>;
    isOnline: l.BooleanSchema;
    isValid: l.BooleanSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getFeedGenerator", $params: l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    view: l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>;
    isOnline: l.BooleanSchema;
    isValid: l.BooleanSchema;
}>>;
//# sourceMappingURL=getFeedGenerator.defs.d.ts.map
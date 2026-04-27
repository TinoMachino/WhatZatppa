import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.sendInteractions";
export { $nsid };
/** Send information about interactions with feed items back to the feed generator that served them. */
declare const main: l.Procedure<"app.bsky.feed.sendInteractions", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    feed: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    interactions: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.Interaction, FeedDefs.Interaction>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.sendInteractions", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    feed: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    interactions: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.Interaction, FeedDefs.Interaction>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=sendInteractions.defs.d.ts.map
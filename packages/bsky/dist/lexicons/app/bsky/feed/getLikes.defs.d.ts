import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.feed.getLikes";
export { $nsid };
/** Get like records which reference a subject (by AT-URI and CID). */
declare const main: l.Query<"app.bsky.feed.getLikes", l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    likes: l.ArraySchema<l.RefSchema<l.Validator<Like, Like>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getLikes", $params: l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    likes: l.ArraySchema<l.RefSchema<l.Validator<Like, Like>>>;
}>>;
type Like = {
    $type?: 'app.bsky.feed.getLikes#like';
    indexedAt: l.DatetimeString;
    createdAt: l.DatetimeString;
    actor: ActorDefs.ProfileView;
};
export type { Like };
declare const like: l.TypedObjectSchema<"app.bsky.feed.getLikes#like", l.Validator<Like, Like>>;
export { like };
//# sourceMappingURL=getLikes.defs.d.ts.map
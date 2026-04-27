import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
declare const $nsid = "app.bsky.graph.getSuggestedFollowsByActor";
export { $nsid };
/** Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account. */
declare const main: l.Query<"app.bsky.graph.getSuggestedFollowsByActor", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    suggestions: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
    isFallback: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    recId: l.OptionalSchema<l.IntegerSchema>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getSuggestedFollowsByActor", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    suggestions: l.ArraySchema<l.RefSchema<l.Validator<ActorDefs.ProfileView, ActorDefs.ProfileView>>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
    isFallback: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    recId: l.OptionalSchema<l.IntegerSchema>;
}>>;
//# sourceMappingURL=getSuggestedFollowsByActor.defs.d.ts.map
import { l } from '@atproto/lex';
import * as ActorDefs from './defs.defs.js';
declare const $nsid = "com.para.actor.getProfileStats";
export { $nsid };
/** Get Para profile stats and current Para status for an actor. */
declare const main: l.Query<"com.para.actor.getProfileStats", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "did";
    }>;
    stats: l.RefSchema<l.Validator<ActorDefs.ProfileStats, ActorDefs.ProfileStats>>;
    status: l.OptionalSchema<l.RefSchema<l.Validator<ActorDefs.StatusView, ActorDefs.StatusView>>>;
}>>, readonly ["NotFound", "BlockedActor", "BlockedByActor"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.actor.getProfileStats", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "did";
    }>;
    stats: l.RefSchema<l.Validator<ActorDefs.ProfileStats, ActorDefs.ProfileStats>>;
    status: l.OptionalSchema<l.RefSchema<l.Validator<ActorDefs.StatusView, ActorDefs.StatusView>>>;
}>>;
//# sourceMappingURL=getProfileStats.defs.d.ts.map
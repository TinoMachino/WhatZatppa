import { l } from '@atproto/lex';
import * as TeamDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.team.addMember";
export { $nsid };
/** Add a member to the ozone team. Requires admin role. */
declare const main: l.Procedure<"tools.ozone.team.addMember", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    role: l.StringSchema<{
        knownValues: ["tools.ozone.team.defs#roleAdmin", "tools.ozone.team.defs#roleModerator", "tools.ozone.team.defs#roleVerifier", "tools.ozone.team.defs#roleTriage"];
    }>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<TeamDefs.Member, TeamDefs.Member>>>, readonly ["MemberAlreadyExists"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.team.addMember", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    role: l.StringSchema<{
        knownValues: ["tools.ozone.team.defs#roleAdmin", "tools.ozone.team.defs#roleModerator", "tools.ozone.team.defs#roleVerifier", "tools.ozone.team.defs#roleTriage"];
    }>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<TeamDefs.Member, TeamDefs.Member>>>;
//# sourceMappingURL=addMember.defs.d.ts.map
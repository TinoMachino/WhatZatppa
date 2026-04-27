import { l } from '@atproto/lex';
import * as TeamDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.team.listMembers";
export { $nsid };
/** List all members with access to the ozone service. */
declare const main: l.Query<"tools.ozone.team.listMembers", l.ParamsSchema<{
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly disabled: l.OptionalSchema<l.BooleanSchema>;
    readonly roles: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    members: l.ArraySchema<l.RefSchema<l.Validator<TeamDefs.Member, TeamDefs.Member>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.team.listMembers", $params: l.ParamsSchema<{
    readonly q: l.OptionalSchema<l.StringSchema<{}>>;
    readonly disabled: l.OptionalSchema<l.BooleanSchema>;
    readonly roles: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    members: l.ArraySchema<l.RefSchema<l.Validator<TeamDefs.Member, TeamDefs.Member>>>;
}>>;
//# sourceMappingURL=listMembers.defs.d.ts.map
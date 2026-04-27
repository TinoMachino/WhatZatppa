import { l } from '@atproto/lex';
import * as ActorDefs from '../../../app/bsky/actor/defs.defs.js';
declare const $nsid = "tools.ozone.team.defs";
export { $nsid };
type Member = {
    $type?: 'tools.ozone.team.defs#member';
    did: l.DidString;
    disabled?: boolean;
    profile?: ActorDefs.ProfileViewDetailed;
    createdAt?: l.DatetimeString;
    updatedAt?: l.DatetimeString;
    lastUpdatedBy?: string;
    role: 'tools.ozone.team.defs#roleAdmin' | 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | 'tools.ozone.team.defs#roleVerifier' | l.UnknownString;
};
export type { Member };
declare const member: l.TypedObjectSchema<"tools.ozone.team.defs#member", l.Validator<Member, Member>>;
export { member };
/** Admin role. Highest level of access, can perform all actions. */
type RoleAdmin = 'tools.ozone.team.defs#roleAdmin';
export type { RoleAdmin };
/** Admin role. Highest level of access, can perform all actions. */
declare const roleAdmin: l.TokenSchema<"tools.ozone.team.defs#roleAdmin">;
export { roleAdmin };
/** Moderator role. Can perform most actions. */
type RoleModerator = 'tools.ozone.team.defs#roleModerator';
export type { RoleModerator };
/** Moderator role. Can perform most actions. */
declare const roleModerator: l.TokenSchema<"tools.ozone.team.defs#roleModerator">;
export { roleModerator };
/** Triage role. Mostly intended for monitoring and escalating issues. */
type RoleTriage = 'tools.ozone.team.defs#roleTriage';
export type { RoleTriage };
/** Triage role. Mostly intended for monitoring and escalating issues. */
declare const roleTriage: l.TokenSchema<"tools.ozone.team.defs#roleTriage">;
export { roleTriage };
/** Verifier role. Only allowed to issue verifications. */
type RoleVerifier = 'tools.ozone.team.defs#roleVerifier';
export type { RoleVerifier };
/** Verifier role. Only allowed to issue verifications. */
declare const roleVerifier: l.TokenSchema<"tools.ozone.team.defs#roleVerifier">;
export { roleVerifier };
//# sourceMappingURL=defs.defs.d.ts.map
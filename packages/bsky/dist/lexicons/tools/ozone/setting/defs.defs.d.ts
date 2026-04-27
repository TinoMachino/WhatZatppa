import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.setting.defs";
export { $nsid };
type Option = {
    $type?: 'tools.ozone.setting.defs#option';
    key: l.NsidString;
    did: l.DidString;
    value: l.LexMap;
    description?: string;
    createdAt?: l.DatetimeString;
    updatedAt?: l.DatetimeString;
    managerRole?: 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | 'tools.ozone.team.defs#roleAdmin' | 'tools.ozone.team.defs#roleVerifier' | l.UnknownString;
    scope: 'instance' | 'personal' | l.UnknownString;
    createdBy: l.DidString;
    lastUpdatedBy: l.DidString;
};
export type { Option };
declare const option: l.TypedObjectSchema<"tools.ozone.setting.defs#option", l.Validator<Option, Option>>;
export { option };
//# sourceMappingURL=defs.defs.d.ts.map
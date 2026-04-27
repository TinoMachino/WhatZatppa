import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.set.defs";
export { $nsid };
type Set$0 = {
    $type?: 'tools.ozone.set.defs#set';
    name: string;
    description?: string;
};
export type { Set$0 as Set };
declare const set$0: l.TypedObjectSchema<"tools.ozone.set.defs#set", l.Validator<Set$0, Set$0>>;
export { set$0 as 'set' };
type SetView = {
    $type?: 'tools.ozone.set.defs#setView';
    name: string;
    description?: string;
    setSize: number;
    createdAt: l.DatetimeString;
    updatedAt: l.DatetimeString;
};
export type { SetView };
declare const setView: l.TypedObjectSchema<"tools.ozone.set.defs#setView", l.Validator<SetView, SetView>>;
export { setView };
//# sourceMappingURL=defs.defs.d.ts.map
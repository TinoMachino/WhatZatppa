import { app } from '../../lexicons/index.js';
export type PrefAllowedOptions = {
    hasAccessFull?: boolean;
};
export declare function prefAllowed(prefType: string, options?: PrefAllowedOptions): boolean;
export declare function isFullAccessOnlyPref(type: string): type is typeof app.bsky.actor.defs.personalDetailsPref.$type;
export declare function isReadOnlyPref(type: string): type is typeof app.bsky.actor.defs.declaredAgePref.$type;
export declare function getAgeFromDatestring(birthDate: string): number;
//# sourceMappingURL=util.d.ts.map
import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.sync.defs";
export { $nsid };
type HostStatus = 'active' | 'idle' | 'offline' | 'throttled' | 'banned' | l.UnknownString;
export type { HostStatus };
declare const hostStatus: l.StringSchema<{
    knownValues: ["active", "idle", "offline", "throttled", "banned"];
}>;
export { hostStatus };
//# sourceMappingURL=defs.defs.d.ts.map
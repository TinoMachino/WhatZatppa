import { AtprotoAudience, isAtprotoAudience } from '@atproto/did';
import { Nsid, isNsid } from '../lib/nsid.js';
import { Parser } from '../lib/parser.js';
import { ResourcePermission } from '../lib/resource-permission.js';
import { NeRoArray, ScopeSyntax } from '../lib/syntax.js';
export { type AtprotoAudience, type Nsid, isAtprotoAudience, isNsid };
export type LxmParam = '*' | Nsid;
export declare const isLxmParam: (value: unknown) => value is LxmParam;
export type AudParam = '*' | AtprotoAudience;
export declare const isAudParam: (value: unknown) => value is AudParam;
export type RpcPermissionMatch = {
    lxm: string;
    aud: string;
};
export declare class RpcPermission implements ResourcePermission<'rpc', RpcPermissionMatch> {
    readonly aud: '*' | AtprotoAudience;
    readonly lxm: NeRoArray<'*' | Nsid>;
    constructor(aud: '*' | AtprotoAudience, lxm: NeRoArray<'*' | Nsid>);
    matches(options: RpcPermissionMatch): boolean;
    toString(): import("../lib/syntax.js").ScopeStringFor<"rpc">;
    protected static readonly parser: Parser<"rpc", {
        lxm: {
            multiple: true;
            required: true;
            validate: (value: unknown) => value is LxmParam;
            normalize: (value: NeRoArray<import("../lib/syntax.js").ParamValue>) => readonly ["*"] | [`${string}.${string}.${string}`, ...`${string}.${string}.${string}`[]];
        };
        aud: {
            multiple: false;
            required: true;
            validate: (value: unknown) => value is AudParam;
        };
    }>;
    static fromString(scope: string): RpcPermission | null;
    static fromSyntax(syntax: ScopeSyntax<'rpc'>): RpcPermission | null;
    static scopeNeededFor(options: RpcPermissionMatch): string;
}
//# sourceMappingURL=rpc-permission.d.ts.map
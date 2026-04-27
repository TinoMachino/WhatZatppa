import { Parser } from '../lib/parser.js';
import { ResourcePermission } from '../lib/resource-permission.js';
import { NeRoArray, ScopeSyntax } from '../lib/syntax.js';
export declare const ACCOUNT_ATTRIBUTES: readonly ["email", "repo", "status"];
export type AccountAttribute = (typeof ACCOUNT_ATTRIBUTES)[number];
export declare const ACCOUNT_ACTIONS: readonly ["read", "manage"];
export type AccountAction = (typeof ACCOUNT_ACTIONS)[number];
export type AccountPermissionMatch = {
    attr: AccountAttribute;
    action: AccountAction;
};
export declare class AccountPermission implements ResourcePermission<'account', AccountPermissionMatch> {
    readonly attr: AccountAttribute;
    readonly action: NeRoArray<AccountAction>;
    constructor(attr: AccountAttribute, action: NeRoArray<AccountAction>);
    matches(options: AccountPermissionMatch): boolean;
    toString(): import("../lib/syntax.js").ScopeStringFor<"account">;
    protected static readonly parser: Parser<"account", {
        attr: {
            multiple: false;
            required: true;
            validate: (value: unknown) => value is "email" | "repo" | "status";
        };
        action: {
            multiple: true;
            required: false;
            validate: (value: unknown) => value is "read" | "manage";
            default: ["read"];
        };
    }>;
    static fromString(scope: string): AccountPermission | null;
    static fromSyntax(syntax: ScopeSyntax<'account'>): AccountPermission | null;
    static scopeNeededFor(options: AccountPermissionMatch): import("../lib/syntax.js").ScopeStringFor<"account">;
}
//# sourceMappingURL=account-permission.d.ts.map
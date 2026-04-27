import { Parser } from '../lib/parser.js';
import { ResourcePermission } from '../lib/resource-permission.js';
import { ScopeSyntax } from '../lib/syntax.js';
export declare const IDENTITY_ATTRIBUTES: readonly ["handle", "*"];
export type IdentityAttribute = (typeof IDENTITY_ATTRIBUTES)[number];
export type IdentityPermissionMatch = {
    attr: IdentityAttribute;
};
export declare class IdentityPermission implements ResourcePermission<'identity', IdentityPermissionMatch> {
    readonly attr: IdentityAttribute;
    constructor(attr: IdentityAttribute);
    matches(options: IdentityPermissionMatch): boolean;
    toString(): import("../lib/syntax.js").ScopeStringFor<"identity">;
    protected static readonly parser: Parser<"identity", {
        attr: {
            multiple: false;
            required: true;
            validate: (value: unknown) => value is "*" | "handle";
        };
    }>;
    static fromString(scope: string): IdentityPermission | null;
    static fromSyntax(syntax: ScopeSyntax<'identity'>): IdentityPermission | null;
    static scopeNeededFor(options: IdentityPermissionMatch): string;
}
//# sourceMappingURL=identity-permission.d.ts.map
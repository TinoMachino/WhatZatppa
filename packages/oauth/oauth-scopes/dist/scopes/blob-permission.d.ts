import { Accept, isAccept } from '../lib/mime.js';
import { Parser } from '../lib/parser.js';
import { ResourcePermission } from '../lib/resource-permission.js';
import { NeArray, NeRoArray, ParamValue, ScopeSyntax } from '../lib/syntax.js';
export { type Accept };
export declare const DEFAULT_ACCEPT: readonly ["*/*"];
export type BlobPermissionMatch = {
    mime: string;
};
export declare class BlobPermission implements ResourcePermission<'blob', BlobPermissionMatch> {
    readonly accept: NeRoArray<Accept>;
    constructor(accept: NeRoArray<Accept>);
    matches(options: BlobPermissionMatch): boolean;
    toString(): import("../lib/syntax.js").ScopeStringFor<"blob">;
    protected static readonly parser: Parser<"blob", {
        accept: {
            multiple: true;
            required: true;
            validate: typeof isAccept;
            normalize: (value: NeRoArray<ParamValue>) => readonly ["*/*"] | NeArray<Accept>;
        };
    }>;
    static fromString(scope: string): BlobPermission | null;
    static fromSyntax(syntax: ScopeSyntax<'blob'>): BlobPermission | null;
    static scopeNeededFor(options: BlobPermissionMatch): import("../lib/syntax.js").ScopeStringFor<"blob">;
}
//# sourceMappingURL=blob-permission.d.ts.map
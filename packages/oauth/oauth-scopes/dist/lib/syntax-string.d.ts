import { ScopeStringFor, ScopeSyntax } from './syntax.js';
/**
 * Translates a scope string into a {@link ScopeSyntax}.
 */
export declare class ScopeStringSyntax<P extends string> implements ScopeSyntax<P> {
    readonly prefix: P;
    readonly positional?: string | undefined;
    readonly params?: Readonly<URLSearchParams> | undefined;
    constructor(prefix: P, positional?: string | undefined, params?: Readonly<URLSearchParams> | undefined);
    keys(): Generator<string, void, unknown>;
    getSingle(key: string): string | null | undefined;
    getMulti(key: string): string[] | undefined;
    toString(): ScopeStringFor<P>;
    static fromString<P extends string>(scopeValue: ScopeStringFor<P>): ScopeStringSyntax<P>;
}
//# sourceMappingURL=syntax-string.d.ts.map
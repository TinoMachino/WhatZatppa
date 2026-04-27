export type ParamValue = string | number | boolean;
export type NeArray<T> = [T, ...T[]];
/**
 * Non-empty readonly array
 */
export type NeRoArray<T> = readonly [T, ...T[]];
export type ScopeStringFor<P extends string> = P | `${P}:${string}` | `${P}?${string}`;
/**
 * Allows to quickly check if a scope is for a specific resource.
 */
export declare function isScopeStringFor<P extends string>(value: string, prefix: P): value is ScopeStringFor<P>;
/**
 * Abstract interface that allows parsing various syntaxes into permission
 * representations.
 */
export interface ScopeSyntax<P extends string> {
    readonly prefix: P;
    readonly positional?: ParamValue;
    keys(): Iterable<string, void, unknown>;
    getSingle(key: string): ParamValue | null | undefined;
    getMulti(key: string): readonly ParamValue[] | null | undefined;
}
export declare function isScopeSyntaxFor<P extends string>(syntax: ScopeSyntax<string>, prefix: P): syntax is ScopeSyntax<P>;
//# sourceMappingURL=syntax.d.ts.map
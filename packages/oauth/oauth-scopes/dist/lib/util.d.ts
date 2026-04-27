export interface Matchable<T> {
    matches(options: T): boolean;
}
export declare function minIdx(a: number, b: number): number;
export declare function knownValuesValidator<T>(values: Iterable<T>): (value: unknown) => value is T;
export declare function isNonNullable<T>(value: T): value is NonNullable<T>;
//# sourceMappingURL=util.d.ts.map
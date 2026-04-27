import { NeRoArray, ParamValue, ScopeSyntax } from './syntax.js';
type InferParamPredicate<T extends (value: ParamValue) => boolean> = T extends ((value: ParamValue) => value is infer U extends ParamValue) ? U : ParamValue;
type ParamsSchema = Record<string, {
    multiple: false;
    required: boolean;
    default?: ParamValue;
    normalize?: (value: ParamValue) => ParamValue;
    validate: (value: ParamValue) => boolean;
} | {
    multiple: true;
    required: boolean;
    default?: NeRoArray<ParamValue>;
    normalize?: (value: NeRoArray<ParamValue>) => NeRoArray<ParamValue>;
    validate: (value: ParamValue) => boolean;
}>;
type InferParams<S extends ParamsSchema> = {
    [K in keyof S]: (S[K]['required'] extends true ? never : 'default' extends keyof S[K] ? S[K]['default'] : undefined) | (S[K]['multiple'] extends true ? NeRoArray<InferParamPredicate<S[K]['validate']>> : InferParamPredicate<S[K]['validate']>);
} & NonNullable<unknown>;
export declare class Parser<P extends string, S extends ParamsSchema> {
    readonly prefix: P;
    readonly schema: S;
    readonly positionalName?: (keyof S & string) | undefined;
    readonly schemaKeys: ReadonlySet<keyof S & string>;
    constructor(prefix: P, schema: S, positionalName?: (keyof S & string) | undefined);
    format(values: InferParams<S>): import("./syntax.js").ScopeStringFor<P>;
    parse(syntax: ScopeSyntax<P>): { [K in keyof S]: (S[K]["required"] extends true ? never : "default" extends keyof S[K] ? S[K][keyof S[K] & "default"] : undefined) | (S[K]["multiple"] extends true ? NeRoArray<InferParamPredicate<S[K]["validate"]>> : InferParamPredicate<S[K]["validate"]>); } | null;
}
export {};
//# sourceMappingURL=parser.d.ts.map
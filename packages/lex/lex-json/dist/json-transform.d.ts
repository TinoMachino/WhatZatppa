export type JsonTransformOptions = {
    strict?: boolean;
    maxDepth?: number;
};
export declare function jsonTransform<T>(input: unknown, transform: (child: object) => unknown, { strict, maxDepth, }?: JsonTransformOptions): T;
//# sourceMappingURL=json-transform.d.ts.map
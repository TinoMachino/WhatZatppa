/** @internal */
export type ArrayFrame = {
    type: 'array';
    depth: number;
    parent?: ParentRef;
    input: readonly unknown[];
    copy: undefined | unknown[];
};
/** @internal */
export type ObjectFrame = {
    type: 'object';
    depth: number;
    parent?: ParentRef;
    input: object;
    entries: readonly [string, unknown][];
    copy: undefined | Record<string, unknown>;
};
/** @internal */
export type ParentRef = {
    frame: ArrayFrame;
    index: number;
} | {
    frame: ObjectFrame;
    index: number;
};
/** @internal */
export type StackFrame = ArrayFrame | ObjectFrame;
export type PathSegment = string | number;
export type StackOptions = {
    /**
     * The maximum allowed depth of nested structures. If the input exceeds this
     * depth, an error will be thrown.
     *
     * @default MAX_CBOR_NESTED_LEVELS
     */
    maxNestedLevels?: number;
    /**
     * The maximum allowed length of arrays and objects. If the input exceeds this
     * length, an error will be thrown.
     *
     * @default MAX_CBOR_CONTAINER_LEN
     */
    maxContainerLength?: number;
    /**
     * The maximum allowed length of object keys. If a key exceeds this length, an
     * error will be thrown.
     *
     * @default MAX_CBOR_OBJECT_KEY_LEN
     */
    maxObjectKeyLen?: number;
};
/**
 * A stack data structure for managing iterative traversal of nested JSON
 * structures. Encapsulates the stack operations and length/nesting factor
 * checking.
 *
 * @internal
 * @typeParam TCustom - A type for custom frames that can be pushed onto the stack
 */
export declare class Stack<TCustom = never> {
    readonly root: StackFrame;
    private readonly stack;
    private readonly options;
    constructor(input: readonly unknown[] | object, { maxNestedLevels, maxContainerLength, maxObjectKeyLen, }?: StackOptions);
    pop(): StackFrame | TCustom | undefined;
    push(frame: StackFrame | TCustom): void;
    pushNested(input: readonly unknown[] | object, parent: ParentRef): void;
    private createFrame;
}
/** @internal */
export declare function isArrayFrame<T extends {
    type: string;
}>(frame: T): frame is Extract<T, {
    type: 'array';
}>;
/** @internal */
export declare function isObjectFrame<T extends {
    type: string;
}>(frame: T): frame is Extract<T, {
    type: 'object';
}>;
/** @internal */
export declare function getCopy(frame: ArrayFrame): unknown[];
export declare function getCopy(frame: ObjectFrame): Record<string, unknown>;
//# sourceMappingURL=stack.d.ts.map
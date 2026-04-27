export declare class ScopeMissingError extends Error {
    readonly scope: string;
    name: string;
    status: number;
    expose: boolean;
    get statusCode(): number;
    constructor(scope: string);
}
//# sourceMappingURL=scope-missing-error.d.ts.map
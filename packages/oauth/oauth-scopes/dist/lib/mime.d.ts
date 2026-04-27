export type Mime = `${string}/${string}`;
export declare function isMime(value: string): value is Mime;
export type Accept = '*/*' | `${string}/*` | Mime;
export declare function isAccept(value: unknown): value is Accept;
export declare function matchesAccept(accept: Accept, mime: string): boolean;
export declare function matchesAnyAccept(acceptable: Iterable<Accept>, mime: string): boolean;
//# sourceMappingURL=mime.d.ts.map
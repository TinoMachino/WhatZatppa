import type { ServerResponse } from 'node:http';
import { SecurityHeadersOptions } from './http/security-headers.js';
export type WriteFormRedirectOptions = SecurityHeadersOptions;
export declare function writeFormRedirect(res: ServerResponse, method: 'post' | 'get', uri: string, params: Iterable<[string, string]>, options?: WriteFormRedirectOptions): void;
//# sourceMappingURL=write-form-redirect.d.ts.map
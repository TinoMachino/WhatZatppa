import type { ServerResponse } from 'node:http';
import { BuildDocumentOptions } from './html/index.js';
import { WriteResponseOptions } from './http/response.js';
import { SecurityHeadersOptions } from './http/security-headers.js';
export type WriteHtmlOptions = BuildDocumentOptions & WriteResponseOptions & SecurityHeadersOptions;
export declare function writeHtml(res: ServerResponse, options: WriteHtmlOptions): void;
//# sourceMappingURL=write-html.d.ts.map
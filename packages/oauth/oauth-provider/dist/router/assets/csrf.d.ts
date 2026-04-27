import type { IncomingMessage, ServerResponse } from 'node:http';
export declare function setupCsrfToken(req: IncomingMessage, res: ServerResponse): Promise<void>;
export declare function validateCsrfToken(req: IncomingMessage, res: ServerResponse): Promise<void>;
export declare function getCookieCsrf(req: IncomingMessage): string | undefined;
export declare function getHeadersCsrf(req: IncomingMessage): string | undefined;
//# sourceMappingURL=csrf.d.ts.map
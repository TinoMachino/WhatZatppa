import type { IncomingMessage, ServerResponse } from 'node:http';
import type { HydrationData as UiHydrationData } from '@atproto/oauth-provider-ui/hydration-data';
import { Customization } from '../../customization/customization.js';
import { WriteResponseOptions } from '../../lib/http/response.js';
import { SecurityHeadersOptions } from '../../lib/http/security-headers.js';
import { Simplify } from '../../lib/util/type.js';
type HydrationData = Simplify<UiHydrationData>;
export declare const assetsMiddleware: import("../../lib/http/types.js").Middleware;
export type SendWebAppOptions = SecurityHeadersOptions & WriteResponseOptions;
export declare function sendWebAppFactory<P extends keyof HydrationData>(page: P, customization: Customization, defaults?: SendWebAppOptions): (req: IncomingMessage, res: ServerResponse, options: SendWebAppOptions & {
    data: Omit<HydrationData[P], "__customizationData">;
}) => Promise<void>;
export {};
//# sourceMappingURL=assets.d.ts.map
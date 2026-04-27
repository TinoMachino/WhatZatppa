import type { IncomingMessage, ServerResponse } from 'node:http';
import { Customization } from '../../customization/customization.js';
import { AuthorizationResultAuthorizePage } from '../../result/authorization-result-authorize-page.js';
import { SendWebAppOptions } from './assets.js';
export declare function sendAuthorizePageFactory(customization: Customization, options?: SendWebAppOptions): (req: IncomingMessage, res: ServerResponse, data: AuthorizationResultAuthorizePage) => Promise<void>;
//# sourceMappingURL=send-authorization-page.d.ts.map
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Customization } from '../../customization/customization.js';
import { SendWebAppOptions } from './assets.js';
export declare function sendCookieErrorPageFactory(customization: Customization, options?: SendWebAppOptions): (req: IncomingMessage, res: ServerResponse, data: {
    continueUrl: URL;
}) => Promise<void>;
//# sourceMappingURL=send-cookie-error-page.d.ts.map
import type { IncomingMessage, ServerResponse } from 'node:http';
import { Customization } from '../../customization/customization.js';
import { SendWebAppOptions } from './assets.js';
export declare function sendErrorPageFactory(customization: Customization, options?: SendWebAppOptions): (req: IncomingMessage, res: ServerResponse, err: unknown) => Promise<void>;
//# sourceMappingURL=send-error-page.d.ts.map
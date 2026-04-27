import type { IncomingMessage, ServerResponse } from 'node:http';
import type { ActiveDeviceSession } from '@atproto/oauth-provider-api';
import { Customization } from '../../customization/customization.js';
import { SendWebAppOptions } from './assets.js';
export declare function sendAccountPageFactory(customization: Customization, options?: SendWebAppOptions): (req: IncomingMessage, res: ServerResponse, data: {
    deviceSessions: readonly ActiveDeviceSession[];
}) => Promise<void>;
//# sourceMappingURL=send-account-page.d.ts.map
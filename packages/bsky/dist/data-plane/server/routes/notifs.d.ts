import { ServiceImpl } from '@connectrpc/connect';
import { app } from '../../../lexicons/index.js';
import { Service } from '../../../proto/bsky_connect';
import { NotificationPreferences } from '../../../proto/bsky_pb';
import { Database } from '../db';
declare const _default: (db: Database) => Partial<ServiceImpl<typeof Service>>;
export default _default;
export declare const notificationPreferencesLexToProtobuf: (p: app.bsky.notification.defs.Preferences, json: string) => NotificationPreferences;
//# sourceMappingURL=notifs.d.ts.map
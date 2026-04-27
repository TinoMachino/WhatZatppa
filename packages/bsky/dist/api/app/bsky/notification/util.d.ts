import { app } from '../../../../lexicons/index.js';
import { NotificationPreferences } from '../../../../proto/bsky_pb';
import { AppPlatform } from '../../../../proto/courier_pb';
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare const protobufToLex: (res: DeepPartial<NotificationPreferences>) => app.bsky.notification.defs.Preferences;
type LexPlatform = 'ios' | 'android' | 'web';
export declare function assertLexPlatform(platform: string): asserts platform is LexPlatform;
export declare const lexPlatformToProtoPlatform: (platform: string) => AppPlatform;
export {};
//# sourceMappingURL=util.d.ts.map
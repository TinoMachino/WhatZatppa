import { SettingService } from '../../setting/service';
import { ProtectedTagSetting } from '../../setting/types';
export declare const getProtectedTags: (settingService: SettingService, serviceDid: string) => Promise<ProtectedTagSetting | undefined>;
export declare const assertProtectedTagAction: ({ protectedTags, subjectTags, actionAuthor, isModerator, isAdmin, isTriage, }: {
    protectedTags: ProtectedTagSetting;
    subjectTags: string[];
    actionAuthor: string;
    isModerator: boolean;
    isAdmin: boolean;
    isTriage: boolean;
}) => void;
export declare const ScheduledTakedownTag = "scheduled-takedown";
//# sourceMappingURL=util.d.ts.map
import AtpAgent, { AppBskyLabelerDefs } from '@atproto/api';
import { OzoneConfig } from '../config';
export declare const NEW_TO_OLD_REASON_MAPPING: Record<string, string>;
export type ModerationServiceProfileCreator = () => ModerationServiceProfile;
export declare class ModerationServiceProfile {
    private cfg;
    private appviewAgent;
    private cache;
    private CACHE_TTL;
    constructor(cfg: OzoneConfig, appviewAgent: AtpAgent, cacheTTL?: number);
    static creator(cfg: OzoneConfig, appviewAgent: AtpAgent): ModerationServiceProfileCreator;
    getProfile(): Promise<AppBskyLabelerDefs.LabelerViewDetailed | null>;
    validateReasonType(reasonType: string): Promise<string>;
}
//# sourceMappingURL=profile.d.ts.map
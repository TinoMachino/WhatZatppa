import { Keypair } from '@atproto/crypto';
import { BackgroundQueue } from '../background';
import { OzoneConfig, OzoneSecrets } from '../config';
import { Database } from '../db';
import { EventPusher } from './event-pusher';
import { EventReverser } from './event-reverser';
import { MaterializedViewRefresher } from './materialized-view-refresher';
import { ScheduledActionProcessor } from './scheduled-action-processor';
import { StrikeExpiryProcessor } from './strike-expiry-processor';
import { TeamProfileSynchronizer } from './team-profile-synchronizer';
import { VerificationListener } from './verification-listener';
export type DaemonContextOptions = {
    db: Database;
    cfg: OzoneConfig;
    backgroundQueue: BackgroundQueue;
    signingKey: Keypair;
    eventPusher: EventPusher;
    eventReverser: EventReverser;
    materializedViewRefresher: MaterializedViewRefresher;
    teamProfileSynchronizer: TeamProfileSynchronizer;
    scheduledActionProcessor: ScheduledActionProcessor;
    strikeExpiryProcessor: StrikeExpiryProcessor;
    verificationListener?: VerificationListener;
};
export declare class DaemonContext {
    private opts;
    constructor(opts: DaemonContextOptions);
    static fromConfig(cfg: OzoneConfig, secrets: OzoneSecrets, overrides?: Partial<DaemonContextOptions>): Promise<DaemonContext>;
    get db(): Database;
    get cfg(): OzoneConfig;
    get backgroundQueue(): BackgroundQueue;
    get eventPusher(): EventPusher;
    get eventReverser(): EventReverser;
    get materializedViewRefresher(): MaterializedViewRefresher;
    get teamProfileSynchronizer(): TeamProfileSynchronizer;
    get scheduledActionProcessor(): ScheduledActionProcessor;
    get strikeExpiryProcessor(): StrikeExpiryProcessor;
    get verificationListener(): VerificationListener | undefined;
    start(): Promise<void>;
    processAll(): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=context.d.ts.map
import { Selectable } from 'kysely';
import { Database } from './db';
import { CabildeoLivePresence, CabildeoLiveSession } from './db/tables/cabildeo';
export declare const LIVE_CABILDEO_ALLOWED_PHASES: readonly ["open", "deliberating", "voting"];
export declare const LIVE_CABILDEO_PRESENCE_TTL_MS: number;
export type LiveSessionSummary = {
    isLive: boolean;
    hostDid: string;
    activeParticipantCount: number;
    startedAt: string;
    participantPreviewDids: string[];
};
export type ActorCabildeoLive = {
    cabildeoUri: string;
    community: string;
    phase: string;
    expiresAt: string;
    liveUri: string;
};
export declare const activeHostPresenceExistsSql: (sessionAlias: string, now: string | Date) => import("kysely").RawBuilder<boolean>;
export declare const getActiveLiveSession: (db: Database, cabildeoUri: string, now: string | Date) => Promise<Selectable<CabildeoLiveSession> | undefined>;
export declare const getLiveSessionSummary: (db: Database, cabildeoUri: string, now: string | Date) => Promise<LiveSessionSummary | undefined>;
export declare const mapActorCabildeoLive: (row: {
    cabildeo: string;
    community: string;
    phase: string;
    expiresAt: string;
    liveUri: string;
}) => ActorCabildeoLive;
export declare const presenceExpiry: (now?: number) => string;
export declare const isLiveCabildeoPhase: (phase?: string | null) => boolean;
export type LivePresenceRow = Selectable<CabildeoLivePresence>;
//# sourceMappingURL=cabildeo-live.d.ts.map
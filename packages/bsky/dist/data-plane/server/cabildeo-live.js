"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiveCabildeoPhase = exports.presenceExpiry = exports.mapActorCabildeoLive = exports.getLiveSessionSummary = exports.getActiveLiveSession = exports.activeHostPresenceExistsSql = exports.LIVE_CABILDEO_PRESENCE_TTL_MS = exports.LIVE_CABILDEO_ALLOWED_PHASES = void 0;
const kysely_1 = require("kysely");
exports.LIVE_CABILDEO_ALLOWED_PHASES = [
    'open',
    'deliberating',
    'voting',
];
exports.LIVE_CABILDEO_PRESENCE_TTL_MS = 90 * 1000;
const activeHostPresenceExistsSql = (sessionAlias, now) => (0, kysely_1.sql) `exists (
  select 1
  from cabildeo_live_presence as host_presence
  where ${kysely_1.sql.id('host_presence', 'cabildeo')} = ${kysely_1.sql.id(sessionAlias, 'cabildeo')}
    and ${kysely_1.sql.id('host_presence', 'actorDid')} = ${kysely_1.sql.id(sessionAlias, 'hostDid')}
    and ${kysely_1.sql.id('host_presence', 'expiresAt')} > ${toDbTimestamp(now)}
)`;
exports.activeHostPresenceExistsSql = activeHostPresenceExistsSql;
const getActiveLiveSession = async (db, cabildeoUri, now) => {
    return db.db
        .selectFrom('cabildeo_live_session')
        .where('cabildeo', '=', cabildeoUri)
        .where('endedAt', 'is', null)
        .where((0, exports.activeHostPresenceExistsSql)('cabildeo_live_session', now))
        .selectAll()
        .executeTakeFirst();
};
exports.getActiveLiveSession = getActiveLiveSession;
const getLiveSessionSummary = async (db, cabildeoUri, now) => {
    const session = await (0, exports.getActiveLiveSession)(db, cabildeoUri, now);
    if (!session)
        return undefined;
    const participantRows = await db.db
        .selectFrom('cabildeo_live_presence')
        .where('cabildeo', '=', cabildeoUri)
        .where((0, kysely_1.sql) `"cabildeo_live_presence"."expiresAt" > ${toDbTimestamp(now)}`)
        .select(['actorDid', 'expiresAt'])
        .orderBy('expiresAt', 'desc')
        .execute();
    const seen = new Set();
    const participantPreviewDids = [];
    for (const row of participantRows) {
        if (seen.has(row.actorDid))
            continue;
        seen.add(row.actorDid);
        if (participantPreviewDids.length < 5) {
            participantPreviewDids.push(row.actorDid);
        }
    }
    return {
        isLive: true,
        hostDid: session.hostDid,
        activeParticipantCount: seen.size,
        startedAt: session.startedAt,
        participantPreviewDids,
    };
};
exports.getLiveSessionSummary = getLiveSessionSummary;
const mapActorCabildeoLive = (row) => ({
    cabildeoUri: row.cabildeo,
    community: row.community,
    phase: row.phase,
    expiresAt: row.expiresAt,
    liveUri: row.liveUri,
});
exports.mapActorCabildeoLive = mapActorCabildeoLive;
const presenceExpiry = (now = Date.now()) => new Date(now + exports.LIVE_CABILDEO_PRESENCE_TTL_MS).toISOString();
exports.presenceExpiry = presenceExpiry;
const isLiveCabildeoPhase = (phase) => !!phase && exports.LIVE_CABILDEO_ALLOWED_PHASES.includes(phase);
exports.isLiveCabildeoPhase = isLiveCabildeoPhase;
const toDbTimestamp = (value) => value instanceof Date ? value : new Date(value);
//# sourceMappingURL=cabildeo-live.js.map
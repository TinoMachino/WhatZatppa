"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterializedViewRefresher = void 0;
const kysely_1 = require("kysely");
const common_1 = require("@atproto/common");
const background_1 = require("../background");
const logger_1 = require("../logger");
class MaterializedViewRefresher extends background_1.PeriodicBackgroundTask {
    constructor(backgroundQueue, interval = 30 * common_1.MINUTE) {
        super(backgroundQueue, interval, async ({ db }, signal) => {
            for (const view of [
                'account_events_stats',
                'record_events_stats',
                'account_record_events_stats',
                'account_record_status_stats',
            ]) {
                if (signal.aborted)
                    break;
                // Kysely does not provide a way to cancel a running query. Because of
                // this, killing the process during a refresh will cause the process to
                // wait for the current refresh to finish before exiting. This is not
                // ideal, but it is the best we can do until Kysely provides a way to
                // cancel a query.
                try {
                    await (0, kysely_1.sql) `REFRESH MATERIALIZED VIEW CONCURRENTLY ${kysely_1.sql.id(view)}`.execute(db);
                    logger_1.dbLogger.info(`refreshed materialized view ${view}`);
                }
                catch (err) {
                    logger_1.dbLogger.error({ err, view }, 'failed to refresh materialized view');
                }
            }
        });
    }
}
exports.MaterializedViewRefresher = MaterializedViewRefresher;
//# sourceMappingURL=materialized-view-refresher.js.map
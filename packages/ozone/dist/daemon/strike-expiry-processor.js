"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrikeExpiryProcessor = void 0;
const common_1 = require("@atproto/common");
const logger_1 = require("../logger");
const JOB_NAME = 'strike_expiry';
class StrikeExpiryProcessor {
    constructor(db, strikeServiceCreator) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "strikeServiceCreator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: strikeServiceCreator
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "processingPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Promise.resolve()
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    start() {
        this.initializeCursor().then(() => this.poll());
    }
    poll() {
        if (this.destroyed)
            return;
        this.processingPromise = this.processExpiredStrikes()
            .catch((err) => logger_1.dbLogger.error({ err }, 'strike expiry processing errored'))
            .finally(() => {
            this.timer = setTimeout(() => this.poll(), getInterval());
        });
    }
    async destroy() {
        this.destroyed = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        await this.processingPromise;
    }
    async initializeCursor() {
        await this.db.db
            .insertInto('job_cursor')
            .values({
            job: JOB_NAME,
            cursor: null,
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
    async getCursor() {
        const entry = await this.db.db
            .selectFrom('job_cursor')
            .select('cursor')
            .where('job', '=', JOB_NAME)
            .executeTakeFirst();
        return entry?.cursor || null;
    }
    async updateCursor(cursor) {
        await this.db.db
            .updateTable('job_cursor')
            .set({ cursor })
            .where('job', '=', JOB_NAME)
            .execute();
    }
    async processExpiredStrikes() {
        const now = new Date();
        const strikeService = this.strikeServiceCreator(this.db);
        const lastProcessedAt = await this.getCursor();
        const affectedSubjects = await strikeService.getExpiredStrikeSubjects(lastProcessedAt || undefined);
        if (!affectedSubjects.length) {
            logger_1.dbLogger.info('no expired strikes to process');
            await this.updateCursor(now.toISOString());
            return;
        }
        logger_1.dbLogger.info({ count: affectedSubjects.length }, 'processing subjects with expired strikes');
        await Promise.all(affectedSubjects.map(({ subjectDid }) => {
            return strikeService.updateSubjectStrikeCount(subjectDid);
        }));
        await this.updateCursor(now.toISOString());
        logger_1.dbLogger.info({ processed: affectedSubjects.length }, 'strike expiry processing completed');
    }
}
exports.StrikeExpiryProcessor = StrikeExpiryProcessor;
const getInterval = () => {
    // Run every hour, synchronized to the hour boundary
    const now = Date.now();
    const intervalMs = common_1.HOUR;
    const nextIteration = Math.ceil(now / intervalMs);
    return nextIteration * intervalMs - now;
};
//# sourceMappingURL=strike-expiry-processor.js.map
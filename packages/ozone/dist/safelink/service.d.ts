import { Selectable } from 'kysely';
import { ToolsOzoneSafelinkDefs } from '@atproto/api';
import { SafelinkActionType, SafelinkPatternType, SafelinkReasonType } from '../api/util';
import { Database } from '../db';
import { SafelinkEvent, SafelinkRule } from '../db/schema/safelink';
export type SafelinkRuleServiceCreator = (db: Database) => SafelinkRuleService;
export declare class SafelinkRuleService {
    db: Database;
    constructor(db: Database);
    static creator(): (db: Database) => SafelinkRuleService;
    formatEvent(event: Selectable<SafelinkEvent>): ToolsOzoneSafelinkDefs.Event;
    addRule({ url, pattern, action, reason, createdBy, comment, }: {
        url: string;
        pattern: SafelinkPatternType;
        action: SafelinkActionType;
        reason: SafelinkReasonType;
        createdBy: string;
        comment?: string;
    }): Promise<Selectable<SafelinkEvent>>;
    updateRule({ url, pattern, action, reason, createdBy, comment, }: {
        url: string;
        pattern: SafelinkPatternType;
        action: SafelinkActionType;
        reason: SafelinkReasonType;
        createdBy: string;
        comment?: string;
    }): Promise<Selectable<SafelinkEvent>>;
    removeRule({ url, pattern, createdBy, comment, }: {
        url: string;
        pattern: SafelinkPatternType;
        createdBy: string;
        comment?: string;
    }): Promise<Selectable<SafelinkEvent>>;
    getActiveRule(url: string, pattern: SafelinkPatternType): Promise<{
        id: number;
        action: SafelinkActionType;
        comment: string | null;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        reason: SafelinkReasonType;
        url: string;
        pattern: SafelinkPatternType;
    } | null>;
    getActiveRules({ cursor, limit, urls, patternType, actions, reason, createdBy, direction, }?: {
        cursor?: string;
        limit?: number;
        urls?: string[];
        patternType?: SafelinkPatternType;
        actions?: SafelinkActionType[];
        reason?: SafelinkReasonType;
        createdBy?: string;
        direction?: 'asc' | 'desc';
    }): Promise<{
        rules: Selectable<SafelinkRule>[];
        cursor?: string;
    }>;
    queryEvents({ cursor, limit, urls, patternType, direction, }?: {
        cursor?: string;
        limit?: number;
        urls?: string[];
        patternType?: SafelinkPatternType;
        direction?: 'asc' | 'desc';
    }): Promise<{
        events: Selectable<SafelinkEvent>[];
        cursor?: string;
    }>;
}
//# sourceMappingURL=service.d.ts.map
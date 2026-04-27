import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.safelink.defs";
export { $nsid };
/** An event for URL safety decisions */
type Event = {
    $type?: 'tools.ozone.safelink.defs#event';
    /**
     * Auto-incrementing row ID
     */
    id: number;
    eventType: EventType;
    /**
     * The URL that this rule applies to
     */
    url: string;
    pattern: PatternType;
    action: ActionType;
    reason: ReasonType;
    /**
     * DID of the user who created this rule
     */
    createdBy: l.DidString;
    createdAt: l.DatetimeString;
    /**
     * Optional comment about the decision
     */
    comment?: string;
};
export type { Event };
/** An event for URL safety decisions */
declare const event: l.TypedObjectSchema<"tools.ozone.safelink.defs#event", l.Validator<Event, Event>>;
export { event };
type EventType = 'addRule' | 'updateRule' | 'removeRule' | l.UnknownString;
export type { EventType };
declare const eventType: l.StringSchema<{
    knownValues: ["addRule", "updateRule", "removeRule"];
}>;
export { eventType };
type PatternType = 'domain' | 'url' | l.UnknownString;
export type { PatternType };
declare const patternType: l.StringSchema<{
    knownValues: ["domain", "url"];
}>;
export { patternType };
type ActionType = 'block' | 'warn' | 'whitelist' | l.UnknownString;
export type { ActionType };
declare const actionType: l.StringSchema<{
    knownValues: ["block", "warn", "whitelist"];
}>;
export { actionType };
type ReasonType = 'csam' | 'spam' | 'phishing' | 'none' | l.UnknownString;
export type { ReasonType };
declare const reasonType: l.StringSchema<{
    knownValues: ["csam", "spam", "phishing", "none"];
}>;
export { reasonType };
/** Input for creating a URL safety rule */
type UrlRule = {
    $type?: 'tools.ozone.safelink.defs#urlRule';
    /**
     * The URL or domain to apply the rule to
     */
    url: string;
    pattern: PatternType;
    action: ActionType;
    reason: ReasonType;
    /**
     * Optional comment about the decision
     */
    comment?: string;
    /**
     * DID of the user added the rule.
     */
    createdBy: l.DidString;
    /**
     * Timestamp when the rule was created
     */
    createdAt: l.DatetimeString;
    /**
     * Timestamp when the rule was last updated
     */
    updatedAt: l.DatetimeString;
};
export type { UrlRule };
/** Input for creating a URL safety rule */
declare const urlRule: l.TypedObjectSchema<"tools.ozone.safelink.defs#urlRule", l.Validator<UrlRule, UrlRule>>;
export { urlRule };
//# sourceMappingURL=defs.defs.d.ts.map
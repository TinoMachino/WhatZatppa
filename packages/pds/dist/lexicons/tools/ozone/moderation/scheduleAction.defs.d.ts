import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.scheduleAction";
export { $nsid };
/** Schedule a moderation action to be executed at a future time */
declare const main: l.Procedure<"tools.ozone.moderation.scheduleAction", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    action: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Takedown, Takedown>>], false>;
    subjects: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    createdBy: l.StringSchema<{
        readonly format: "did";
    }>;
    scheduling: l.RefSchema<l.Validator<SchedulingConfig, SchedulingConfig>>;
    modTool: l.OptionalSchema<l.RefSchema<l.Validator<ModerationDefs.ModTool, ModerationDefs.ModTool>>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<ScheduledActionResults, ScheduledActionResults>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.scheduleAction", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    action: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<Takedown, Takedown>>], false>;
    subjects: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    createdBy: l.StringSchema<{
        readonly format: "did";
    }>;
    scheduling: l.RefSchema<l.Validator<SchedulingConfig, SchedulingConfig>>;
    modTool: l.OptionalSchema<l.RefSchema<l.Validator<ModerationDefs.ModTool, ModerationDefs.ModTool>>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<ScheduledActionResults, ScheduledActionResults>>>;
/** Schedule a takedown action */
type Takedown = {
    $type?: 'tools.ozone.moderation.scheduleAction#takedown';
    comment?: string;
    /**
     * Indicates how long the takedown should be in effect before automatically expiring.
     */
    durationInHours?: number;
    /**
     * If true, all other reports on content authored by this account will be resolved (acknowledged).
     */
    acknowledgeAccountSubjects?: boolean;
    /**
     * Names/Keywords of the policies that drove the decision.
     */
    policies?: string[];
    /**
     * Severity level of the violation (e.g., 'sev-0', 'sev-1', 'sev-2', etc.).
     */
    severityLevel?: string;
    /**
     * Number of strikes to assign to the user when takedown is applied.
     */
    strikeCount?: number;
    /**
     * When the strike should expire. If not provided, the strike never expires.
     */
    strikeExpiresAt?: l.DatetimeString;
    /**
     * Email content to be sent to the user upon takedown.
     */
    emailContent?: string;
    /**
     * Subject of the email to be sent to the user upon takedown.
     */
    emailSubject?: string;
};
export type { Takedown };
/** Schedule a takedown action */
declare const takedown: l.TypedObjectSchema<"tools.ozone.moderation.scheduleAction#takedown", l.Validator<Takedown, Takedown>>;
export { takedown };
/** Configuration for when the action should be executed */
type SchedulingConfig = {
    $type?: 'tools.ozone.moderation.scheduleAction#schedulingConfig';
    /**
     * Exact time to execute the action
     */
    executeAt?: l.DatetimeString;
    /**
     * Earliest time to execute the action (for randomized scheduling)
     */
    executeAfter?: l.DatetimeString;
    /**
     * Latest time to execute the action (for randomized scheduling)
     */
    executeUntil?: l.DatetimeString;
};
export type { SchedulingConfig };
/** Configuration for when the action should be executed */
declare const schedulingConfig: l.TypedObjectSchema<"tools.ozone.moderation.scheduleAction#schedulingConfig", l.Validator<SchedulingConfig, SchedulingConfig>>;
export { schedulingConfig };
type ScheduledActionResults = {
    $type?: 'tools.ozone.moderation.scheduleAction#scheduledActionResults';
    succeeded: l.DidString[];
    failed: FailedScheduling[];
};
export type { ScheduledActionResults };
declare const scheduledActionResults: l.TypedObjectSchema<"tools.ozone.moderation.scheduleAction#scheduledActionResults", l.Validator<ScheduledActionResults, ScheduledActionResults>>;
export { scheduledActionResults };
type FailedScheduling = {
    $type?: 'tools.ozone.moderation.scheduleAction#failedScheduling';
    subject: l.DidString;
    error: string;
    errorCode?: string;
};
export type { FailedScheduling };
declare const failedScheduling: l.TypedObjectSchema<"tools.ozone.moderation.scheduleAction#failedScheduling", l.Validator<FailedScheduling, FailedScheduling>>;
export { failedScheduling };
//# sourceMappingURL=scheduleAction.defs.d.ts.map
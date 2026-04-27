import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.moderation.cancelScheduledActions";
export { $nsid };
/** Cancel all pending scheduled moderation actions for specified subjects */
declare const main: l.Procedure<"tools.ozone.moderation.cancelScheduledActions", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    subjects: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<CancellationResults, CancellationResults>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.cancelScheduledActions", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    subjects: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    comment: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<CancellationResults, CancellationResults>>>;
type CancellationResults = {
    $type?: 'tools.ozone.moderation.cancelScheduledActions#cancellationResults';
    /**
     * DIDs for which all pending scheduled actions were successfully cancelled
     */
    succeeded: l.DidString[];
    /**
     * DIDs for which cancellation failed with error details
     */
    failed: FailedCancellation[];
};
export type { CancellationResults };
declare const cancellationResults: l.TypedObjectSchema<"tools.ozone.moderation.cancelScheduledActions#cancellationResults", l.Validator<CancellationResults, CancellationResults>>;
export { cancellationResults };
type FailedCancellation = {
    $type?: 'tools.ozone.moderation.cancelScheduledActions#failedCancellation';
    did: l.DidString;
    error: string;
    errorCode?: string;
};
export type { FailedCancellation };
declare const failedCancellation: l.TypedObjectSchema<"tools.ozone.moderation.cancelScheduledActions#failedCancellation", l.Validator<FailedCancellation, FailedCancellation>>;
export { failedCancellation };
//# sourceMappingURL=cancelScheduledActions.defs.d.ts.map
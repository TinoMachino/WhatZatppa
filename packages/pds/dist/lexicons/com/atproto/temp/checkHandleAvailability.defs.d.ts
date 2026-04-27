import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.checkHandleAvailability";
export { $nsid };
/** Checks whether the provided handle is available. If the handle is not available, available suggestions will be returned. Optional inputs will be used to generate suggestions. */
declare const main: l.Query<"com.atproto.temp.checkHandleAvailability", l.ParamsSchema<{
    readonly handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    readonly email: l.OptionalSchema<l.StringSchema<{}>>;
    readonly birthDate: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    result: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ResultAvailable, ResultAvailable>>, l.TypedRefSchema<l.TypedObjectValidator<ResultUnavailable, ResultUnavailable>>], false>;
}>>, readonly ["InvalidEmail"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.checkHandleAvailability", $params: l.ParamsSchema<{
    readonly handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    readonly email: l.OptionalSchema<l.StringSchema<{}>>;
    readonly birthDate: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    handle: l.StringSchema<{
        readonly format: "handle";
    }>;
    result: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<ResultAvailable, ResultAvailable>>, l.TypedRefSchema<l.TypedObjectValidator<ResultUnavailable, ResultUnavailable>>], false>;
}>>;
/** Indicates the provided handle is available. */
type ResultAvailable = {
    $type?: 'com.atproto.temp.checkHandleAvailability#resultAvailable';
};
export type { ResultAvailable };
/** Indicates the provided handle is available. */
declare const resultAvailable: l.TypedObjectSchema<"com.atproto.temp.checkHandleAvailability#resultAvailable", l.Validator<ResultAvailable, ResultAvailable>>;
export { resultAvailable };
/** Indicates the provided handle is unavailable and gives suggestions of available handles. */
type ResultUnavailable = {
    $type?: 'com.atproto.temp.checkHandleAvailability#resultUnavailable';
    /**
     * List of suggested handles based on the provided inputs.
     */
    suggestions: Suggestion[];
};
export type { ResultUnavailable };
/** Indicates the provided handle is unavailable and gives suggestions of available handles. */
declare const resultUnavailable: l.TypedObjectSchema<"com.atproto.temp.checkHandleAvailability#resultUnavailable", l.Validator<ResultUnavailable, ResultUnavailable>>;
export { resultUnavailable };
type Suggestion = {
    $type?: 'com.atproto.temp.checkHandleAvailability#suggestion';
    handle: l.HandleString;
    /**
     * Method used to build this suggestion. Should be considered opaque to clients. Can be used for metrics.
     */
    method: string;
};
export type { Suggestion };
declare const suggestion: l.TypedObjectSchema<"com.atproto.temp.checkHandleAvailability#suggestion", l.Validator<Suggestion, Suggestion>>;
export { suggestion };
//# sourceMappingURL=checkHandleAvailability.defs.d.ts.map
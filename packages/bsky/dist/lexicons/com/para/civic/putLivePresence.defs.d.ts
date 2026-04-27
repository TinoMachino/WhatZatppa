import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.putLivePresence";
export { $nsid };
/** Create, refresh, or clear the caller's live cabildeo presence. Requires auth. */
declare const main: l.Procedure<"com.para.civic.putLivePresence", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    sessionId: l.StringSchema<{
        readonly maxLength: 128;
        readonly maxGraphemes: 128;
    }>;
    present: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    present: l.BooleanSchema;
    expiresAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, readonly ["NotFound", "InvalidPhase", "LiveStatusRequired"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.putLivePresence", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    sessionId: l.StringSchema<{
        readonly maxLength: 128;
        readonly maxGraphemes: 128;
    }>;
    present: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    present: l.BooleanSchema;
    expiresAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>;
//# sourceMappingURL=putLivePresence.defs.d.ts.map
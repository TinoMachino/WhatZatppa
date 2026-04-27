import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.checkSignupQueue";
export { $nsid };
/** Check accounts location in signup queue. */
declare const main: l.Query<"com.atproto.temp.checkSignupQueue", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    activated: l.BooleanSchema;
    placeInQueue: l.OptionalSchema<l.IntegerSchema>;
    estimatedTimeMs: l.OptionalSchema<l.IntegerSchema>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.checkSignupQueue", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    activated: l.BooleanSchema;
    placeInQueue: l.OptionalSchema<l.IntegerSchema>;
    estimatedTimeMs: l.OptionalSchema<l.IntegerSchema>;
}>>;
//# sourceMappingURL=checkSignupQueue.defs.d.ts.map
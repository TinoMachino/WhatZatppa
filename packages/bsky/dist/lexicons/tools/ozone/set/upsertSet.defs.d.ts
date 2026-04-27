import { l } from '@atproto/lex';
import * as SetDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.set.upsertSet";
export { $nsid };
/** Create or update set metadata */
declare const main: l.Procedure<"tools.ozone.set.upsertSet", l.ParamsSchema<{}>, l.Payload<"application/json", l.RefSchema<l.Validator<SetDefs.Set, SetDefs.Set>>>, l.Payload<"application/json", l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.set.upsertSet", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.RefSchema<l.Validator<SetDefs.Set, SetDefs.Set>>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<SetDefs.SetView, SetDefs.SetView>>>;
//# sourceMappingURL=upsertSet.defs.d.ts.map
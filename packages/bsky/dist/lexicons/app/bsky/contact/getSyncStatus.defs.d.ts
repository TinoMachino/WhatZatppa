import { l } from '@atproto/lex';
import * as ContactDefs from './defs.defs.js';
declare const $nsid = "app.bsky.contact.getSyncStatus";
export { $nsid };
/** Gets the user's current contact import status. Requires authentication. */
declare const main: l.Query<"app.bsky.contact.getSyncStatus", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    syncStatus: l.OptionalSchema<l.RefSchema<l.Validator<ContactDefs.SyncStatus, ContactDefs.SyncStatus>>>;
}>>, readonly ["InvalidDid", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.getSyncStatus", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    syncStatus: l.OptionalSchema<l.RefSchema<l.Validator<ContactDefs.SyncStatus, ContactDefs.SyncStatus>>>;
}>>;
//# sourceMappingURL=getSyncStatus.defs.d.ts.map
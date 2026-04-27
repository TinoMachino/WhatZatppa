import { l } from '@atproto/lex';
import * as ContactDefs from './defs.defs.js';
declare const $nsid = "app.bsky.contact.importContacts";
export { $nsid };
/** Import contacts for securely matching with other users. This follows the protocol explained in https://docs.bsky.app/blog/contact-import-rfc. Requires authentication. */
declare const main: l.Procedure<"app.bsky.contact.importContacts", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
    contacts: l.ArraySchema<l.StringSchema<{}>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    matchesAndContactIndexes: l.ArraySchema<l.RefSchema<l.Validator<ContactDefs.MatchAndContactIndex, ContactDefs.MatchAndContactIndex>>>;
}>>, readonly ["InvalidDid", "InvalidContacts", "TooManyContacts", "InvalidToken", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.importContacts", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
    contacts: l.ArraySchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    matchesAndContactIndexes: l.ArraySchema<l.RefSchema<l.Validator<ContactDefs.MatchAndContactIndex, ContactDefs.MatchAndContactIndex>>>;
}>>;
//# sourceMappingURL=importContacts.defs.d.ts.map
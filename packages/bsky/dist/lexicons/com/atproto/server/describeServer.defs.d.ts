import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.describeServer";
export { $nsid };
/** Describes the server's account creation requirements and capabilities. Implemented by PDS. */
declare const main: l.Query<"com.atproto.server.describeServer", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    inviteCodeRequired: l.OptionalSchema<l.BooleanSchema>;
    phoneVerificationRequired: l.OptionalSchema<l.BooleanSchema>;
    availableUserDomains: l.ArraySchema<l.StringSchema<{}>>;
    links: l.OptionalSchema<l.RefSchema<l.Validator<Links, Links>>>;
    contact: l.OptionalSchema<l.RefSchema<l.Validator<Contact, Contact>>>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.describeServer", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    inviteCodeRequired: l.OptionalSchema<l.BooleanSchema>;
    phoneVerificationRequired: l.OptionalSchema<l.BooleanSchema>;
    availableUserDomains: l.ArraySchema<l.StringSchema<{}>>;
    links: l.OptionalSchema<l.RefSchema<l.Validator<Links, Links>>>;
    contact: l.OptionalSchema<l.RefSchema<l.Validator<Contact, Contact>>>;
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>;
type Links = {
    $type?: 'com.atproto.server.describeServer#links';
    privacyPolicy?: l.UriString;
    termsOfService?: l.UriString;
};
export type { Links };
declare const links: l.TypedObjectSchema<"com.atproto.server.describeServer#links", l.Validator<Links, Links>>;
export { links };
type Contact = {
    $type?: 'com.atproto.server.describeServer#contact';
    email?: string;
};
export type { Contact };
declare const contact: l.TypedObjectSchema<"com.atproto.server.describeServer#contact", l.Validator<Contact, Contact>>;
export { contact };
//# sourceMappingURL=describeServer.defs.d.ts.map
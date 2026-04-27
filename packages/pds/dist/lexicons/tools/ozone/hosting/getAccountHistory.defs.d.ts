import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.hosting.getAccountHistory";
export { $nsid };
/** Get account history, e.g. log of updated email addresses or other identity information. */
declare const main: l.Query<"tools.ozone.hosting.getAccountHistory", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly events: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        knownValues: ["accountCreated", "emailUpdated", "emailConfirmed", "passwordUpdated", "handleUpdated"];
    }>>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<Event, Event>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.hosting.getAccountHistory", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
    readonly events: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        knownValues: ["accountCreated", "emailUpdated", "emailConfirmed", "passwordUpdated", "handleUpdated"];
    }>>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<Event, Event>>>;
}>>;
type Event = {
    $type?: 'tools.ozone.hosting.getAccountHistory#event';
    details: l.$Typed<AccountCreated> | l.$Typed<EmailUpdated> | l.$Typed<EmailConfirmed> | l.$Typed<PasswordUpdated> | l.$Typed<HandleUpdated> | l.Unknown$TypedObject;
    createdBy: string;
    createdAt: l.DatetimeString;
};
export type { Event };
declare const event: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#event", l.Validator<Event, Event>>;
export { event };
type AccountCreated = {
    $type?: 'tools.ozone.hosting.getAccountHistory#accountCreated';
    email?: string;
    handle?: l.HandleString;
};
export type { AccountCreated };
declare const accountCreated: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#accountCreated", l.Validator<AccountCreated, AccountCreated>>;
export { accountCreated };
type EmailUpdated = {
    $type?: 'tools.ozone.hosting.getAccountHistory#emailUpdated';
    email: string;
};
export type { EmailUpdated };
declare const emailUpdated: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#emailUpdated", l.Validator<EmailUpdated, EmailUpdated>>;
export { emailUpdated };
type EmailConfirmed = {
    $type?: 'tools.ozone.hosting.getAccountHistory#emailConfirmed';
    email: string;
};
export type { EmailConfirmed };
declare const emailConfirmed: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#emailConfirmed", l.Validator<EmailConfirmed, EmailConfirmed>>;
export { emailConfirmed };
type PasswordUpdated = {
    $type?: 'tools.ozone.hosting.getAccountHistory#passwordUpdated';
};
export type { PasswordUpdated };
declare const passwordUpdated: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#passwordUpdated", l.Validator<PasswordUpdated, PasswordUpdated>>;
export { passwordUpdated };
type HandleUpdated = {
    $type?: 'tools.ozone.hosting.getAccountHistory#handleUpdated';
    handle: l.HandleString;
};
export type { HandleUpdated };
declare const handleUpdated: l.TypedObjectSchema<"tools.ozone.hosting.getAccountHistory#handleUpdated", l.Validator<HandleUpdated, HandleUpdated>>;
export { handleUpdated };
//# sourceMappingURL=getAccountHistory.defs.d.ts.map
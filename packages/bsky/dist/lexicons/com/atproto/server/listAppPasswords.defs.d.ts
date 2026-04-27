import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.listAppPasswords";
export { $nsid };
/** List all App Passwords. */
declare const main: l.Query<"com.atproto.server.listAppPasswords", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    passwords: l.ArraySchema<l.RefSchema<l.Validator<AppPassword, AppPassword>>>;
}>>, readonly ["AccountTakedown"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.listAppPasswords", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    passwords: l.ArraySchema<l.RefSchema<l.Validator<AppPassword, AppPassword>>>;
}>>;
type AppPassword = {
    $type?: 'com.atproto.server.listAppPasswords#appPassword';
    name: string;
    createdAt: l.DatetimeString;
    privileged?: boolean;
};
export type { AppPassword };
declare const appPassword: l.TypedObjectSchema<"com.atproto.server.listAppPasswords#appPassword", l.Validator<AppPassword, AppPassword>>;
export { appPassword };
//# sourceMappingURL=listAppPasswords.defs.d.ts.map
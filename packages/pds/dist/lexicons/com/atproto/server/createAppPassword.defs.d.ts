import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.createAppPassword";
export { $nsid };
/** Create an App Password. */
declare const main: l.Procedure<"com.atproto.server.createAppPassword", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    privileged: l.OptionalSchema<l.BooleanSchema>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<AppPassword, AppPassword>>>, readonly ["AccountTakedown"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.createAppPassword", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
    privileged: l.OptionalSchema<l.BooleanSchema>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<AppPassword, AppPassword>>>;
type AppPassword = {
    $type?: 'com.atproto.server.createAppPassword#appPassword';
    name: string;
    password: string;
    createdAt: l.DatetimeString;
    privileged?: boolean;
};
export type { AppPassword };
declare const appPassword: l.TypedObjectSchema<"com.atproto.server.createAppPassword#appPassword", l.Validator<AppPassword, AppPassword>>;
export { appPassword };
//# sourceMappingURL=createAppPassword.defs.d.ts.map
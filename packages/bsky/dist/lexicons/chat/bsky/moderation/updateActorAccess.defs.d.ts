import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.moderation.updateActorAccess";
export { $nsid };
declare const main: l.Procedure<"chat.bsky.moderation.updateActorAccess", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "did";
    }>;
    allowAccess: l.BooleanSchema;
    ref: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.moderation.updateActorAccess", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    actor: l.StringSchema<{
        readonly format: "did";
    }>;
    allowAccess: l.BooleanSchema;
    ref: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateActorAccess.defs.d.ts.map
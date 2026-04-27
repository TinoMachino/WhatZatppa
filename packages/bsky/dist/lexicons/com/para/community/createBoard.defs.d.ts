import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.createBoard";
export { $nsid };
/** Creates a PARA community board. Automatically instantiates the underlying general (270) and subdelegate (30) chats in the bsky chat server. Generates a founder starter pack draft. */
declare const main: l.Procedure<"com.para.community.createBoard", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
    quadrant: l.StringSchema<{
        readonly maxLength: 64;
    }>;
    description: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 3000;
    }>>;
    founderStarterPackName: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 3000;
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    delegatesChatId: l.StringSchema<{}>;
    subdelegatesChatId: l.StringSchema<{}>;
    founderStarterPackUri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.createBoard", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{
        readonly minLength: 1;
        readonly maxGraphemes: 128;
        readonly maxLength: 1280;
    }>;
    quadrant: l.StringSchema<{
        readonly maxLength: 64;
    }>;
    description: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 3000;
    }>>;
    founderStarterPackName: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 3000;
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    delegatesChatId: l.StringSchema<{}>;
    subdelegatesChatId: l.StringSchema<{}>;
    founderStarterPackUri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>;
//# sourceMappingURL=createBoard.defs.d.ts.map
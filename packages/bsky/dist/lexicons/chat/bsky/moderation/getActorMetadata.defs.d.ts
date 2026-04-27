import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.moderation.getActorMetadata";
export { $nsid };
declare const main: l.Query<"chat.bsky.moderation.getActorMetadata", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    day: l.RefSchema<l.Validator<Metadata, Metadata>>;
    month: l.RefSchema<l.Validator<Metadata, Metadata>>;
    all: l.RefSchema<l.Validator<Metadata, Metadata>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "chat.bsky.moderation.getActorMetadata", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    day: l.RefSchema<l.Validator<Metadata, Metadata>>;
    month: l.RefSchema<l.Validator<Metadata, Metadata>>;
    all: l.RefSchema<l.Validator<Metadata, Metadata>>;
}>>;
type Metadata = {
    $type?: 'chat.bsky.moderation.getActorMetadata#metadata';
    messagesSent: number;
    messagesReceived: number;
    convos: number;
    convosStarted: number;
};
export type { Metadata };
declare const metadata: l.TypedObjectSchema<"chat.bsky.moderation.getActorMetadata#metadata", l.Validator<Metadata, Metadata>>;
export { metadata };
//# sourceMappingURL=getActorMetadata.defs.d.ts.map
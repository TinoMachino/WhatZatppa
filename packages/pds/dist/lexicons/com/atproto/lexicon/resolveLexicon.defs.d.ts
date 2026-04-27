import { l } from '@atproto/lex';
import * as LexiconSchema from './schema.defs.js';
declare const $nsid = "com.atproto.lexicon.resolveLexicon";
export { $nsid };
/** Resolves an atproto lexicon (NSID) to a schema. */
declare const main: l.Query<"com.atproto.lexicon.resolveLexicon", l.ParamsSchema<{
    readonly nsid: l.StringSchema<{
        readonly format: "nsid";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    schema: l.RefSchema<l.Validator<LexiconSchema.Main, LexiconSchema.Main>>;
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, readonly ["LexiconNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.lexicon.resolveLexicon", $params: l.ParamsSchema<{
    readonly nsid: l.StringSchema<{
        readonly format: "nsid";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    schema: l.RefSchema<l.Validator<LexiconSchema.Main, LexiconSchema.Main>>;
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>;
//# sourceMappingURL=resolveLexicon.defs.d.ts.map
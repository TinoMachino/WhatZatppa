import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getTaggedSuggestions";
export { $nsid };
/** Get a list of suggestions (feeds and users) tagged with categories */
declare const main: l.Query<"app.bsky.unspecced.getTaggedSuggestions", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    suggestions: l.ArraySchema<l.RefSchema<l.Validator<Suggestion, Suggestion>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getTaggedSuggestions", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    suggestions: l.ArraySchema<l.RefSchema<l.Validator<Suggestion, Suggestion>>>;
}>>;
type Suggestion = {
    $type?: 'app.bsky.unspecced.getTaggedSuggestions#suggestion';
    tag: string;
    subjectType: 'actor' | 'feed' | l.UnknownString;
    subject: l.UriString;
};
export type { Suggestion };
declare const suggestion: l.TypedObjectSchema<"app.bsky.unspecced.getTaggedSuggestions#suggestion", l.Validator<Suggestion, Suggestion>>;
export { suggestion };
//# sourceMappingURL=getTaggedSuggestions.defs.d.ts.map
import { l } from '@atproto/lex';
import * as GraphDefs from './defs.defs.js';
declare const $nsid = "app.bsky.graph.getRelationships";
export { $nsid };
/** Enumerates public relationships between one account, and a list of other accounts. Does not require auth. */
declare const main: l.Query<"app.bsky.graph.getRelationships", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly others: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    actor: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    relationships: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<GraphDefs.Relationship, GraphDefs.Relationship>>, l.TypedRefSchema<l.TypedObjectValidator<GraphDefs.NotFoundActor, GraphDefs.NotFoundActor>>], false>>;
}>>, readonly ["ActorNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.graph.getRelationships", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly others: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actor: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    relationships: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<GraphDefs.Relationship, GraphDefs.Relationship>>, l.TypedRefSchema<l.TypedObjectValidator<GraphDefs.NotFoundActor, GraphDefs.NotFoundActor>>], false>>;
}>>;
//# sourceMappingURL=getRelationships.defs.d.ts.map
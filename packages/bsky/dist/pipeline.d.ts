import { HydrationState } from './hydration/hydrator';
export declare function createPipeline<Params, Skeleton, View, Context>(skeletonFn: SkeletonFn<Context, Params, Skeleton>, hydrationFn: HydrationFn<Context, Params, Skeleton>, rulesFn: RulesFn<Context, Params, Skeleton>, presentationFn: PresentationFn<Context, Params, Skeleton, View>): (params: Params, ctx: Context) => Promise<View>;
export type SkeletonFn<Context, Params, Skeleton> = (input: SkeletonFnInput<Context, Params>) => Promise<Skeleton>;
export type SkeletonFnInput<Context, Params> = {
    ctx: Context;
    params: Params;
};
export type HydrationFn<Context, Params, Skeleton> = (input: HydrationFnInput<Context, Params, Skeleton>) => Promise<HydrationState>;
export type HydrationFnInput<Context, Params, Skeleton> = {
    ctx: Context;
    params: Params;
    skeleton: Skeleton;
};
export type RulesFn<Context, Params, Skeleton> = (input: RulesFnInput<Context, Params, Skeleton>) => Skeleton;
export type RulesFnInput<Context, Params, Skeleton> = {
    ctx: Context;
    params: Params;
    skeleton: Skeleton;
    hydration: HydrationState;
};
export type PresentationFn<Context, Params, Skeleton, View> = (input: PresentationFnInput<Context, Params, Skeleton>) => View;
export type PresentationFnInput<Context, Params, Skeleton> = {
    ctx: Context;
    params: Params;
    skeleton: Skeleton;
    hydration: HydrationState;
};
export declare function noRules<S>(input: {
    skeleton: S;
}): S;
//# sourceMappingURL=pipeline.d.ts.map
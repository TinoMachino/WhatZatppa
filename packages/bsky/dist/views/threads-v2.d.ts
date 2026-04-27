import { $Typed } from '@atproto/lex';
import { HydrateCtx } from '../hydration/hydrator';
import { GetPostThreadV2QueryParams, ThreadItem, ThreadItemBlocked, ThreadItemNoUnauthenticated, ThreadItemNotFound, ThreadItemPost, ThreadOtherItem } from './types.js';
type ThreadItemValue<T extends ThreadItem['value']> = Omit<ThreadItem, 'value'> & {
    value: T;
};
export type ThreadItemValueBlocked = ThreadItemValue<$Typed<ThreadItemBlocked>>;
export type ThreadItemValueNoUnauthenticated = ThreadItemValue<$Typed<ThreadItemNoUnauthenticated>>;
export type ThreadItemValueNotFound = ThreadItemValue<$Typed<ThreadItemNotFound>>;
export type ThreadItemValuePost = ThreadItemValue<$Typed<ThreadItemPost>>;
type ThreadBlockedNode = {
    type: 'blocked';
    item: ThreadItemValueBlocked;
};
type ThreadNoUnauthenticatedNode = {
    type: 'noUnauthenticated';
    parent: ThreadTree | undefined;
    item: ThreadItemValueNoUnauthenticated;
};
type ThreadNotFoundNode = {
    type: 'notFound';
    item: ThreadItemValueNotFound;
};
type ThreadPostNode = {
    type: 'post';
    item: ThreadItemValuePost;
    tags: Set<string>;
    hasOPLike: boolean;
    parent: ThreadTree | undefined;
    replies: ThreadTree[] | undefined;
};
type ThreadOtherItemValue<T extends ThreadOtherItem['value']> = Omit<ThreadOtherItem, 'value'> & {
    value: T;
};
export type ThreadOtherItemValuePost = ThreadOtherItemValue<$Typed<ThreadItemPost>>;
export type ThreadOtherAnchorPostNode = {
    type: 'hiddenAnchor';
    item: Omit<ThreadOtherItem, 'value'> & {
        value: undefined;
    };
    replies: ThreadOtherPostNode[] | undefined;
};
export type ThreadOtherPostNode = {
    type: 'hiddenPost';
    item: ThreadOtherItemValuePost;
    tags: Set<string>;
    replies: ThreadOtherPostNode[] | undefined;
};
export type ThreadTreeVisible = ThreadBlockedNode | ThreadNoUnauthenticatedNode | ThreadNotFoundNode | ThreadPostNode;
export type ThreadTreeOther = ThreadOtherAnchorPostNode | ThreadOtherPostNode;
export type ThreadTree = ThreadTreeVisible | ThreadTreeOther;
/** This function mutates the tree parameter. */
export declare function sortTrimFlattenThreadTree(anchorTree: ThreadTree, options: SortTrimFlattenOptions, useExploration?: boolean): any;
type SortTrimFlattenOptions = {
    branchingFactor: GetPostThreadV2QueryParams['branchingFactor'];
    opDid: string;
    sort?: GetPostThreadV2QueryParams['sort'];
    viewer: HydrateCtx['viewer'];
    threadTagsBumpDown: readonly string[];
    threadTagsHide: readonly string[];
    visibilityTagRankPrefix: string;
};
export declare function sortTrimThreadTreeExploration(n: ThreadTree, opts: SortTrimFlattenOptions): ThreadTree;
export {};
//# sourceMappingURL=threads-v2.d.ts.map
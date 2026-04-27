"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTrimFlattenThreadTree = sortTrimFlattenThreadTree;
exports.sortTrimThreadTreeExploration = sortTrimThreadTreeExploration;
const isNodeWithReplies = (node) => 'replies' in node && node.replies !== undefined;
const isPostNode = (node) => node.type === 'post' || node.type === 'hiddenPost';
/** This function mutates the tree parameter. */
function sortTrimFlattenThreadTree(anchorTree, options, useExploration) {
    const sortedAnchorTree = useExploration
        ? sortTrimThreadTreeExploration(anchorTree, options)
        : sortTrimThreadTree(anchorTree, options);
    return flattenTree(sortedAnchorTree);
}
/** This function mutates the tree parameter. */
function sortTrimThreadTree(n, opts) {
    if (!isNodeWithReplies(n)) {
        return n;
    }
    const node = n;
    if (node.replies) {
        node.replies.sort((an, bn) => {
            if (!isPostNode(an)) {
                return 1;
            }
            if (!isPostNode(bn)) {
                return -1;
            }
            const aNode = an;
            const bNode = bn;
            // First applies bumping.
            const bump = applyBumping(aNode, bNode, opts);
            if (bump !== null) {
                return bump;
            }
            // Then applies sorting.
            return applySorting(aNode, bNode, opts);
        });
        // Trimming: after sorting, apply branching factor to all levels of replies except the anchor direct replies.
        if (node.item.depth !== 0) {
            node.replies = node.replies.slice(0, opts.branchingFactor);
        }
        node.replies.forEach((reply) => sortTrimThreadTree(reply, opts));
    }
    return node;
}
function applyBumping(aNode, bNode, opts) {
    if (!isPostNode(aNode)) {
        return null;
    }
    if (!isPostNode(bNode)) {
        return null;
    }
    const { opDid, viewer, threadTagsBumpDown, threadTagsHide } = opts;
    const maybeBump = (bump, predicateFn) => {
        const aPredicate = predicateFn(aNode);
        const bPredicate = predicateFn(bNode);
        if (aPredicate && bPredicate) {
            return applySorting(aNode, bNode, opts);
        }
        else if (aPredicate) {
            return bump === 'up' ? -1 : 1;
        }
        else if (bPredicate) {
            return bump === 'up' ? 1 : -1;
        }
        return null;
    };
    // The order of the bumps determines the priority with which they are applied.
    // Bumps-up applied first make the item appear higher in the list than later bumps-up.
    // Bumps-down applied first make the item appear lower in the list than later bumps-down.
    const bumps = [
        /*
          General bumps.
        */
        // OP replies.
        ['up', (i) => i.item.value.post.author.did === opDid],
        // Viewer replies.
        ['up', (i) => i.item.value.post.author.did === viewer],
        /*
          Bumps within visible replies.
        */
        // Followers posts.
        [
            'up',
            (i) => i.type === 'post' && !!i.item.value.post.author.viewer?.following,
        ],
        // Bump-down tags.
        [
            'down',
            (i) => i.type === 'post' && threadTagsBumpDown.some((t) => i.tags.has(t)),
        ],
        /*
          Bumps within hidden replies.
          This determines the order of hidden replies:
            1. hidden by threadgate.
            2. hidden by tags.
            3. muted by viewer.
        */
        // Muted account by the viewer.
        ['down', (i) => i.type === 'hiddenPost' && i.item.value.mutedByViewer],
        // Hidden by tags.
        [
            'down',
            (i) => i.type === 'hiddenPost' && threadTagsHide.some((t) => i.tags.has(t)),
        ],
        // Hidden by threadgate.
        ['down', (i) => i.type === 'hiddenPost' && i.item.value.hiddenByThreadgate],
    ];
    for (const [bump, predicateFn] of bumps) {
        const bumpResult = maybeBump(bump, predicateFn);
        if (bumpResult !== null) {
            return bumpResult;
        }
    }
    return null;
}
function applySorting(aNode, bNode, opts) {
    const a = aNode.item.value;
    const b = bNode.item.value;
    // Only customize sort for visible posts.
    if (aNode.type === 'post' && bNode.type === 'post') {
        const { sort } = opts;
        if (sort === 'oldest') {
            return a.post.indexedAt.localeCompare(b.post.indexedAt);
        }
        if (sort === 'top') {
            const aLikes = a.post.likeCount ?? 0;
            const bLikes = b.post.likeCount ?? 0;
            const aTop = topSortValue(aLikes, aNode.hasOPLike);
            const bTop = topSortValue(bLikes, bNode.hasOPLike);
            if (aTop !== bTop) {
                return bTop - aTop;
            }
        }
    }
    // Fallback to newest.
    return b.post.indexedAt.localeCompare(a.post.indexedAt);
}
function topSortValue(likeCount, hasOPLike) {
    return Math.log(3 + likeCount) * (hasOPLike ? 1.45 : 1.0);
}
function flattenTree(tree) {
    return [
        // All parents above.
        ...Array.from(flattenInDirection({
            tree,
            direction: 'up',
        })),
        // The anchor.
        // In the case of hidden replies, the anchor item itself is undefined.
        ...(tree.item.value ? [tree.item] : []),
        // All replies below.
        ...Array.from(flattenInDirection({
            tree,
            direction: 'down',
        })),
    ];
}
function* flattenInDirection({ tree, direction, }) {
    if (tree.type === 'noUnauthenticated') {
        if (direction === 'up') {
            if (tree.parent) {
                // Unfold all parents above.
                yield* flattenTree(tree.parent);
            }
        }
    }
    if (tree.type === 'post') {
        if (direction === 'up') {
            if (tree.parent) {
                // Unfold all parents above.
                yield* flattenTree(tree.parent);
            }
        }
        else {
            // Unfold all replies below.
            if (tree.replies?.length) {
                for (const reply of tree.replies) {
                    yield* flattenTree(reply);
                }
            }
        }
    }
    // For the first level of hidden replies, the items are undefined.
    if (tree.type === 'hiddenAnchor' || tree.type === 'hiddenPost') {
        if (direction === 'down') {
            // Unfold all replies below.
            if (tree.replies?.length) {
                for (const reply of tree.replies) {
                    yield* flattenTree(reply);
                }
            }
        }
    }
}
function sortTrimThreadTreeExploration(n, opts) {
    if (!isNodeWithReplies(n)) {
        return n;
    }
    const node = n;
    if (node.replies) {
        node.replies.sort((an, bn) => {
            if (!isPostNode(an)) {
                return 1;
            }
            if (!isPostNode(bn)) {
                return -1;
            }
            const aNode = an;
            const bNode = bn;
            // First applies bumping.
            const bump = applyBumpingExploration(aNode, bNode, opts);
            if (bump !== null) {
                return bump;
            }
            // Then applies sorting.
            return applySortingExploration(aNode, bNode, opts);
        });
        // Trimming: after sorting, apply branching factor to all levels of replies except the anchor direct replies.
        if (node.item.depth !== 0) {
            node.replies = node.replies.slice(0, opts.branchingFactor);
        }
        node.replies.forEach((reply) => sortTrimThreadTreeExploration(reply, opts));
    }
    return node;
}
function applyBumpingExploration(aNode, bNode, opts) {
    if (!isPostNode(aNode)) {
        return null;
    }
    if (!isPostNode(bNode)) {
        return null;
    }
    const { opDid, viewer } = opts;
    const maybeBump = (bump, predicateFn) => {
        const aPredicate = predicateFn(aNode);
        const bPredicate = predicateFn(bNode);
        if (aPredicate && bPredicate) {
            return applySortingExploration(aNode, bNode, opts);
        }
        else if (aPredicate) {
            return bump === 'up' ? -1 : 1;
        }
        else if (bPredicate) {
            return bump === 'up' ? 1 : -1;
        }
        return null;
    };
    // The order of the bumps determines the priority with which they are applied.
    // Bumps-up applied first make the item appear higher in the list than later bumps-up.
    // Bumps-down applied first make the item appear lower in the list than later bumps-down.
    const bumps = [
        /*
          General bumps.
        */
        // OP replies.
        ['up', (i) => i.item.value.post.author.did === opDid],
        // Viewer replies.
        ['up', (i) => i.item.value.post.author.did === viewer],
    ];
    for (const [bump, predicateFn] of bumps) {
        const bumpResult = maybeBump(bump, predicateFn);
        if (bumpResult !== null) {
            return bumpResult;
        }
    }
    return null;
}
function applySortingExploration(aNode, bNode, opts) {
    const { visibilityTagRankPrefix: rp } = opts;
    const a = aNode.item.value;
    const ar = !rp ? 0 : parseRankFromTag(rp, findRankTag(aNode.tags, rp));
    const b = bNode.item.value;
    const br = !rp ? 0 : parseRankFromTag(rp, findRankTag(bNode.tags, rp));
    // Only customize sort for visible posts.
    if (aNode.type === 'post' && bNode.type === 'post') {
        const { sort } = opts;
        if (sort === 'oldest') {
            return a.post.indexedAt.localeCompare(b.post.indexedAt);
        }
        if (sort === 'top') {
            const aLikes = a.post.likeCount ?? 0;
            const bLikes = b.post.likeCount ?? 0;
            const aTop = topSortValue(aLikes, aNode.hasOPLike);
            const bTop = topSortValue(bLikes, bNode.hasOPLike);
            const aRank = aTop + ar;
            const bRank = bTop + br;
            if (aRank !== bRank) {
                return bRank - aRank;
            }
        }
    }
    // Fallback to newest.
    return b.post.indexedAt.localeCompare(a.post.indexedAt);
}
function findRankTag(tags, prefix) {
    return Array.from(tags.values()).find((tag) => tag.startsWith(prefix));
}
function parseRankFromTag(prefix, tag) {
    if (!tag)
        return 0;
    try {
        const rank = parseInt(tag.slice(prefix.length), 10);
        if (typeof rank !== 'number' || isNaN(rank)) {
            return 0;
        }
        return rank;
    }
    catch (e) {
        return 0;
    }
}
//# sourceMappingURL=threads-v2.js.map
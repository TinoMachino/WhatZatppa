"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGovernanceSummary = exports.toListBoardView = exports.toGetBoardView = exports.getFoundingMemberCount = exports.getLocalGovernance = exports.getViewerCapabilities = exports.getMembershipUriForBoard = exports.getLocalMembership = exports.findLocalBoard = exports.findMatchingBoardByIdentity = exports.listLocalBoards = exports.buildSeedGovernanceRecord = exports.buildSubdelegatesChatId = exports.buildDelegatesChatId = exports.deriveBoardSlug = exports.normalizeSlug = exports.normalizeQuadrant = exports.normalizeCommunityName = exports.GLOBAL_COMMUNITY_CAPABILITIES = exports.COMMUNITY_MODERATOR_CAPABILITIES = exports.COMMUNITY_NON_MEMBER_CAPABILITIES = exports.COMMUNITY_MEMBER_CAPABILITIES = exports.DEFAULT_MODERATOR_CAPABILITIES = exports.LIST_ITEM_COLLECTION = exports.STARTERPACK_COLLECTION = exports.LIST_COLLECTION = exports.GOVERNANCE_COLLECTION = exports.MEMBERSHIP_COLLECTION = exports.BOARD_COLLECTION = void 0;
// @ts-nocheck
const syntax_1 = require("@atproto/syntax");
const ComParaCommunityBoard = __importStar(require("../../../../lexicon/types/com/para/community/board"));
const ComParaCommunityGovernance = __importStar(require("../../../../lexicon/types/com/para/community/governance"));
const ComParaCommunityMembership = __importStar(require("../../../../lexicon/types/com/para/community/membership"));
exports.BOARD_COLLECTION = 'com.para.community.board';
exports.MEMBERSHIP_COLLECTION = 'com.para.community.membership';
exports.GOVERNANCE_COLLECTION = 'com.para.community.governance';
exports.LIST_COLLECTION = 'app.bsky.graph.list';
exports.STARTERPACK_COLLECTION = 'app.bsky.graph.starterpack';
exports.LIST_ITEM_COLLECTION = 'app.bsky.graph.listitem';
exports.DEFAULT_MODERATOR_CAPABILITIES = [
    'appoint_deputies',
    'edit_role_descriptions',
    'review_applicants',
    'publish_governance_updates',
    'set_official_representatives',
];
exports.COMMUNITY_MEMBER_CAPABILITIES = ['leave_community'];
exports.COMMUNITY_NON_MEMBER_CAPABILITIES = ['join_community'];
exports.COMMUNITY_MODERATOR_CAPABILITIES = [
    'manage_governance',
    'review_members',
    'remove_members',
    'edit_community',
];
exports.GLOBAL_COMMUNITY_CAPABILITIES = ['create_community'];
const normalizeCommunityName = (value) => value.trim();
exports.normalizeCommunityName = normalizeCommunityName;
const normalizeQuadrant = (value) => value.trim();
exports.normalizeQuadrant = normalizeQuadrant;
const normalizeSlug = (value) => value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
exports.normalizeSlug = normalizeSlug;
const deriveBoardSlug = (name, rkey) => {
    const base = (0, exports.normalizeSlug)(name);
    return base ? `${base}-${rkey}` : `community-${rkey}`;
};
exports.deriveBoardSlug = deriveBoardSlug;
const buildDelegatesChatId = (boardRkey) => `para://community/${boardRkey}/delegates`;
exports.buildDelegatesChatId = buildDelegatesChatId;
const buildSubdelegatesChatId = (boardRkey) => `para://community/${boardRkey}/subdelegates`;
exports.buildSubdelegatesChatId = buildSubdelegatesChatId;
const buildSeedGovernanceRecord = ({ did, name, slug, createdAt, }) => ({
    $type: exports.GOVERNANCE_COLLECTION,
    community: `p/${name}`,
    communityId: slug,
    slug,
    createdAt,
    updatedAt: createdAt,
    moderators: [
        {
            did,
            role: 'Founding moderator',
            badge: 'Community Creator',
            capabilities: exports.DEFAULT_MODERATOR_CAPABILITIES,
        },
    ],
    officials: [],
    deputies: [],
    metadata: {
        state: 'seeded',
        reviewCadence: 'Initial setup',
        lastPublishedAt: createdAt,
    },
    editHistory: [
        {
            id: 'seed-governance',
            action: 'publish_governance_updates',
            actorDid: did,
            createdAt,
            summary: 'Initial governance charter seeded during community creation.',
        },
    ],
});
exports.buildSeedGovernanceRecord = buildSeedGovernanceRecord;
const listLocalBoards = async (store, limit = 50) => {
    const records = await store.record.listRecordsForCollection({
        collection: exports.BOARD_COLLECTION,
        limit,
        reverse: false,
        includeSoftDeleted: true,
    });
    return records.flatMap((record) => {
        const validated = ComParaCommunityBoard.validateRecord(record.value);
        if (!validated.success)
            return [];
        return [
            {
                uri: record.uri,
                cid: record.cid,
                record: validated.value,
            },
        ];
    });
};
exports.listLocalBoards = listLocalBoards;
const findMatchingBoardByIdentity = async ({ store, name, quadrant, }) => {
    const normalizedName = (0, exports.normalizeSlug)(name);
    const normalizedQuadrant = (0, exports.normalizeSlug)(quadrant);
    const boards = await (0, exports.listLocalBoards)(store, 100);
    return (boards.find((board) => {
        return ((0, exports.normalizeSlug)(board.record.name) === normalizedName &&
            (0, exports.normalizeSlug)(board.record.quadrant) === normalizedQuadrant);
    }) ?? null);
};
exports.findMatchingBoardByIdentity = findMatchingBoardByIdentity;
const findLocalBoard = async ({ store, uri, communityId, }) => {
    if (uri) {
        let parsed;
        try {
            parsed = new syntax_1.AtUri(uri);
        }
        catch {
            return null;
        }
        const record = await store.record.getRecord(parsed, null, true);
        if (!record)
            return null;
        const validated = ComParaCommunityBoard.validateRecord(record.value);
        if (!validated.success)
            return null;
        return {
            uri: parsed.toString(),
            cid: record.cid,
            record: validated.value,
        };
    }
    if (!communityId)
        return null;
    const boards = await (0, exports.listLocalBoards)(store, 100);
    return (boards.find((board) => {
        const boardUri = new syntax_1.AtUri(board.uri);
        return (0, exports.deriveBoardSlug)(board.record.name, boardUri.rkey) === communityId;
    }) ?? null);
};
exports.findLocalBoard = findLocalBoard;
const getLocalMembership = async ({ store, viewerDid, boardUri, }) => {
    const board = new syntax_1.AtUri(boardUri);
    const membershipUri = syntax_1.AtUri.make(viewerDid, exports.MEMBERSHIP_COLLECTION, board.rkey);
    const membership = await store.record.getRecord(membershipUri, null, true);
    if (!membership)
        return null;
    const validated = ComParaCommunityMembership.validateRecord(membership.value);
    return validated.success ? validated.value : null;
};
exports.getLocalMembership = getLocalMembership;
const getMembershipUriForBoard = ({ viewerDid, boardUri, }) => {
    const board = new syntax_1.AtUri(boardUri);
    return syntax_1.AtUri.make(viewerDid, exports.MEMBERSHIP_COLLECTION, board.rkey);
};
exports.getMembershipUriForBoard = getMembershipUriForBoard;
const getViewerCapabilities = (membership) => {
    const capabilities = new Set(exports.GLOBAL_COMMUNITY_CAPABILITIES);
    const state = membership?.membershipState ?? 'none';
    const roles = membership?.roles ?? [];
    if (state === 'active') {
        exports.COMMUNITY_MEMBER_CAPABILITIES.forEach((capability) => capabilities.add(capability));
    }
    else if (state === 'none' || state === 'left') {
        exports.COMMUNITY_NON_MEMBER_CAPABILITIES.forEach((capability) => capabilities.add(capability));
    }
    if (state === 'active' &&
        (roles.includes('owner') || roles.includes('moderator'))) {
        exports.COMMUNITY_MODERATOR_CAPABILITIES.forEach((capability) => capabilities.add(capability));
    }
    return Array.from(capabilities);
};
exports.getViewerCapabilities = getViewerCapabilities;
const getLocalGovernance = async ({ store, creatorDid, board, }) => {
    const boardUri = new syntax_1.AtUri(board.uri);
    const governanceUri = syntax_1.AtUri.make(creatorDid, exports.GOVERNANCE_COLLECTION, (0, exports.deriveBoardSlug)(board.record.name, boardUri.rkey));
    const governance = await store.record.getRecord(governanceUri, null, true);
    if (!governance)
        return null;
    const validated = ComParaCommunityGovernance.validateRecord(governance.value);
    return validated.success ? validated.value : null;
};
exports.getLocalGovernance = getLocalGovernance;
const getFoundingMemberCount = async ({ store, board, }) => {
    const founderStarterPackUri = board.record.founderStarterPackUri;
    if (!founderStarterPackUri) {
        return 0;
    }
    let starterPackUri;
    try {
        starterPackUri = new syntax_1.AtUri(founderStarterPackUri);
    }
    catch {
        return 0;
    }
    const starterPack = await store.record.getRecord(starterPackUri, null, true);
    if (!starterPack) {
        return 0;
    }
    const listUri = starterPack.value &&
        typeof starterPack.value === 'object' &&
        'list' in starterPack.value &&
        typeof starterPack.value.list === 'string'
        ? starterPack.value.list
        : undefined;
    if (!listUri) {
        return 0;
    }
    const listItems = await store.record.listRecordsForCollection({
        collection: exports.LIST_ITEM_COLLECTION,
        limit: 100,
        reverse: false,
        includeSoftDeleted: true,
    });
    return listItems.filter((item) => {
        return item.value && item.value.list === listUri;
    }).length;
};
exports.getFoundingMemberCount = getFoundingMemberCount;
const buildBoardViewShape = ({ board, creatorDid, creatorHandle, creatorDisplayName, viewerMembershipState, viewerRoles, memberCount, }) => {
    const boardUri = new syntax_1.AtUri(board.uri);
    const slug = (0, exports.deriveBoardSlug)(board.record.name, boardUri.rkey);
    return {
        uri: board.uri,
        cid: board.cid,
        creatorDid,
        creatorHandle,
        creatorDisplayName,
        communityId: slug,
        slug,
        name: board.record.name,
        description: board.record.description,
        quadrant: board.record.quadrant,
        delegatesChatId: board.record.delegatesChatId,
        subdelegatesChatId: board.record.subdelegatesChatId,
        memberCount: memberCount ?? 0,
        viewerMembershipState: viewerMembershipState ?? 'none',
        viewerRoles,
        status: board.record.status,
        founderStarterPackUri: board.record.founderStarterPackUri,
        createdAt: board.record.createdAt,
    };
};
const toGetBoardView = (args) => buildBoardViewShape(args);
exports.toGetBoardView = toGetBoardView;
const toListBoardView = (args) => buildBoardViewShape(args);
exports.toListBoardView = toListBoardView;
const toGovernanceSummary = (governance) => {
    if (!governance)
        return undefined;
    return {
        moderatorCount: governance.moderators.length,
        officialCount: governance.officials.length,
        deputyRoleCount: governance.deputies.length,
        lastPublishedAt: governance.metadata?.lastPublishedAt ||
            governance.updatedAt ||
            governance.createdAt,
    };
};
exports.toGovernanceSummary = toGovernanceSummary;
//# sourceMappingURL=util.js.map
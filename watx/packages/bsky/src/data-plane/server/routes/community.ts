import { ServiceImpl } from '@connectrpc/connect'
import { sql } from 'kysely'
import * as ComParaCommunityGovernance from '../../../lexicon/types/com/para/community/governance'
import {
  GetParaCommunityBoardResponse,
  GetParaCommunityBoardsResponse,
  ParaCommunityBoardView,
  ParaCommunityGovernanceSummary,
} from '../../../proto/bsky_pb'
import { Service } from '../../../proto/bsky_connect'
import { Database } from '../db'

type BoardRow = {
  uri: string
  cid: string
  creator: string
  slug: string
  name: string
  description: string | null
  quadrant: string
  delegatesChatId: string
  subdelegatesChatId: string
  createdAt: string
  creatorHandle: string | null
  creatorDisplayName: string | null
}

type MembershipRow = {
  communityUri: string
  membershipState: string
  roles: string[] | null
}

type GovernanceRecord = ComParaCommunityGovernance.Record

export default (db: Database): Partial<ServiceImpl<typeof Service>> => ({
  async getParaCommunityBoard(req) {
    const board = await selectBoard(db, req.communityId, req.uri)
    if (!board) {
      return new GetParaCommunityBoardResponse()
    }

    const [viewerMembership, memberCount, governanceSummary] =
      await Promise.all([
        req.viewerDid
          ? getViewerMemberships(db, req.viewerDid, [board.uri]).then(
              (memberships) => memberships.get(board.uri),
            )
          : Promise.resolve(undefined),
        getMemberCounts(db, [board.uri]).then((counts) => counts.get(board.uri) ?? 0),
        getGovernanceSummary(db, board.name, board.slug),
      ])

    return new GetParaCommunityBoardResponse({
      board: toBoardView(board, memberCount, viewerMembership),
      governanceSummary: governanceSummary ?? undefined,
    })
  },

  async getParaCommunityBoards(req) {
    const boards = await selectBoards(db, normalizeLimit(req.limit))
    if (boards.length === 0) {
      return new GetParaCommunityBoardsResponse({ boards: [] })
    }

    const uris = boards.map((board) => board.uri)
    const [memberCounts, viewerMemberships] = await Promise.all([
      getMemberCounts(db, uris),
      req.viewerDid
        ? getViewerMemberships(db, req.viewerDid, uris)
        : Promise.resolve(new Map<string, MembershipRow>()),
    ])

    return new GetParaCommunityBoardsResponse({
      boards: boards.map((board) =>
        toBoardView(
          board,
          memberCounts.get(board.uri) ?? 0,
          viewerMemberships.get(board.uri),
        ),
      ),
    })
  },
})

const selectBoard = async (
  db: Database,
  communityId?: string,
  uri?: string,
): Promise<BoardRow | undefined> => {
  let builder = boardBaseQuery(db)

  if (uri) {
    builder = builder.where('board.uri', '=', uri)
  } else if (communityId) {
    builder = builder.where('board.slug', '=', communityId)
  } else {
    return undefined
  }

  return (await builder.executeTakeFirst()) as BoardRow | undefined
}

const selectBoards = async (db: Database, limit: number): Promise<BoardRow[]> => {
  return (await boardBaseQuery(db)
    .orderBy('board.createdAt', 'desc')
    .limit(limit)
    .execute()) as BoardRow[]
}

const boardBaseQuery = (db: Database) =>
  db.db
    .selectFrom('para_community_board as board')
    .leftJoin('actor as actor', 'actor.did', 'board.creator')
    .select([
      'board.uri',
      'board.cid',
      'board.creator',
      'board.slug',
      'board.name',
      'board.description',
      'board.quadrant',
      'board.delegatesChatId',
      'board.subdelegatesChatId',
      'board.createdAt',
    ])
    .select('actor.handle as creatorHandle')
    .select(sql<string | null>`null`.as('creatorDisplayName'))

const getMemberCounts = async (db: Database, communityUris: string[]) => {
  if (communityUris.length === 0) {
    return new Map<string, number>()
  }

  const rows = await db.db
    .selectFrom('para_community_membership')
    .where('communityUri', 'in', communityUris)
    .where('membershipState', '=', 'active')
    .select([
      'communityUri',
      sql<number>`count(*)`.as('memberCount'),
    ])
    .groupBy('communityUri')
    .execute()

  return new Map(
    rows.map((row) => [row.communityUri, Number(row.memberCount) || 0]),
  )
}

const getViewerMemberships = async (
  db: Database,
  viewerDid: string,
  communityUris: string[],
) => {
  if (!viewerDid || communityUris.length === 0) {
    return new Map<string, MembershipRow>()
  }

  const rows = await db.db
    .selectFrom('para_community_membership')
    .where('creator', '=', viewerDid)
    .where('communityUri', 'in', communityUris)
    .select(['communityUri', 'membershipState', 'roles'])
    .execute()

  return new Map(rows.map((row) => [row.communityUri, row]))
}

const toBoardView = (
  board: BoardRow,
  memberCount: number,
  viewerMembership?: MembershipRow,
) =>
  new ParaCommunityBoardView({
    uri: board.uri,
    cid: board.cid,
    creatorDid: board.creator,
    creatorHandle: board.creatorHandle ?? '',
    creatorDisplayName: board.creatorDisplayName ?? '',
    communityId: board.slug,
    slug: board.slug,
    name: board.name,
    description: board.description ?? '',
    quadrant: board.quadrant,
    delegatesChatId: board.delegatesChatId,
    subdelegatesChatId: board.subdelegatesChatId,
    memberCount,
    viewerMembershipState: viewerMembership?.membershipState ?? 'none',
    viewerRoles: viewerMembership?.roles ?? [],
    createdAt: board.createdAt,
  })

const getGovernanceSummary = async (
  db: Database,
  community: string,
  slug: string,
): Promise<ParaCommunityGovernanceSummary | null> => {
  const record = await getPublishedGovernanceRecord(db, community, slug)
  if (!record) return null

  return new ParaCommunityGovernanceSummary({
    moderatorCount: record.moderators.length,
    officialCount: record.officials.length,
    deputyRoleCount: record.deputies.length,
    lastPublishedAt:
      record.metadata?.lastPublishedAt || record.updatedAt || record.createdAt,
  })
}

const COMMUNITY_TRANSLATION_SOURCE =
  'ÁÀÄÂÃáàäâãÉÈËÊéèëêÍÌÏÎíìïîÓÒÖÔÕóòöôõÚÙÜÛúùüûÑñÇç'
const COMMUNITY_TRANSLATION_TARGET =
  'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuNnCc'

const getPublishedGovernanceRecord = async (
  db: Database,
  community: string,
  slug: string,
): Promise<GovernanceRecord | null> => {
  const suffix = `/com.para.community.governance/${slug || 'community'}`

  const slugMatch = await db.db
    .selectFrom('record')
    .select(['json'])
    .where('uri', 'like', `%${suffix}`)
    .orderBy('indexedAt', 'desc')
    .executeTakeFirst()
  if (slugMatch) {
    return parseGovernanceRecord(slugMatch.json)
  }

  const normalizedCommunity = normalizeCommunityKey(community)
  const recordMatch = await db.db
    .selectFrom('record')
    .select(['json'])
    .where('uri', 'like', '%/com.para.community.governance/%')
    .where(
      sql`regexp_replace(lower(translate(regexp_replace(coalesce(("record"."json"::jsonb ->> 'community'), ''), '^p/', '', 'i'), ${COMMUNITY_TRANSLATION_SOURCE}, ${COMMUNITY_TRANSLATION_TARGET})), '[^a-z0-9]+', '', 'g')`,
      '=',
      normalizedCommunity,
    )
    .orderBy('indexedAt', 'desc')
    .executeTakeFirst()

  return recordMatch ? parseGovernanceRecord(recordMatch.json) : null
}

const parseGovernanceRecord = (json: string): GovernanceRecord | null => {
  try {
    const parsed = JSON.parse(json)
    const validated = ComParaCommunityGovernance.validateRecord(parsed)
    return validated.success ? (validated.value as GovernanceRecord) : null
  } catch {
    return null
  }
}

const normalizeCommunityKey = (value: string) =>
  value
    .trim()
    .replace(/^p\//i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')

const normalizeLimit = (limit: number) => {
  if (!limit || Number.isNaN(limit)) return 50
  return Math.max(1, Math.min(limit, 100))
}

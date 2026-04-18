import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {STALE} from '#/state/queries'
import {useAgent} from '#/state/session'

const RQKEY_ROOT = 'community-boards'

export type CommunityBoardView = {
  uri: string
  cid: string
  creatorDid: string
  creatorHandle?: string
  creatorDisplayName?: string
  communityId: string
  slug: string
  name: string
  description?: string
  quadrant: string
  delegatesChatId: string
  subdelegatesChatId: string
  memberCount: number
  viewerMembershipState:
    | 'none'
    | 'pending'
    | 'active'
    | 'left'
    | 'removed'
    | 'blocked'
  viewerRoles?: string[]
  status?: 'draft' | 'active'
  founderStarterPackUri?: string
  createdAt: string
  governanceSummary?: {
    moderatorCount: number
    officialCount: number
    deputyRoleCount: number
    lastPublishedAt?: string
  }
}

export type CommunityBoardsResponse = {
  boards: CommunityBoardView[]
  canCreateCommunity: boolean
}

export type CommunityBoardResponse = {
  board: CommunityBoardView
  viewerCapabilities: string[]
}

type CreateCommunityInput = {
  name: string
  quadrant: string
  description?: string
  founderStarterPackName?: string
}

type AcceptDraftInviteInput = {
  communityUri: string
}

type AcceptDraftInviteResponse = {
  status: 'draft' | 'active'
  memberCount: number
}

type CreateCommunityResponse = {
  uri: string
  cid: string
  delegatesChatId: string
  subdelegatesChatId: string
}

export const communityBoardsQueryKey = (limit: number) => [
  RQKEY_ROOT,
  'list',
  limit,
]

export const communityBoardQueryKey = ({
  communityId,
  uri,
}: {
  communityId?: string
  uri?: string
}) => [RQKEY_ROOT, 'detail', communityId || '', uri || '']

export function useCommunityBoardsQuery({limit = 12}: {limit?: number} = {}) {
  const agent = useAgent()

  return useQuery<CommunityBoardsResponse>({
    staleTime: STALE.SECONDS.THIRTY,
    queryKey: communityBoardsQueryKey(limit),
    queryFn: async () => fetchCommunityBoards({agent, limit}),
  })
}

export function useCommunityBoardQuery({
  communityId,
  uri,
  enabled = true,
}: {
  communityId?: string
  uri?: string
  enabled?: boolean
}) {
  const agent = useAgent()

  return useQuery<CommunityBoardResponse>({
    staleTime: STALE.SECONDS.THIRTY,
    enabled: enabled && Boolean(communityId || uri),
    queryKey: communityBoardQueryKey({communityId, uri}),
    queryFn: async () => fetchCommunityBoard({agent, communityId, uri}),
  })
}

export function useCreateCommunityMutation() {
  const agent = useAgent()
  const queryClient = useQueryClient()

  return useMutation<CreateCommunityResponse, Error, CreateCommunityInput>({
    mutationFn: async input => createCommunity({agent, input}),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: [RQKEY_ROOT]})
    },
  })
}

export function useAcceptDraftInviteMutation() {
  const agent = useAgent()
  const queryClient = useQueryClient()

  return useMutation<AcceptDraftInviteResponse, Error, AcceptDraftInviteInput>({
    mutationFn: async input => acceptDraftInvite({agent, input}),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: [RQKEY_ROOT]})
    },
  })
}

async function fetchCommunityBoards({
  agent,
  limit,
}: {
  agent: ReturnType<typeof useAgent>
  limit: number
}): Promise<CommunityBoardsResponse> {
  const params = new URLSearchParams()
  params.set('limit', String(limit))

  const res = await agent.fetchHandler(
    `/xrpc/com.para.community.listBoards?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res))
  }

  return normalizeCommunityBoardsResponse(await res.json())
}

async function fetchCommunityBoard({
  agent,
  communityId,
  uri,
}: {
  agent: ReturnType<typeof useAgent>
  communityId?: string
  uri?: string
}): Promise<CommunityBoardResponse> {
  const params = new URLSearchParams()
  if (communityId) params.set('communityId', communityId)
  if (uri) params.set('uri', uri)

  const res = await agent.fetchHandler(
    `/xrpc/com.para.community.getBoard?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res))
  }

  return normalizeCommunityBoardResponse(await res.json())
}

async function createCommunity({
  agent,
  input,
}: {
  agent: ReturnType<typeof useAgent>
  input: CreateCommunityInput
}): Promise<CreateCommunityResponse> {
  const res = await agent.fetchHandler(`/xrpc/com.para.community.createBoard`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-idempotency-key': buildIdempotencyKey(),
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res))
  }

  const json = asRecord(await res.json())
  return {
    uri: readString(json?.uri) ?? '',
    cid: readString(json?.cid) ?? '',
    delegatesChatId: readString(json?.delegatesChatId) ?? '',
    subdelegatesChatId: readString(json?.subdelegatesChatId) ?? '',
  }
}

function normalizeCommunityBoardsResponse(
  json: unknown,
): CommunityBoardsResponse {
  const data = asRecord(json) ?? {}
  const boards = Array.isArray(data.boards) ? data.boards : []

  return {
    boards: boards.map(normalizeBoard),
    canCreateCommunity: Boolean(data.canCreateCommunity),
  }
}

function normalizeCommunityBoardResponse(json: unknown): CommunityBoardResponse {
  const data = asRecord(json) ?? {}
  return {
    board: normalizeBoard(data.board),
    viewerCapabilities: Array.isArray(data.viewerCapabilities)
      ? data.viewerCapabilities.filter(
          capability => typeof capability === 'string',
        )
      : [],
  }
}

function normalizeBoard(json: unknown): CommunityBoardView {
  const data = asRecord(json) ?? {}
  const governanceSummary = asRecord(data.governanceSummary)

  return {
    uri: readString(data.uri) ?? '',
    cid: readString(data.cid) ?? '',
    creatorDid: readString(data.creatorDid) ?? '',
    creatorHandle: readString(data.creatorHandle),
    creatorDisplayName: readString(data.creatorDisplayName),
    communityId: readString(data.communityId) ?? '',
    slug: readString(data.slug) ?? '',
    name: readString(data.name) ?? '',
    description: readString(data.description),
    quadrant: readString(data.quadrant) ?? '',
    delegatesChatId: readString(data.delegatesChatId) ?? '',
    subdelegatesChatId: readString(data.subdelegatesChatId) ?? '',
    memberCount:
      typeof data.memberCount === 'number'
        ? data.memberCount
        : Number(readString(data.memberCount) ?? 0),
    viewerMembershipState: normalizeMembershipState(data.viewerMembershipState),
    viewerRoles: Array.isArray(data.viewerRoles)
      ? data.viewerRoles.filter(role => typeof role === 'string')
      : undefined,
    status: normalizeStatus(data.status),
    founderStarterPackUri: readString(data.founderStarterPackUri),
    createdAt: readString(data.createdAt) ?? '',
    governanceSummary: governanceSummary
      ? {
          moderatorCount: normalizeNumber(governanceSummary.moderatorCount),
          officialCount: normalizeNumber(governanceSummary.officialCount),
          deputyRoleCount: normalizeNumber(governanceSummary.deputyRoleCount),
          lastPublishedAt: readString(governanceSummary.lastPublishedAt),
        }
      : undefined,
  }
}

function normalizeMembershipState(
  value: unknown,
): CommunityBoardView['viewerMembershipState'] {
  switch (value) {
    case 'pending':
    case 'active':
    case 'left':
    case 'removed':
    case 'blocked':
      return value
    default:
      return 'none'
  }
}

async function extractErrorMessage(res: Response) {
  try {
    const json = asRecord(await res.json())
    const message = readString(json?.message)
    if (message?.trim()) {
      return message
    }
    const error = readString(json?.error)
    if (error?.trim()) {
      return error
    }
  } catch {}

  return `Request failed (${res.status})`
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return undefined
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function normalizeNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  const parsed = Number(readString(value) ?? value ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}

function buildIdempotencyKey() {
  return `community-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function normalizeStatus(
  value: unknown,
): CommunityBoardView['status'] {
  switch (value) {
    case 'draft':
    case 'active':
      return value
    default:
      return undefined
  }
}

async function acceptDraftInvite({
  agent,
  input,
}: {
  agent: ReturnType<typeof useAgent>
  input: AcceptDraftInviteInput
}): Promise<AcceptDraftInviteResponse> {
  const res = await agent.fetchHandler(
    `/xrpc/com.para.community.acceptDraftInvite`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  )

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res))
  }

  const json = asRecord(await res.json())
  return {
    status: (readString(json?.status) as 'draft' | 'active') ?? 'draft',
    memberCount:
      typeof json?.memberCount === 'number' ? json.memberCount : 0,
  }
}

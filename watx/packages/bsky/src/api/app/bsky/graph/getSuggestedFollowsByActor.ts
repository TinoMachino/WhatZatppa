import { mapDefined, noUndefinedVals } from '@atproto/common'
import { Client } from '@atproto/lex'
import { Headers as HeadersMap } from '@atproto/xrpc-server'
import { InvalidRequestError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { Gate } from '../../../../feature-gates/gates'
import { HydrateCtx, Hydrator } from '../../../../hydration/hydrator'
import { Server } from '../../../../lexicon'
import { QueryParams } from '../../../../lexicon/types/app/bsky/graph/getSuggestedFollowsByActor'
import { app } from '../../../../lexicons/index.js'
import {
  HydrationFnInput,
  PresentationFnInput,
  RulesFnInput,
  SkeletonFnInput,
  createPipeline,
} from '../../../../pipeline'
import { Views } from '../../../../views'
import { resHeaders } from '../../../util'

const SOCIAL_PROOF_GATE = Gate.SuggestedUsersSocialProofEnable

export default function (server: Server, ctx: AppContext) {
  const getSuggestedFollowsByActor = createPipeline(
    skeleton,
    hydration,
    noBlocksOrMutes,
    presentation,
  )
  server.app.bsky.graph.getSuggestedFollowsByActor({
    auth: ctx.authVerifier.standardOptional,
    handler: async ({ auth, params, req }) => {
      const viewer = auth.credentials.iss
      const labelers = ctx.reqLabelers(req)
      const hydrateCtx = await ctx.hydrator.createContext({
        labelers,
        viewer,
        features: ctx.featureGatesClient.scope(
          ctx.featureGatesClient.parseUserContextFromHandler({
            viewer,
            req,
          }),
        ),
      })
      const headers = noUndefinedVals({
        'accept-language': req.headers['accept-language'],
        'x-bsky-topics': Array.isArray(req.headers['x-bsky-topics'])
          ? req.headers['x-bsky-topics'].join(',')
          : req.headers['x-bsky-topics'],
      })
      const { headers: resultHeaders, ...result } =
        await getSuggestedFollowsByActor(
          { ...params, hydrateCtx, headers },
          ctx,
        )
      const responseHeaders = noUndefinedVals({
        'content-language': resultHeaders?.get('content-language') ?? undefined,
      })
      return {
        encoding: 'application/json',
        body: result,
        headers: {
          ...responseHeaders,
          ...resHeaders({ labelers: hydrateCtx.labelers }),
        },
      }
    },
  })
}

const skeleton = async (input: SkeletonFnInput<Context, Params>) => {
  const { params, ctx } = input
  const [relativeToDid] = await ctx.hydrator.actor.getDids([params.actor])
  if (!relativeToDid) {
    throw new InvalidRequestError('Actor not found')
  }

  if (ctx.suggestionsClient) {
    const res = await ctx.suggestionsClient.xrpc(
      app.bsky.unspecced.getSuggestionsSkeleton,
      {
        headers: params.headers,
        params: {
          viewer: params.hydrateCtx.viewer ?? undefined,
          relativeToDid,
        } as app.bsky.unspecced.getSuggestionsSkeleton.$Params,
      },
    )
    return {
      isFallback: !res.body.relativeToDid,
      suggestedDids: res.body.actors.map((a) => a.did),
      recId: res.body.recId,
      recIdStr: res.body.recIdStr,
      headers: res.headers,
    }
  } else {
    if (!params.hydrateCtx.viewer) {
      return {
        isFallback: true,
        suggestedDids: [],
      }
    }
    const { dids } = await ctx.hydrator.dataplane.getFollowSuggestions({
      actorDid: params.hydrateCtx.viewer,
      relativeToDid,
    })
    return {
      isFallback: true,
      suggestedDids: dids,
    }
  }
}

const hydration = async (
  input: HydrationFnInput<Context, Params, SkeletonState>,
) => {
  const { ctx, params, skeleton } = input
  const { suggestedDids } = skeleton
  if (params.hydrateCtx.features.checkGate(SOCIAL_PROOF_GATE)) {
    return ctx.hydrator.hydrateProfilesDetailed(
      suggestedDids,
      params.hydrateCtx,
    )
  }
  return ctx.hydrator.hydrateProfiles(suggestedDids, params.hydrateCtx)
}

const noBlocksOrMutes = (
  input: RulesFnInput<Context, Params, SkeletonState>,
) => {
  const { ctx, skeleton, hydration } = input
  skeleton.suggestedDids = skeleton.suggestedDids.filter(
    (did) =>
      !ctx.views.viewerBlockExists(did, hydration) &&
      !ctx.views.viewerMuteExists(did, hydration),
  )
  return skeleton
}

const presentation = (
  input: PresentationFnInput<Context, Params, SkeletonState>,
) => {
  const { ctx, hydration, params, skeleton } = input
  const { suggestedDids, headers } = skeleton
  const suggestions = mapDefined(suggestedDids, (did) =>
    params.hydrateCtx.features.checkGate(SOCIAL_PROOF_GATE)
      ? ctx.views.profileKnownFollowers(did, hydration)
      : ctx.views.profile(did, hydration),
  )
  return {
    isFallback: skeleton.isFallback,
    suggestions,
    recId: skeleton.recId,
    recIdStr: skeleton.recIdStr,
    headers,
  }
}

type Context = {
  hydrator: Hydrator
  views: Views
  suggestionsClient: Client | undefined
}

type Params = QueryParams & {
  hydrateCtx: HydrateCtx
  headers: HeadersMap
}

type SkeletonState = {
  isFallback: boolean
  suggestedDids: string[]
  recId?: number
  recIdStr?: string
  headers?: Headers
}

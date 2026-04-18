import { ForbiddenError } from '@atproto/xrpc-server'
import { AuthScope } from '../../../../auth-scope'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

// THIS IS A TEMPORARY UNSPECCED ROUTE
export default function (server: Server, ctx: AppContext) {
  server.com.atproto.temp.checkSignupQueue({
    auth: ctx.authVerifier.authorization({
      additional: [AuthScope.SignupQueued],
      authorize: () => {
        throw new ForbiddenError(
          'OAuth credentials are not supported for this endpoint',
        )
      },
    }),
    handler: async ({ req }) => {
      if (!ctx.entrywayClient) {
        return {
          encoding: 'application/json',
          body: {
            activated: true,
          },
        }
      }
      const result = await ctx.entrywayClient.xrpc(
        com.atproto.temp.checkSignupQueue.main,
        ctx.entrywayPassthruHeaders(req),
      )
      return {
        encoding: 'application/json',
        body: result.body,
      }
    },
  })
}

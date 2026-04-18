import { ForbiddenError } from '@atproto/xrpc-server'
import { ACCESS_FULL } from '../../../../auth-scope'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.createAppPassword({
    auth: ctx.authVerifier.authorization({
      checkTakedown: true,
      scopes: ACCESS_FULL,
      authorize: () => {
        throw new ForbiddenError(
          'OAuth credentials are not supported for this endpoint',
        )
      },
    }),
    handler: async ({ auth, input, req }) => {
      if (ctx.entrywayClient) {
        const body = await ctx.entrywayClient.call(
          com.atproto.server.createAppPassword.main,
          input.body,
          await ctx.entrywayAuthHeaders(
            req,
            auth.credentials.did,
            ids.ComAtprotoServerCreateAppPassword,
          ),
        )
        return {
          encoding: 'application/json',
          body,
        }
      }

      const { name } = input.body
      const appPassword = await ctx.accountManager.createAppPassword(
        auth.credentials.did,
        name,
        input.body.privileged ?? false,
      )

      return {
        encoding: 'application/json',
        body: appPassword,
      }
    },
  })
}

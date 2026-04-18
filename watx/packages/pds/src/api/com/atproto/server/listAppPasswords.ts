import { ForbiddenError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.listAppPasswords({
    auth: ctx.authVerifier.authorization({
      authorize: () => {
        throw new ForbiddenError(
          'OAuth credentials are not supported for this endpoint',
        )
      },
    }),
    handler: async ({ auth, req }) => {
      if (ctx.entrywayClient) {
        const body = await ctx.entrywayClient.call(
          com.atproto.server.listAppPasswords.main,
          {},
          await ctx.entrywayAuthHeaders(
            req,
            auth.credentials.did,
            ids.ComAtprotoServerListAppPasswords,
          ),
        )
        return {
          encoding: 'application/json',
          body,
        }
      }

      const passwords = await ctx.accountManager.listAppPasswords(
        auth.credentials.did,
      )
      return {
        encoding: 'application/json',
        body: { passwords },
      }
    },
  })
}

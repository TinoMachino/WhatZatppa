import { ForbiddenError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.revokeAppPassword({
    auth: ctx.authVerifier.authorization({
      authorize: () => {
        throw new ForbiddenError(
          'OAuth credentials are not supported for this endpoint',
        )
      },
    }),
    handler: async ({ auth, input, req }) => {
      if (ctx.entrywayClient) {
        await ctx.entrywayClient.call(
          com.atproto.server.revokeAppPassword.main,
          input.body,
          await ctx.entrywayAuthHeaders(
            req,
            auth.credentials.did,
            ids.ComAtprotoServerRevokeAppPassword,
          ),
        )
        return
      }

      const requester = auth.credentials.did
      const { name } = input.body

      await ctx.accountManager.revokeAppPassword(requester, name)
    },
  })
}

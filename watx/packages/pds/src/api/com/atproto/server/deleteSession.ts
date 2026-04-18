import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  const { entrywayClient } = ctx
  if (entrywayClient) {
    server.com.atproto.server.deleteSession(async ({ req }) => {
      await entrywayClient.call(
        com.atproto.server.deleteSession.main,
        undefined,
        ctx.entrywayPassthruHeaders(req),
      )
    })
  } else {
    server.com.atproto.server.deleteSession({
      auth: ctx.authVerifier.refresh({
        allowExpired: true,
      }),
      handler: async ({ auth }) => {
        await ctx.accountManager.revokeRefreshToken(auth.credentials.tokenId)
      },
    })
  }
}

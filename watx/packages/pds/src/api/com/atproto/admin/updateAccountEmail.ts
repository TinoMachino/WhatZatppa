import { InvalidRequestError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.admin.updateAccountEmail({
    auth: ctx.authVerifier.adminToken,
    handler: async ({ input, req }) => {
      const account = await ctx.accountManager.getAccount(input.body.account, {
        includeDeactivated: true,
        includeTakenDown: true,
      })
      if (!account) {
        throw new InvalidRequestError(
          `Account does not exist: ${input.body.account}`,
        )
      }

      if (ctx.entrywayClient) {
        await ctx.entrywayClient.call(
          com.atproto.admin.updateAccountEmail.main,
          input.body as com.atproto.admin.updateAccountEmail.$InputBody,
          ctx.entrywayPassthruHeaders(req),
        )
        return
      }

      await ctx.accountManager.updateEmail({
        did: account.did,
        email: input.body.email,
      })
    },
  })
}

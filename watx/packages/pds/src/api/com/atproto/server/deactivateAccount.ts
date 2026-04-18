import { ForbiddenError } from '@atproto/xrpc-server'
import { ACCESS_FULL, AuthScope } from '../../../../auth-scope'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.deactivateAccount({
    auth: ctx.authVerifier.authorization({
      additional: [AuthScope.Takendown],
      scopes: ACCESS_FULL,
      authorize: () => {
        throw new ForbiddenError(
          'OAuth credentials are not supported for this endpoint',
        )
      },
    }),
    handler: async ({ req, auth, input }) => {
      // in the case of entryway, the full flow is deactivateAccount (PDS) -> deactivateAccount (Entryway) -> updateSubjectStatus(PDS)
      if (ctx.entrywayClient) {
        await ctx.entrywayClient.call(
          com.atproto.server.deactivateAccount.main,
          input.body as com.atproto.server.deactivateAccount.$InputBody,
          ctx.entrywayPassthruHeaders(req),
        )
        return
      }

      const requester = auth.credentials.did
      await ctx.accountManager.deactivateAccount(
        requester,
        input.body.deleteAfter ?? null,
      )
      const status = await ctx.accountManager.getAccountStatus(requester)
      await ctx.sequencer.sequenceAccountEvt(requester, status)
    },
  })
}

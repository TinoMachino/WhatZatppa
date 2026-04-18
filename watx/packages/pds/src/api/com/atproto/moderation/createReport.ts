import { xrpc } from '@atproto/lex'
import { AuthScope } from '../../../../auth-scope'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { com } from '../../../../lexicons/index.js'
import { computeProxyTo, parseProxyInfo } from '../../../../pipethrough'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.moderation.createReport({
    auth: ctx.authVerifier.authorization({
      additional: [AuthScope.Takendown],
      authorize: (permissions, { req }) => {
        const lxm = ids.ComAtprotoModerationCreateReport
        const aud = computeProxyTo(ctx, req, lxm)
        permissions.assertRpc({ aud, lxm })
      },
    }),
    handler: async ({ auth, input, req }) => {
      const { url, did: aud } = await parseProxyInfo(
        ctx,
        req,
        ids.ComAtprotoModerationCreateReport,
      )
      const { headers } = await ctx.serviceAuthHeaders(
        auth.credentials.did,
        aud,
        ids.ComAtprotoModerationCreateReport,
      )
      const result = await xrpc(url, com.atproto.moderation.createReport.main, {
        body: input.body as com.atproto.moderation.createReport.$InputBody,
        headers,
        validateRequest: ctx.cfg.service.devMode,
        validateResponse: ctx.cfg.service.devMode,
        strictResponseProcessing: ctx.cfg.service.devMode,
      })

      return {
        encoding: 'application/json',
        body: result.body,
      }
    },
  })
}

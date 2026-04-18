import { InvalidRequestError } from '@atproto/xrpc-server'
import { NEW_PASSWORD_MAX_LENGTH } from '../../../../account-manager/helpers/scrypt'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.admin.updateAccountPassword({
    auth: ctx.authVerifier.adminToken,
    handler: async ({ input, req }) => {
      if (ctx.entrywayClient) {
        await ctx.entrywayClient.call(
          com.atproto.admin.updateAccountPassword.main,
          input.body as com.atproto.admin.updateAccountPassword.$InputBody,
          ctx.entrywayPassthruHeaders(req),
        )
        return
      }

      const { did, password } = input.body

      if (password.length > NEW_PASSWORD_MAX_LENGTH) {
        throw new InvalidRequestError('Invalid password length.')
      }

      await ctx.accountManager.updateAccountPassword({ did, password })
    },
  })
}

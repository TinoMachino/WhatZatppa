import { InvalidRequestError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { ids } from '../../../../lexicon/lexicons'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.admin.sendEmail({
    auth: ctx.authVerifier.moderator,
    handler: async ({ input, req }) => {
      const {
        content,
        recipientDid,
        subject = 'Message via your PDS',
      } = input.body

      const account = await ctx.accountManager.getAccount(recipientDid, {
        includeDeactivated: true,
        includeTakenDown: true,
      })
      if (!account) {
        throw new InvalidRequestError('Recipient not found')
      }

      if (ctx.entrywayClient) {
        const body = await ctx.entrywayClient.call(
          com.atproto.admin.sendEmail.main,
          input.body as com.atproto.admin.sendEmail.$InputBody,
          await ctx.entrywayAuthHeaders(
            req,
            recipientDid,
            ids.ComAtprotoAdminSendEmail,
          ),
        )
        return {
          encoding: 'application/json',
          body,
        }
      }

      if (!account.email) {
        throw new InvalidRequestError('account does not have an email address')
      }

      await ctx.moderationMailer.send(
        { content },
        { subject, to: account.email },
      )

      return {
        encoding: 'application/json',
        body: { sent: true },
      }
    },
  })
}

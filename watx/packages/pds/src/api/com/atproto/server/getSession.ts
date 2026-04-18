import { ComAtprotoServerGetSession } from '@atproto/api'
import { INVALID_HANDLE } from '@atproto/syntax'
import { InvalidRequestError } from '@atproto/xrpc-server'
import { formatAccountStatus } from '../../../../account-manager/account-manager'
import { AccessOutput, OAuthOutput } from '../../../../auth-output'
import { AuthScope } from '../../../../auth-scope'
import { AppContext } from '../../../../context'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'
import { didDocForSession } from './util'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.getSession({
    auth: ctx.authVerifier.authorization({
      additional: [AuthScope.SignupQueued],
      authorize: () => {
        // Always allowed. "email" access is checked in the handler.
      },
    }),
    handler: async ({ auth, req }) => {
      if (ctx.entrywayClient) {
        const headers = await ctx.entrywayAuthHeaders(
          req,
          auth.credentials.did,
          'com.atproto.server.getSession',
        )

        const data = await ctx.entrywayClient.call(
          com.atproto.server.getSession.main,
          {},
          headers,
        )

        return {
          encoding: 'application/json',
          body: output(auth, data),
        }
      }

      const did = auth.credentials.did
      const [user, didDoc] = await Promise.all([
        ctx.accountManager.getAccount(did, { includeDeactivated: true }),
        didDocForSession(ctx, did),
      ])
      if (!user) {
        throw new InvalidRequestError(
          `Could not find user info for account: ${did}`,
        )
      }

      const { status, active } = formatAccountStatus(user)
      const sessionData = {
        did: user.did,
        handle: user.handle ?? INVALID_HANDLE,
        emailConfirmed: !!user.emailConfirmedAt,
        active,
        ...(status ? { status } : {}),
        ...(didDoc ? { didDoc } : {}),
        ...(user.email ? { email: user.email } : {}),
      }

      return {
        encoding: 'application/json',
        body: output(auth, sessionData),
      }
    },
  })
}

function output(
  { credentials }: OAuthOutput | AccessOutput,
  data: ComAtprotoServerGetSession.OutputSchema,
): ComAtprotoServerGetSession.OutputSchema {
  if (
    credentials.type === 'oauth' &&
    !credentials.permissions.allowsAccount({ attr: 'email', action: 'read' })
  ) {
    const { email, emailAuthFactor, emailConfirmed, ...rest } = data
    return rest
  }

  return data
}

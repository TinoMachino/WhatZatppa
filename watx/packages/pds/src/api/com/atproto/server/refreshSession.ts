import { INVALID_HANDLE } from '@atproto/syntax'
import { AuthRequiredError, InvalidRequestError } from '@atproto/xrpc-server'
import { formatAccountStatus } from '../../../../account-manager/account-manager'
import { AppContext } from '../../../../context'
import { softDeleted } from '../../../../db/util'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'
import { didDocForSession } from './util'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.server.refreshSession({
    auth: ctx.authVerifier.refresh(),
    handler: async ({ auth, req }) => {
      const did = auth.credentials.did
      const user = await ctx.accountManager.getAccount(did, {
        includeDeactivated: true,
        includeTakenDown: true,
      })
      if (!user) {
        throw new InvalidRequestError(
          `Could not find user info for account: ${did}`,
        )
      }
      if (softDeleted(user)) {
        throw new AuthRequiredError(
          'Account has been taken down',
          'AccountTakedown',
        )
      }

      if (ctx.entrywayClient) {
        const body = await ctx.entrywayClient.call(
          com.atproto.server.refreshSession.main,
          undefined,
          ctx.entrywayPassthruHeaders(req),
        )
        return {
          encoding: 'application/json',
          body,
        }
      }

      const [didDoc, rotated] = await Promise.all([
        didDocForSession(ctx, user.did),
        ctx.accountManager.rotateRefreshToken(auth.credentials.tokenId),
      ])
      if (rotated === null) {
        throw new InvalidRequestError('Token has been revoked', 'ExpiredToken')
      }

      const { status, active } = formatAccountStatus(user)
      const body = {
        accessJwt: rotated.accessJwt,
        refreshJwt: rotated.refreshJwt,
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
        body,
      }
    },
  })
}

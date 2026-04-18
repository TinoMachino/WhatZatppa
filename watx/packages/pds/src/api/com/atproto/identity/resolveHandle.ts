import { InvalidRequestError } from '@atproto/xrpc-server'
import { AppContext } from '../../../../context'
import { baseNormalizeAndValidate } from '../../../../handle'
import { Server } from '../../../../lexicon'
import { com } from '../../../../lexicons/index.js'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.identity.resolveHandle(async ({ params }) => {
    const handle = baseNormalizeAndValidate(params.handle)

    const user = await ctx.accountManager.getAccount(handle)
    if (user) {
      return {
        encoding: 'application/json',
        body: { did: user.did },
      }
    }

    const supportedHandle = ctx.cfg.identity.serviceHandleDomains.some(
      (host) => handle.endsWith(host) || handle === host.slice(1),
    )
    // this should be in our DB & we couldn't find it, so fail
    if (supportedHandle) {
      throw new InvalidRequestError('Unable to resolve handle')
    }

    // This is not someone on our server, but we help with resolving anyway
    let did: string | undefined

    // Either ask appview to resolve, or perform resolution, but don't do both.
    if (ctx.bskyAppView) {
      try {
        const result = await ctx.bskyAppView.client.call(
          com.atproto.identity.resolveHandle.main,
          {
            handle,
          },
          { validateResponse: ctx.bskyAppView.validateResponse },
        )
        did = result.did
      } catch {
        // Ignore
      }
    } else {
      did = await ctx.idResolver.handle.resolve(handle)
    }

    if (!did) {
      throw new InvalidRequestError('Unable to resolve handle')
    }

    return {
      encoding: 'application/json',
      body: { did },
    }
  })
}

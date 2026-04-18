import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect'
import { AppContext } from '../context'
import { Service } from '../proto/bsync_connect'
import { DeleteOperationsByActorAndNamespaceResponse } from '../proto/bsync_pb'
import { authWithApiKey } from './auth'
import { isValidDid, validateNamespace } from './util'

export default (ctx: AppContext): Partial<ServiceImpl<typeof Service>> => ({
  /**
   * Deletes operation log rows for a specific actor and namespace.
   *
   * This is used as the final cleanup step after downstream deletion work has
   * already been carried out elsewhere.
   */
  async deleteOperationsByActorAndNamespace(req, handlerCtx) {
    authWithApiKey(ctx, handlerCtx)
    const { db } = ctx

    try {
      validateNamespace(req.namespace)
    } catch {
      throw new ConnectError(
        'requested namespace for deletion is invalid NSID',
        Code.InvalidArgument,
      )
    }
    if (!isValidDid(req.actorDid)) {
      throw new ConnectError(
        'requested actor_did for deletion is invalid DID',
        Code.InvalidArgument,
      )
    }

    const deletedRows = await db.db
      .deleteFrom('operation')
      .where('actorDid', '=', req.actorDid)
      .where('namespace', '=', req.namespace)
      .returning('id')
      .execute()

    return new DeleteOperationsByActorAndNamespaceResponse({
      deletedCount: deletedRows.length,
    })
  },
})

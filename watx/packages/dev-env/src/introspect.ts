import events from 'node:events'
import http from 'node:http'
import express from 'express'

const DEFAULT_PROCESS_ALL_TIMEOUT_MS = 60_000

type IntrospectRuntime = {
  plc: {
    url: string
  }
  pds: {
    url: string
    ctx: {
      cfg: {
        service: {
          did: string
        }
      }
    }
  }
  bsky: {
    url: string
    ctx: {
      cfg: {
        serverDid: string
      }
    }
  }
  ozone: {
    url: string
    ctx: {
      cfg: {
        service: {
          did: string
        }
        db: {
          postgresUrl: string
        }
      }
    }
  }
  processAll: (timeout?: number) => Promise<void>
  reindexAllRepos: () => Promise<{
    reposIndexed: number
    reposSkipped: number
    failures: Array<{
      did: string
      error: string
    }>
  }>
  reindexRepo: (did: string) => Promise<{
    did: string
  }>
  upsertActorsByHandle: (handles: string[]) => Promise<{
    actorsUpserted: number
    failures: Array<{
      handle: string
      error: string
    }>
  }>
  getSyncState: () => Promise<{
    lastSeq: number | null
    runnerCursor: number | null
  }>
}

export class IntrospectServer {
  constructor(
    public port: number,
    public server: http.Server,
  ) {}

  static async start(
    port: number,
    runtime: IntrospectRuntime,
  ) {
    const app = express()
    app.use(express.json())
    app.get('/', (_req, res) => {
      res.status(200).send({
        plc: {
          url: runtime.plc.url,
        },
        pds: {
          url: runtime.pds.url,
          did: runtime.pds.ctx.cfg.service.did,
        },
        bsky: {
          url: runtime.bsky.url,
          did: runtime.bsky.ctx.cfg.serverDid,
        },
        ozone: {
          url: runtime.ozone.url,
          did: runtime.ozone.ctx.cfg.service.did,
        },
        db: {
          url: runtime.ozone.ctx.cfg.db.postgresUrl,
        },
      })
    })

    app.post('/process-all', async (req, res) => {
      const handles = Array.isArray(req.body?.handles)
        ? req.body.handles
            .filter((handle): handle is string => typeof handle === 'string')
            .map((handle) => handle.trim())
            .filter(Boolean)
        : []
      const requestedTimeout = Number(req.query.timeoutMs)
      const timeoutMs =
        Number.isFinite(requestedTimeout) && requestedTimeout > 0
          ? requestedTimeout
          : DEFAULT_PROCESS_ALL_TIMEOUT_MS
      const before = await runtime.getSyncState()

      const backfillActors = async () => {
        if (handles.length === 0) return null
        return runtime.upsertActorsByHandle(handles)
      }

      try {
        await runtime.processAll(timeoutMs)
        const after = await runtime.getSyncState()
        const actorBackfill = await backfillActors()
        res.status(200).send({
          ok: true,
          mode: 'subscription',
          timeoutMs,
          before,
          after,
          actorBackfill,
        })
      } catch (error) {
        const processError =
          error instanceof Error ? error.message : String(error)

        try {
          const recovery = await runtime.reindexAllRepos()
          const after = await runtime.getSyncState()
          const actorBackfill = await backfillActors()
          res.status(200).send({
            ok: true,
            mode: 'repo-reindex',
            timeoutMs,
            before,
            after,
            recovery,
            actorBackfill,
            warning: processError,
          })
        } catch (recoveryError) {
          const after = await runtime.getSyncState().catch(() => null)
          res.status(500).send({
            ok: false,
            timeoutMs,
            before,
            after,
            error: processError,
            recoveryError:
              recoveryError instanceof Error
                ? recoveryError.message
                : String(recoveryError),
          })
        }
      }
    })

    app.post('/reindex-repo', async (req, res) => {
      const did = String(req.query.did ?? '').trim()
      if (!did) {
        res.status(400).send({
          ok: false,
          error: 'Missing required did query parameter',
        })
        return
      }

      try {
        const result = await runtime.reindexRepo(did)
        res.status(200).send({
          ok: true,
          result,
        })
      } catch (error) {
        res.status(500).send({
          ok: false,
          did,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    })

    const server = app.listen(port, '127.0.0.1')
    await events.once(server, 'listening')
    return new IntrospectServer(port, server)
  }

  async close() {
    this.server.close()
    await events.once(this.server, 'close')
  }
}

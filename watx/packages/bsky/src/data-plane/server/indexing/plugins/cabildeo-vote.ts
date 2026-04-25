// @ts-nocheck
import { Selectable, sql } from 'kysely'
import { CID } from 'multiformats/cid'
import { AtUri, normalizeDatetimeAlways } from '@atproto/syntax'
import { BackgroundQueue } from '../../background'
import { Database } from '../../db'
import { DatabaseSchema, DatabaseSchemaType } from '../../db/database-schema'
import { RecordProcessor } from '../processor'
import { recomputeCabildeoAggregates } from './recompute-cabildeo-aggregates'

interface VoteRecord {
  subject?: string
  subjectType?: string
  cabildeo?: string
  selectedOption?: number
  signal?: number
  reason?: string
  isDirect: boolean
  delegatedFrom?: string[]
  createdAt: string
}

type CabildeoVote = Selectable<DatabaseSchemaType['cabildeo_vote']>
type ParaPolicyVote = Selectable<DatabaseSchemaType['para_policy_vote']>
type IndexedVote = {
  cabildeoRecord?: CabildeoVote
  policyRecord?: ParaPolicyVote
}

const lexId = 'com.para.civic.vote'

const insertFn = async (
  db: DatabaseSchema,
  uri: AtUri,
  cid: CID,
  obj: VoteRecord,
  timestamp: string,
): Promise<IndexedVote | null> => {
  if (obj.subjectType === 'policy' && obj.subject && typeof obj.signal === 'number') {
    await db
      .deleteFrom('para_policy_vote')
      .where('subject', '=', obj.subject)
      .where('subjectType', '=', obj.subjectType)
      .where('creator', '=', uri.host)
      .where('uri', '!=', uri.toString())
      .execute()

    const inserted = await db
      .insertInto('para_policy_vote')
      .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subject: obj.subject,
        subjectType: obj.subjectType,
        signal: obj.signal,
        isDirect: obj.isDirect ? (1 as const) : (0 as const),
        delegatedFrom: obj.delegatedFrom?.length
          ? sql<string[]>`${JSON.stringify(obj.delegatedFrom)}`
          : null,
        reason: obj.reason ?? null,
        createdAt: normalizeDatetimeAlways(obj.createdAt),
        indexedAt: timestamp,
      })
      .onConflict((oc) => oc.doNothing())
      .returningAll()
      .executeTakeFirst()

    return inserted ? { policyRecord: inserted } : null
  }

  if (!obj.cabildeo) {
    return null
  }

  const record = {
    uri: uri.toString(),
    cid: cid.toString(),
    creator: uri.host,
    cabildeo: obj.cabildeo,
    selectedOption: obj.selectedOption ?? null,
    isDirect: obj.isDirect ? (1 as const) : (0 as const),
    delegatedFrom: obj.delegatedFrom?.length
      ? sql<string[]>`${JSON.stringify(obj.delegatedFrom)}`
      : null,
    createdAt: normalizeDatetimeAlways(obj.createdAt),
    indexedAt: timestamp,
  }

  const inserted = await db
    .insertInto('cabildeo_vote')
    .values(record)
    .onConflict((oc) => oc.doNothing())
    .returningAll()
    .executeTakeFirst()

  if (!inserted) {
    return null
  }

  return { cabildeoRecord: inserted }
}

const findDuplicate = async (): Promise<AtUri | null> => {
  return null
}

const notifsForInsert = () => {
  return []
}

const deleteFn = async (
  db: DatabaseSchema,
  uri: AtUri,
): Promise<IndexedVote | null> => {
  const deletedPolicy = await db
    .deleteFrom('para_policy_vote')
    .where('uri', '=', uri.toString())
    .returningAll()
    .executeTakeFirst()
  if (deletedPolicy) {
    return { policyRecord: deletedPolicy }
  }

  const deletedCabildeo = await db
    .deleteFrom('cabildeo_vote')
    .where('uri', '=', uri.toString())
    .returningAll()
    .executeTakeFirst()

  return deletedCabildeo ? { cabildeoRecord: deletedCabildeo } : null
}

const notifsForDelete = (
  deleted: IndexedVote,
  _replacedBy: IndexedVote | null,
) => {
  const uri = deleted.policyRecord?.uri || deleted.cabildeoRecord?.uri
  return { notifs: [], toDelete: uri ? [uri] : [] }
}

const updateAggregates = async (
  db: DatabaseSchema,
  indexed: IndexedVote,
) => {
  if (indexed.cabildeoRecord) {
    await recomputeCabildeoAggregates(db, indexed.cabildeoRecord.cabildeo)
  }
}

export type PluginType = RecordProcessor<VoteRecord, IndexedVote>

export const makePlugin = (
  db: Database,
  background: BackgroundQueue,
): PluginType => {
  return new RecordProcessor(db, background, {
    lexId,
    insertFn,
    findDuplicate,
    deleteFn,
    notifsForInsert,
    notifsForDelete,
    updateAggregates,
  })
}

export default makePlugin

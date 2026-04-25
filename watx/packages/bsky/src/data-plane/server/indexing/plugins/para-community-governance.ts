// @ts-nocheck
import { CID } from 'multiformats/cid'
import { AtUri } from '@atproto/syntax'
import { BackgroundQueue } from '../../background'
import { Database } from '../../db'
import { DatabaseSchema } from '../../db/database-schema'
import { RecordProcessor } from '../processor'

type GovernanceRecord = Record<string, unknown>

const lexId = 'com.para.community.governance'

const insertFn = async (
  _db: DatabaseSchema,
  _uri: AtUri,
  _cid: CID,
  _obj: GovernanceRecord,
  _timestamp: string,
): Promise<GovernanceRecord> => {
  return _obj
}

const findDuplicate = async (): Promise<AtUri | null> => {
  return null
}

const deleteFn = async (): Promise<GovernanceRecord | null> => {
  return null
}

const notifsForInsert = () => []

const notifsForDelete = () => ({ notifs: [], toDelete: [] })

export type PluginType = RecordProcessor<GovernanceRecord, GovernanceRecord>

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
  })
}

export default makePlugin

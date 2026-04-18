import { CID } from 'multiformats/cid'
import { TID, check, dataToCborBlock } from '@atproto/common'
import {
  RecordSchema,
  type BlobRef as TypedBlobRef,
  isBlobRef as isTypedBlobRef,
} from '@atproto/lex'
import {
  BlobRef as LexiconBlobRef,
  LexValue,
  RepoRecord,
  ValidationError,
  lexToIpld,
  untypedJsonBlobRef,
} from '@atproto/lexicon'
import {
  RecordCreateOp,
  RecordDeleteOp,
  RecordUpdateOp,
  RecordWriteOp,
  WriteOpAction,
  cborToLex,
} from '@atproto/repo'
import {
  AtUri,
  ensureValidDatetime,
  ensureValidRecordKey,
} from '@atproto/syntax'
import { hasExplicitSlur } from '../handle/explicit-slurs'
import * as lex from '../lexicons.js'
import * as AppBskyActorProfile from '../lexicon/types/app/bsky/actor/profile'
import * as AppBskyFeedGenerator from '../lexicon/types/app/bsky/feed/generator'
import * as AppBskyFeedPost from '../lexicon/types/app/bsky/feed/post'
import * as AppBskyGraphList from '../lexicon/types/app/bsky/graph/list'
import * as AppBskyGraphStarterpack from '../lexicon/types/app/bsky/graph/starterpack'
import { isTag } from '../lexicon/types/app/bsky/richtext/facet'
import { asPredicate } from '../lexicon/util'
import {
  InvalidRecordError,
  PreparedBlobRef,
  PreparedCreate,
  PreparedDelete,
  PreparedUpdate,
  PreparedWrite,
  ValidationStatus,
} from './types'

const isValidFeedGenerator = asPredicate(AppBskyFeedGenerator.validateRecord)
const isValidStarterPack = asPredicate(AppBskyGraphStarterpack.validateRecord)
const isValidPost = asPredicate(AppBskyFeedPost.validateRecord)
const isValidList = asPredicate(AppBskyGraphList.validateRecord)
const isValidProfile = asPredicate(AppBskyActorProfile.validateRecord)

const KNOWN_RECORD_SCHEMAS = new Map<string, RecordSchema>(
  [
    lex.app.bsky.actor.profile.main,
    lex.app.bsky.actor.status.main,
    lex.app.bsky.feed.generator.main,
    lex.app.bsky.feed.like.main,
    lex.app.bsky.feed.post.main,
    lex.app.bsky.feed.postgate.main,
    lex.app.bsky.feed.repost.main,
    lex.app.bsky.feed.threadgate.main,
    lex.app.bsky.graph.block.main,
    lex.app.bsky.graph.follow.main,
    lex.app.bsky.graph.list.main,
    lex.app.bsky.graph.listblock.main,
    lex.app.bsky.graph.listitem.main,
    lex.app.bsky.graph.starterpack.main,
    lex.app.bsky.graph.verification.main,
    lex.app.bsky.labeler.service.main,
    lex.app.bsky.notification.declaration.main,
    lex.chat.bsky.actor.declaration.main,
    lex.com.atproto.lexicon.schema.main,
    lex.com.germnetwork.declaration.main,
    lex.com.para.post.main,
    lex.com.para.status.main,
    lex.com.para.social.postMeta.main,
    lex.com.para.civic.position.main,
    lex.com.para.civic.delegation.main,
    lex.com.para.civic.vote.main,
    lex.com.para.civic.cabildeo.main,
    lex.com.para.community.board.main,
    lex.com.para.community.membership.main,
    lex.com.para.community.governance.main,
    lex.com.para.highlight.annotation.main,
  ].map((schema: RecordSchema) => [schema.$type, schema]),
)

export const assertValidRecordWithStatus = (
  record: Record<string, unknown>,
  opts: { requireLexicon: boolean },
): ValidationStatus => {
  if (typeof record.$type !== 'string') {
    throw new InvalidRecordError('No $type provided')
  }

  const schema = KNOWN_RECORD_SCHEMAS.get(record.$type)
  if (!schema) {
    if (opts.requireLexicon) {
      throw new InvalidRecordError(`Unknown lexicon type: ${record.$type}`)
    }
    return 'unknown'
  }

  const result = schema.safeValidate(record, { path: ['record'] })
  if (!result.success) {
    throw new InvalidRecordError(
      `Invalid ${record.$type} record: ${result.reason.message}`,
    )
  }

  assertValidCreatedAt(record)
  return 'valid'
}

const assertValidRecordKeyForSchema = (
  record: Record<string, unknown>,
  rkey: string,
  opts: { requireLexicon: boolean },
) => {
  if (typeof record.$type !== 'string') {
    throw new InvalidRecordError('No $type provided')
  }

  const schema = KNOWN_RECORD_SCHEMAS.get(record.$type)
  if (!schema) {
    if (opts.requireLexicon) {
      throw new InvalidRecordError(`Unknown lexicon type: ${record.$type}`)
    }
    return
  }

  const result = schema.keySchema.safeValidate(rkey)
  if (!result.success) {
    throw new InvalidRecordError(
      `Invalid record key for ${record.$type}: ${result.reason.message}`,
    )
  }
}

// additional more rigorous check on datetimes
// this check will eventually be in the lex sdk, but this will stop the bleed until then
export const assertValidCreatedAt = (record: Record<string, unknown>) => {
  const createdAt = record['createdAt']
  if (typeof createdAt !== 'string') {
    return
  }
  try {
    ensureValidDatetime(createdAt)
  } catch {
    throw new ValidationError(
      'createdAt must be an valid atproto datetime (both RFC-3339 and ISO-8601)',
    )
  }
}

export const setCollectionName = (
  collection: string,
  record: RepoRecord,
  validate: boolean,
) => {
  if (!record.$type) {
    record.$type = collection
  }
  if (validate && record.$type !== collection) {
    throw new InvalidRecordError(
      `Invalid $type: expected ${collection}, got ${record.$type}`,
    )
  }
  return record
}

export const prepareCreate = async (opts: {
  did: string
  collection: string
  rkey?: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedCreate> => {
  const { did, collection, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const sourceRecord = reviveLexValues(
    setCollectionName(collection, opts.record, maybeValidate),
  )
  assertNoLegacyBlobRefs(sourceRecord)
  const record = normalizeRecordBlobs(sourceRecord)
  const requireLexicon = validate === true
  const constrainedRkey = assertCollectionConstraint({
    did,
    collection,
    rkey: opts.rkey,
    record: sourceRecord,
  })
  let validationStatus: ValidationStatus
  if (maybeValidate) {
    validationStatus = assertValidRecordWithStatus(record, {
      requireLexicon,
    })
  }
  const nextRkey = TID.next()
  const rkey = constrainedRkey || opts.rkey || nextRkey.toString()
  ensureValidRecordKey(rkey)
  if (maybeValidate) {
    assertValidRecordKeyForSchema(record, rkey, { requireLexicon })
  }
  assertNoExplicitSlurs(rkey, sourceRecord)
  return {
    action: WriteOpAction.Create,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: blobsForWrite(record, maybeValidate),
    validationStatus,
  }
}

export const prepareUpdate = async (opts: {
  did: string
  collection: string
  rkey: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedUpdate> => {
  const { did, collection, rkey, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const sourceRecord = reviveLexValues(
    setCollectionName(collection, opts.record, maybeValidate),
  )
  assertNoLegacyBlobRefs(sourceRecord)
  const record = normalizeRecordBlobs(sourceRecord)
  const requireLexicon = validate === true
  assertCollectionConstraint({
    did,
    collection,
    rkey,
    record: sourceRecord,
  })
  let validationStatus: ValidationStatus
  if (maybeValidate) {
    validationStatus = assertValidRecordWithStatus(record, {
      requireLexicon,
    })
  }
  ensureValidRecordKey(rkey)
  if (maybeValidate) {
    assertValidRecordKeyForSchema(record, rkey, { requireLexicon })
  }
  assertNoExplicitSlurs(rkey, sourceRecord)
  return {
    action: WriteOpAction.Update,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: blobsForWrite(record, maybeValidate),
    validationStatus,
  }
}

const assertCollectionConstraint = (opts: {
  did: string
  collection: string
  rkey?: string
  record: RepoRecord
}): string | undefined => {
  const { did, collection, rkey, record } = opts
  if (collection === lex.ids.ComParaStatus) {
    if (rkey && rkey !== 'self') {
      throw new InvalidRecordError(
        'Invalid com.para.status record key: must be "self"',
      )
    }
    return 'self'
  }

  if (collection === lex.ids.ComParaSocialPostMeta) {
    return assertParaPostMetaRkey({ did, rkey, record })
  }
}

const assertParaPostMetaRkey = (opts: {
  did: string
  rkey?: string
  record: RepoRecord
}): string => {
  const post = opts.record?.['post']
  if (typeof post !== 'string') {
    throw new InvalidRecordError(
      'Invalid com.para.social.postMeta record: post must be an at-uri',
    )
  }

  let postUri: AtUri
  try {
    postUri = new AtUri(post as AtUri['href'])
  } catch {
    throw new InvalidRecordError(
      'Invalid com.para.social.postMeta record: post must be an at-uri',
    )
  }

  if (postUri.collection !== lex.ids.ComParaPost) {
    throw new InvalidRecordError(
      'Invalid com.para.social.postMeta record: post must reference a com.para.post uri',
    )
  }
  if (postUri.hostname !== opts.did) {
    throw new InvalidRecordError(
      'Invalid com.para.social.postMeta record: post must reference a post in the same repo',
    )
  }

  if (opts.rkey && opts.rkey !== postUri.rkey) {
    throw new InvalidRecordError(
      'Invalid com.para.social.postMeta record key: must use the rkey of its referenced com.para.post',
    )
  }

  return postUri.rkey
}

export const prepareDelete = (opts: {
  did: string
  collection: string
  rkey: string
  swapCid?: CID | null
}): PreparedDelete => {
  const { did, collection, rkey, swapCid } = opts
  return {
    action: WriteOpAction.Delete,
    uri: AtUri.make(did, collection, rkey),
    swapCid,
  }
}

const toWriteRecord = (
  record: RepoRecord,
): RecordCreateOp['record'] | RecordUpdateOp['record'] => {
  // Prepared writes have already been normalized and safely round-tripped
  // through CBOR before we hand them to the stricter repo writer types.
  return record as RecordCreateOp['record']
}

export const createWriteToOp = (write: PreparedCreate): RecordCreateOp => ({
  action: WriteOpAction.Create,
  collection: write.uri.collectionSafe,
  rkey: write.uri.rkeySafe,
  record: toWriteRecord(write.record),
})

export const updateWriteToOp = (write: PreparedUpdate): RecordUpdateOp => ({
  action: WriteOpAction.Update,
  collection: write.uri.collectionSafe,
  rkey: write.uri.rkeySafe,
  record: toWriteRecord(write.record),
})

export const deleteWriteToOp = (write: PreparedDelete): RecordDeleteOp => ({
  action: WriteOpAction.Delete,
  collection: write.uri.collectionSafe,
  rkey: write.uri.rkeySafe,
})

export const writeToOp = (write: PreparedWrite): RecordWriteOp => {
  switch (write.action) {
    case WriteOpAction.Create:
      return createWriteToOp(write)
    case WriteOpAction.Update:
      return updateWriteToOp(write)
    case WriteOpAction.Delete:
      return deleteWriteToOp(write)
    default:
      throw new Error(`Unrecognized action: ${write}`)
  }
}

async function cidForSafeRecord(record: RepoRecord) {
  try {
    const block = await dataToCborBlock(lexToIpld(record))
    cborToLex(block.bytes)
    return block.cid
  } catch (err) {
    // Block does not properly transform between lex and cbor
    const badRecordErr = new InvalidRecordError('Bad record')
    badRecordErr.cause = err
    throw badRecordErr
  }
}

function assertNoExplicitSlurs(rkey: string, record: RepoRecord) {
  const toCheck: string[] = []

  if (isValidProfile(record)) {
    if (record.displayName) toCheck.push(record.displayName)
  } else if (isValidList(record)) {
    toCheck.push(record.name)
  } else if (isValidStarterPack(record)) {
    toCheck.push(record.name)
  } else if (isValidFeedGenerator(record)) {
    toCheck.push(rkey)
    toCheck.push(record.displayName)
  } else if (isValidPost(record)) {
    if (record.tags) {
      toCheck.push(...record.tags)
    }

    for (const facet of record.facets || []) {
      for (const feat of facet.features) {
        if (isTag(feat)) {
          toCheck.push(feat.tag)
        }
      }
    }
  }
  if (hasExplicitSlur(toCheck.join(' '))) {
    throw new InvalidRecordError('Unacceptable slur in record')
  }
}

type FoundBlobRef = {
  ref: LexiconBlobRef | TypedBlobRef
  path: string[]
}

const reviveLexValues = <T extends LexValue>(val: T, layer = 0): T => {
  if (layer > 32) {
    return val
  }
  if (Array.isArray(val)) {
    return val.map((item) => reviveLexValues(item, layer + 1)) as T
  }
  if (val && typeof val === 'object') {
    if (val instanceof LexiconBlobRef || CID.asCID(val) || val instanceof Uint8Array) {
      return val
    }
    if (
      '$link' in val &&
      typeof val.$link === 'string' &&
      Object.keys(val).length === 1
    ) {
      return CID.parse(val.$link) as T
    }
    const blob = LexiconBlobRef.asBlobRef(val)
    if (blob) {
      return blob as T
    }
    const revived: Record<string, LexValue> = {}
    for (const [key, item] of Object.entries(val)) {
      revived[key] = reviveLexValues(item, layer + 1)
    }
    return revived as T
  }
  return val
}

const assertNoLegacyBlobRefs = (
  val: LexValue,
  path: string[] = [],
  layer = 0,
): void => {
  if (layer > 32) {
    return
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      assertNoLegacyBlobRefs(item, path, layer + 1)
    }
    return
  }
  if (val && typeof val === 'object') {
    if (val instanceof LexiconBlobRef) {
      if (check.is(val.original, untypedJsonBlobRef)) {
        throw new InvalidRecordError(`Legacy blob ref at '${path.join('/')}'`)
      }
      return
    }
    if (check.is(val, untypedJsonBlobRef)) {
      throw new InvalidRecordError(`Legacy blob ref at '${path.join('/')}'`)
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return
    }
    for (const [key, item] of Object.entries(val)) {
      assertNoLegacyBlobRefs(item, [...path, key], layer + 1)
    }
  }
}

const normalizeRecordBlobs = <T extends LexValue>(val: T, layer = 0): T => {
  if (layer > 32) {
    return val
  }
  if (Array.isArray(val)) {
    return val.map((item) => normalizeRecordBlobs(item, layer + 1)) as T
  }
  if (val && typeof val === 'object') {
    if (val instanceof LexiconBlobRef) {
      return {
        $type: 'blob',
        ref: val.ref,
        mimeType: val.mimeType,
        size: val.size,
      } as T
    }
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return val
    }
    const normalized: Record<string, LexValue> = {}
    for (const [key, item] of Object.entries(val)) {
      normalized[key] = normalizeRecordBlobs(item, layer + 1)
    }
    return normalized as T
  }
  return val
}

export const blobsForWrite = (
  record: RepoRecord,
  validate: boolean,
): PreparedBlobRef[] => {
  const refs = findBlobRefs(record)
  const recordType =
    typeof record['$type'] === 'string' ? record['$type'] : undefined

  for (const ref of refs) {
    if (
      ref.ref instanceof LexiconBlobRef &&
      check.is(ref.ref.original, untypedJsonBlobRef)
    ) {
      throw new InvalidRecordError(`Legacy blob ref at '${ref.path.join('/')}'`)
    }
  }

  return refs.map(({ ref, path }) => ({
    size: ref.size,
    cid: ref.ref,
    mimeType: ref.mimeType,
    constraints:
      validate && recordType
        ? CONSTRAINTS[recordType]?.[path.join('/')] ?? {}
        : {},
  }))
}

export const findBlobRefs = (
  val: LexValue,
  path: string[] = [],
  layer = 0,
): FoundBlobRef[] => {
  if (layer > 32) {
    return []
  }
  // walk arrays
  if (Array.isArray(val)) {
    return val.flatMap((item) => findBlobRefs(item, path, layer + 1))
  }
  // objects
  if (val && typeof val === 'object') {
    // convert blobs, leaving the original encoding so that we don't change CIDs on re-encode
    if (val instanceof LexiconBlobRef || isTypedBlobRef(val, { strict: false })) {
      return [
        {
          ref: val,
          path,
        },
      ]
    }
    // retain cids & bytes
    if (CID.asCID(val) || val instanceof Uint8Array) {
      return []
    }
    return Object.entries(val).flatMap(([key, item]) =>
      findBlobRefs(item, [...path, key], layer + 1),
    )
  }
  // pass through
  return []
}

const CONSTRAINTS = {
  [lex.ids.AppBskyActorProfile]: {
    avatar:
      lex.schemaDict.AppBskyActorProfile.defs.main.record.properties.avatar,
    banner:
      lex.schemaDict.AppBskyActorProfile.defs.main.record.properties.banner,
  },
  [lex.ids.AppBskyFeedGenerator]: {
    avatar:
      lex.schemaDict.AppBskyFeedGenerator.defs.main.record.properties.avatar,
  },
  [lex.ids.AppBskyGraphList]: {
    avatar: lex.schemaDict.AppBskyGraphList.defs.main.record.properties.avatar,
  },
  [lex.ids.AppBskyFeedPost]: {
    'embed/images/image':
      lex.schemaDict.AppBskyEmbedImages.defs.image.properties.image,
    'embed/external/thumb':
      lex.schemaDict.AppBskyEmbedExternal.defs.external.properties.thumb,
    'embed/media/images/image':
      lex.schemaDict.AppBskyEmbedImages.defs.image.properties.image,
    'embed/media/external/thumb':
      lex.schemaDict.AppBskyEmbedExternal.defs.external.properties.thumb,
  },
}

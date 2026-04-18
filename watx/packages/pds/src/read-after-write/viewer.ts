import { AtUri, AtUriString, INVALID_HANDLE } from '@atproto/syntax'
import { createServiceAuthHeaders } from '@atproto/xrpc-server'
import { AccountManager } from '../account-manager/account-manager'
import { ActorStoreReader } from '../actor-store/actor-store-reader'
import { BskyAppView } from '../bsky-app-view'
import { ImageUrlBuilder } from '../image/image-url-builder'
import { ids } from '../lexicons.js'
import { app } from '../lexicons/index.js'
import {
  ProfileView,
  ProfileViewBasic,
  ProfileViewDetailed,
} from '../lexicon/types/app/bsky/actor/defs'
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile'
import {
  Main as EmbedExternal,
  View as EmbedExternalView,
  isMain as isEmbedExternal,
} from '../lexicon/types/app/bsky/embed/external'
import {
  Main as EmbedImages,
  View as EmbedImagesView,
  isMain as isEmbedImages,
} from '../lexicon/types/app/bsky/embed/images'
import {
  Main as EmbedRecord,
  View as EmbedRecordView,
  ViewRecord,
  isMain as isEmbedRecord,
} from '../lexicon/types/app/bsky/embed/record'
import {
  Main as EmbedRecordWithMedia,
  isMain as isEmbedRecordWithMedia,
} from '../lexicon/types/app/bsky/embed/recordWithMedia'
import {
  FeedViewPost,
  GeneratorView,
  PostView,
} from '../lexicon/types/app/bsky/feed/defs'
import { Record as PostRecord } from '../lexicon/types/app/bsky/feed/post'
import { ListView } from '../lexicon/types/app/bsky/graph/defs'
import { $Typed } from '../lexicon/util'
import { LocalRecords, RecordDescript } from './types'

type CommonSignedUris = 'avatar' | 'banner' | 'feed_thumbnail' | 'feed_fullsize'
type BlobRefLike = { ref?: { toString(): string }; cid?: string }

export type LocalViewerCreator = (
  actorStoreReader: ActorStoreReader,
) => LocalViewer

export class LocalViewer {
  constructor(
    public readonly actorStoreReader: ActorStoreReader,
    public readonly accountManager: AccountManager,
    public readonly imageUrlBuilder: ImageUrlBuilder,
    public readonly bskyAppView?: BskyAppView,
  ) {}

  get did() {
    return this.actorStoreReader.did
  }

  static creator(
    accountManager: AccountManager,
    imageUrlBuilder: ImageUrlBuilder,
    bskyAppView?: BskyAppView,
  ): LocalViewerCreator {
    return (actorStore) =>
      new LocalViewer(actorStore, accountManager, imageUrlBuilder, bskyAppView)
  }

  getImageUrl(pattern: CommonSignedUris, cid: string) {
    return this.imageUrlBuilder.build(pattern, this.did, cid)
  }

  async serviceAuthHeaders(did: string, lxm: string) {
    if (!this.bskyAppView) {
      throw new Error('Could not find bsky appview did')
    }
    const keypair = await this.actorStoreReader.keypair()

    return createServiceAuthHeaders({
      iss: did,
      aud: this.bskyAppView.did,
      lxm,
      keypair,
    })
  }

  async getRecordsSinceRev(rev: string): Promise<LocalRecords> {
    return this.actorStoreReader.record.getRecordsSinceRev(rev)
  }

  async getProfileBasic(): Promise<ProfileViewBasic | null> {
    const [profileRes, accountRes] = await Promise.all([
      this.actorStoreReader.record.getProfileRecord(),
      this.accountManager.getAccount(this.did),
    ])

    if (!accountRes) return null

    return {
      did: this.did,
      handle: accountRes.handle ?? INVALID_HANDLE,
      displayName: profileRes?.displayName,
      avatar: profileRes?.avatar
        ? this.getImageUrl('avatar', blobCidString(profileRes.avatar))
        : undefined,
    }
  }

  async formatAndInsertPostsInFeed(
    feed: FeedViewPost[],
    posts: RecordDescript<PostRecord>[],
  ): Promise<FeedViewPost[]> {
    if (posts.length === 0) {
      return feed
    }
    const lastTime = feed.at(-1)?.post.indexedAt ?? new Date(0).toISOString()
    const inFeed = posts.filter((p) => p.indexedAt > lastTime)
    const newestToOldest = inFeed.reverse()
    const maybeFormatted = await Promise.all(
      newestToOldest.map((p) => this.getPost(p)),
    )
    const formatted = maybeFormatted.filter((p) => p !== null) as PostView[]
    for (const post of formatted) {
      const idx = feed.findIndex((fi) => fi.post.indexedAt < post.indexedAt)
      if (idx >= 0) {
        feed.splice(idx, 0, { post })
      } else {
        feed.push({ post })
      }
    }
    return feed
  }

  async getPost(
    descript: RecordDescript<PostRecord>,
  ): Promise<PostView | null> {
    const { uri, cid, indexedAt, record } = descript
    const author = await this.getProfileBasic()
    if (!author) return null
    const embed = record.embed
      ? await this.formatPostEmbed(author.did, record)
      : undefined
    return {
      uri: uri.toString(),
      cid: cid.toString(),
      likeCount: 0, // counts presumed to be 0 directly after post creation
      replyCount: 0,
      repostCount: 0,
      quoteCount: 0,
      author,
      record,
      embed: embed ?? undefined,
      indexedAt,
    }
  }

  async formatPostEmbed(did: string, post: PostRecord) {
    const embed = post.embed
    if (!embed) return null
    if (isEmbedImages(embed) || isEmbedExternal(embed)) {
      return this.formatSimpleEmbed(embed)
    } else if (isEmbedRecord(embed)) {
      return this.formatRecordEmbed(embed)
    } else if (isEmbedRecordWithMedia(embed)) {
      return this.formatRecordWithMediaEmbed(did, embed)
    } else {
      return null
    }
  }

  async formatSimpleEmbed(
    embed: $Typed<EmbedImages> | $Typed<EmbedExternal>,
  ): Promise<$Typed<EmbedImagesView> | $Typed<EmbedExternalView>> {
    if (isEmbedImages(embed)) {
      const images = embed.images.map((img) => ({
        thumb: this.getImageUrl('feed_thumbnail', blobCidString(img.image)),
        fullsize: this.getImageUrl('feed_fullsize', blobCidString(img.image)),
        aspectRatio: img.aspectRatio,
        alt: img.alt,
      }))
      return {
        $type: 'app.bsky.embed.images#view',
        images,
      }
    } else if (isEmbedExternal(embed)) {
      const { uri, title, description, thumb } = embed.external
      return {
        $type: 'app.bsky.embed.external#view',
        external: {
          uri,
          title,
          description,
          thumb: thumb
            ? this.getImageUrl('feed_thumbnail', blobCidString(thumb))
            : undefined,
        },
      }
    } else {
      // @ts-expect-error
      throw new TypeError(`Unexpected embed type: ${embed.$type}`)
    }
  }

  async formatRecordEmbed(
    embed: EmbedRecord,
  ): Promise<$Typed<EmbedRecordView>> {
    const view = await this.formatRecordEmbedInternal(embed)
    return {
      $type: 'app.bsky.embed.record#view',
      record:
        view === null
          ? {
              $type: 'app.bsky.embed.record#viewNotFound',
              uri: embed.record.uri,
            }
          : view,
    }
  }

  private async formatRecordEmbedInternal(
    embed: EmbedRecord,
  ): Promise<
    null | $Typed<ViewRecord> | $Typed<GeneratorView> | $Typed<ListView>
  > {
    if (!this.bskyAppView) {
      return null
    }
    const collection = new AtUri(embed.record.uri).collection
    if (collection === ids.AppBskyFeedPost) {
      const posts = await this.bskyAppView.client.call(
        app.bsky.feed.getPosts.main,
        { uris: [embed.record.uri as AtUriString] },
        {
          ...(await this.serviceAuthHeaders(this.did, ids.AppBskyFeedGetPosts)),
          validateResponse: this.bskyAppView.validateResponse,
        },
      )
      const post = posts.posts[0]
      if (!post) return null
      return {
        $type: 'app.bsky.embed.record#viewRecord',
        uri: post.uri,
        cid: post.cid,
        author: post.author,
        value: post.record,
        labels: post.labels,
        embeds: post.embed ? [post.embed] : undefined,
        indexedAt: post.indexedAt,
      }
    } else if (collection === ids.AppBskyFeedGenerator) {
      const feedGenerator = await this.bskyAppView.client.call(
        app.bsky.feed.getFeedGenerator.main,
        { feed: embed.record.uri as AtUriString },
        {
          ...(await this.serviceAuthHeaders(
            this.did,
            ids.AppBskyFeedGetFeedGenerator,
          )),
          validateResponse: this.bskyAppView.validateResponse,
        },
      )
      return {
        $type: 'app.bsky.feed.defs#generatorView',
        ...feedGenerator.view,
      }
    } else if (collection === ids.AppBskyGraphList) {
      const list = await this.bskyAppView.client.call(
        app.bsky.graph.getList.main,
        { list: embed.record.uri as AtUriString },
        {
          ...(await this.serviceAuthHeaders(this.did, ids.AppBskyGraphGetList)),
          validateResponse: this.bskyAppView.validateResponse,
        },
      )
      return {
        $type: 'app.bsky.graph.defs#listView',
        ...list.list,
      }
    }
    return null
  }

  async formatRecordWithMediaEmbed(did: string, embed: EmbedRecordWithMedia) {
    if (!isEmbedImages(embed.media) && !isEmbedExternal(embed.media)) {
      return null
    }
    const media = this.formatSimpleEmbed(embed.media)
    const record = await this.formatRecordEmbed(embed.record)
    return {
      $type: 'app.bsky.embed.recordWithMedia#view',
      record,
      media,
    }
  }

  updateProfileViewBasic<
    T extends ProfileViewDetailed | ProfileViewBasic | ProfileView,
  >(view: T, record: ProfileRecord): T {
    return {
      ...view,
      displayName: record.displayName,
      avatar: record.avatar
        ? this.getImageUrl('avatar', blobCidString(record.avatar))
        : undefined,
    }
  }

  updateProfileView<
    T extends ProfileViewDetailed | ProfileViewBasic | ProfileView,
  >(view: T, record: ProfileRecord): T {
    return {
      ...this.updateProfileViewBasic(view, record),
      description: record.description,
    }
  }

  updateProfileDetailed<T extends ProfileViewDetailed>(
    view: T,
    record: ProfileRecord,
  ): T {
    return {
      ...this.updateProfileView(view, record),
      banner: record.banner
        ? this.getImageUrl('banner', blobCidString(record.banner))
        : undefined,
    }
  }
}

const blobCidString = (blob: BlobRefLike): string => {
  const ref = blob.ref?.toString()
  if (ref) return ref
  if (typeof blob.cid === 'string') return blob.cid
  throw new TypeError('Invalid blob ref')
}

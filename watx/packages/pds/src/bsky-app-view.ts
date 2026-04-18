import { format } from 'node:util'
import { AtpAgent } from '@atproto/api'
import { Client } from '@atproto/lex'

export type AppViewOptions = {
  url: string
  did: string
  cdnUrlPattern?: string
  validateResponse?: boolean
}

export class BskyAppView {
  public did: string
  public url: string
  public agent: AtpAgent
  public client: Client
  public validateResponse: boolean
  private cdnUrlPattern?: string

  constructor(options: AppViewOptions) {
    this.did = options.did
    this.url = options.url
    this.validateResponse = options.validateResponse ?? false
    this.agent = new AtpAgent({ service: options.url })
    this.agent.validateResponse = this.validateResponse
    this.client = new Client(
      { service: options.url },
      {
        strictResponseProcessing: false,
        validateResponse: this.validateResponse,
      },
    )
    this.cdnUrlPattern = options.cdnUrlPattern
  }

  getImageUrl(pattern: string, did: string, cid: string): string | undefined {
    if (this.cdnUrlPattern) return format(this.cdnUrlPattern, pattern, did, cid)
  }
}

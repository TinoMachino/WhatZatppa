import { AppContext } from '../../../context'
import { Server } from '../../../lexicon'
import actor from './actor'
import community from './community'
import feed from './feed'
import social from './social'

export default function (server: Server, ctx: AppContext) {
  actor(server, ctx)
  community(server, ctx)
  feed(server, ctx)
  social(server, ctx)
}

import {type ChatBskyGroupCreateGroup} from '@atproto/api'
import {useMutation, useQueryClient} from '@tanstack/react-query'

import {getDmServiceHeadersForServiceUrl} from '#/lib/constants'
import {logger} from '#/logger'
import {useAgent} from '#/state/session'
import {precacheConvoQuery} from './conversation'
import {RQKEY_ROOT as LIST_CONVOS_KEY} from './list-conversations'

export function useCreateGroupChat({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ChatBskyGroupCreateGroup.OutputSchema) => void
  onError?: (error: Error) => void
}) {
  const queryClient = useQueryClient()
  const agent = useAgent()
  const dmServiceHeaders = getDmServiceHeadersForServiceUrl(
    agent.serviceUrl.toString(),
  )

  return useMutation({
    mutationFn: async ({
      members,
      name,
    }: {
      members: string[]
      name: string
    }) => {
      const {data} = await agent.chat.bsky.group.createGroup(
        {members, name},
        {
          encoding: 'application/json',
          headers: dmServiceHeaders,
        },
      )

      return data
    },
    onSuccess: data => {
      precacheConvoQuery(queryClient, data.convo)
      void queryClient.invalidateQueries({queryKey: [LIST_CONVOS_KEY]})
      onSuccess?.(data)
    },
    onError: error => {
      logger.error(error)
      onError?.(error)
    },
  })
}

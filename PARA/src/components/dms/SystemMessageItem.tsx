import {memo, type ReactNode, useMemo} from 'react'
import {View} from 'react-native'
import {ChatBskyConvoDefs} from '@atproto/api'
import {type I18n} from '@lingui/core'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'

import {sanitizeDisplayName} from '#/lib/strings/display-names'
import {type ConvoItem} from '#/state/messages/convo/types'
import {atoms as a, useTheme} from '#/alf'
import {Text} from '#/components/Typography'
import {DateDivider} from './DateDivider'
import {localDateString} from './util'

type SystemConvoItem = Extract<ConvoItem, {type: 'system-message'}>

function displayName(
  profile:
    | {displayName?: string; handle: string}
    | {displayName?: string; handle?: string},
) {
  return sanitizeDisplayName(profile.displayName || profile.handle || 'Someone')
}

function getSystemMessageText(
  message: SystemConvoItem['message'],
  _: I18n['_'],
) {
  const data = message.data

  if (ChatBskyConvoDefs.isSystemMessageDataAddMember(data)) {
    return _(
      msg`${displayName(data.member)} was added by ${displayName(data.addedBy)}`,
    )
  }
  if (ChatBskyConvoDefs.isSystemMessageDataRemoveMember(data)) {
    return _(
      msg`${displayName(data.member)} was removed by ${displayName(
        data.removedBy,
      )}`,
    )
  }
  if (ChatBskyConvoDefs.isSystemMessageDataMemberJoin(data)) {
    return _(msg`${displayName(data.member)} joined the group`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataMemberLeave(data)) {
    return _(msg`${displayName(data.member)} left the group`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataLockConvo(data)) {
    return _(msg`${displayName(data.lockedBy)} locked the group`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataUnlockConvo(data)) {
    return _(msg`${displayName(data.unlockedBy)} unlocked the group`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataLockConvoPermanently(data)) {
    return _(msg`${displayName(data.lockedBy)} permanently locked the group`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataEditGroup(data)) {
    return data.newName
      ? _(msg`Group name changed to ${data.newName}`)
      : _(msg`Group details were updated`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataCreateJoinLink(data)) {
    return _(msg`A group join link was created`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataEditJoinLink(data)) {
    return _(msg`The group join link was updated`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataEnableJoinLink(data)) {
    return _(msg`The group join link was enabled`)
  }
  if (ChatBskyConvoDefs.isSystemMessageDataDisableJoinLink(data)) {
    return _(msg`The group join link was disabled`)
  }

  return _(msg`Group updated`)
}

let SystemMessageItem = ({
  item,
}: {
  item: SystemConvoItem
}): ReactNode => {
  const t = useTheme()
  const {_} = useLingui()

  const isNewDay = useMemo(() => {
    if (!item.prevMessage) return true

    return (
      localDateString(new Date(item.prevMessage.sentAt)) !==
      localDateString(new Date(item.message.sentAt))
    )
  }, [item.message.sentAt, item.prevMessage])

  return (
    <>
      {isNewDay && <DateDivider date={item.message.sentAt} />}
      <View style={[a.align_center, a.px_lg, a.py_sm]}>
        <View
          style={[
            a.rounded_full,
            a.px_md,
            a.py_sm,
            t.atoms.bg_contrast_25,
          ]}>
          <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
            {getSystemMessageText(item.message, _)}
          </Text>
        </View>
      </View>
    </>
  )
}

SystemMessageItem = memo(SystemMessageItem)
export {SystemMessageItem}

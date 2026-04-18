import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {Trans} from '@lingui/react/macro'

import {useProfileQuery} from '#/state/queries/profile'
import {useSession} from '#/state/session'
import {useWizardState} from '#/screens/StarterPack/Wizard/State'
import {atoms as a, useTheme} from '#/alf'
import * as TextField from '#/components/forms/TextField'
import {StarterPack} from '#/components/icons/StarterPack'
import {ScreenTransition} from '#/components/ScreenTransition'
import {Text} from '#/components/Typography'

export function StepDetails() {
  const {_} = useLingui()
  const t = useTheme()
  const [state, dispatch] = useWizardState()

  const {currentAccount} = useSession()
  const {data: currentProfile} = useProfileQuery({
    did: currentAccount?.did,
    staleTime: Infinity,
  })

  const name = currentProfile?.displayName || currentProfile?.handle

  return (
    <ScreenTransition direction={state.transitionDirection} enabledWeb>
      <View style={[a.px_xl, a.gap_xl, a.mt_4xl]}>
        <View style={[a.gap_md, a.align_center, a.px_md, a.mb_md]}>
          <StarterPack width={90} gradient="sky" />
          <Text style={[a.font_semi_bold, a.text_3xl]}>
            {state.isCommunitySeed ? (
              <Trans>Seed a Community</Trans>
            ) : (
              <Trans>Invites, but personal</Trans>
            )}
          </Text>
          <Text style={[a.text_center, a.text_md, a.px_md]}>
            {state.isCommunitySeed ? (
              <Trans>
                Launch a new space! It remains in <Text style={[{color: t.palette.primary_500}, a.font_bold]}>Draft Phase</Text> until 9 people join your starter pack.
              </Trans>
            ) : (
              <Trans>
                Invite your friends to follow your favorite feeds and people
              </Trans>
            )}
          </Text>
        </View>
        <View>
          <TextField.LabelText>
            {state.isCommunitySeed ? (
              <Trans>Name your community</Trans>
            ) : (
              <Trans>What do you want to call your starter pack?</Trans>
            )}
          </TextField.LabelText>
          <TextField.Root>
            <TextField.Input
              label={
                state.isCommunitySeed
                  ? _(msg`p/MyCommunity`)
                  : name ? _(msg`${name}'s starter pack`) : _(msg`My starter pack`)
              }
              value={state.name}
              onChangeText={text => dispatch({type: 'SetName', name: text})}
            />
            <TextField.SuffixText
              label={_(
                msg({
                  comment:
                    'Accessibility label describing how many characters the user has entered out of a 50-character limit in a text input field',
                  message: `${state.name?.length} out of 50`,
                }),
              )}>
              <Text style={[t.atoms.text_contrast_medium]}>
                {state.name?.length ?? 0}/50
              </Text>
            </TextField.SuffixText>
          </TextField.Root>
        </View>
        <View>
          <TextField.LabelText>
            {state.isCommunitySeed ? (
              <Trans>Describe what this community is about</Trans>
            ) : (
              <Trans>Tell us a little more</Trans>
            )}
          </TextField.LabelText>
          <TextField.Root>
            <TextField.Input
              label={
                state.isCommunitySeed
                  ? _(msg`A civic space for discussing local policy and governance...`)
                  : name
                    ? _(msg`${name}'s favorite feeds and people - join me!`)
                    : _(msg`My favorite feeds and people - join me!`)
              }
              value={state.description}
              onChangeText={text =>
                dispatch({type: 'SetDescription', description: text})
              }
              multiline
              style={{minHeight: 150}}
            />
          </TextField.Root>
        </View>

        {/* Aforo Progress Indicator */}
        {state.isCommunitySeed && (
          <View style={[
            a.p_lg,
            a.rounded_md,
            {backgroundColor: t.palette.primary_500 + '10', borderWidth: 1, borderColor: t.palette.primary_500 + '30'},
          ]}>
            <View style={[a.flex_row, a.align_center, a.gap_sm, a.mb_xs]}>
              <Text style={{fontSize: 20}}>🏛️</Text>
              <Text style={[a.font_bold, a.text_md, {color: t.palette.primary_500}]}>
                <Trans>Aforo Requirement</Trans>
              </Text>
            </View>
            <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
              <Trans>This starter pack needs at least 9 founding members to activate the community. Share this pack to gather your quorum!</Trans>
            </Text>
          </View>
        )}
      </View>
    </ScreenTransition>
  )
}

import React from 'react'
import { Linking, Alert, Clipboard } from 'react-native'
import pkg from '../../package.json'
import ListRow from './ListRow'
import ListSection from './ListSection'

const EMAIL_ADDRESS = 'nic@nicinabox.com'

const handleEmailContact = () => {
  return Linking.openURL(`mailto:nic@nicinabox.com?subject=Windchill (${pkg.version})`)
  .catch(() => {
    Alert.alert(
      'Error opening your email app. Copy email address instead?',
      '',
      [
        {
          text: 'Close',
          style: 'cancel',
        },
        {
          text: 'Copy email',
          onPress: () => Clipboard.setString(EMAIL_ADDRESS)
        },
      ],
    )
  })
}

export default function ContactSettings() {
  return (
    <ListSection header="CONTACT">
      <ListRow
        primaryText={EMAIL_ADDRESS}
        onPress={handleEmailContact}
        button={true}
      />
    </ListSection>
  )
}

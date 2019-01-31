import React from 'react'
import { Linking } from 'react-native'
import pkg from '../../package.json'
import ListRow from './ListRow'
import ListSection from './ListSection'

const handleEmailContact = () => {
  Linking.openURL(`mailto:nic@nicinabox.com?subject=Windchill (${pkg.version})`)
}

export default function ContactSettings() {
  return (
    <ListSection header="CONTACT">
      <ListRow
        primaryText="nic@nicinabox.com"
        onPress={handleEmailContact}
        button={true}
      />
    </ListSection>
  )
}

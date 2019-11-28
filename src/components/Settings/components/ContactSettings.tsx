import React from 'react'
import { Alert, Clipboard, Linking } from 'react-native'
import ListRow from 'src/components/common/ListRow'
import ListSection from 'src/components/common/ListSection'
import appInfo from 'src/utils/appInfo'

const EMAIL_ADDRESS = 'nic+windchill@nicinabox.com'

const handleEmailContact = async () => {
  try {
    return Linking.openURL(`mailto:${EMAIL_ADDRESS}?subject=Windchill (${appInfo.version})`)
  }
  catch (e) {
    Alert.alert('Error opening your email app. Copy email address instead?', '', [
      {
        text: 'Close',
        style: 'cancel',
      },
      {
        text: 'Copy email',
        onPress: () => Clipboard.setString(EMAIL_ADDRESS)
      },
    ])
  }
}

export default function ContactSettings() {
  return (
    <ListSection header="CONTACT">
      <ListRow
        primaryText={EMAIL_ADDRESS}
        detailText="Features, bugs, or just say Hi 🤓"
        onPress={handleEmailContact}
        button={true}
      />
    </ListSection>
  )
}

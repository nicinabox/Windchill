import React, { useState } from 'react'
import { PixelRatio, Share, StyleSheet, Text, TextInput, View } from 'react-native'
import Button from 'src/components/common/Button'
import { SettingsState } from 'src/reducers/settingsReducer'
import Promo from './Promo'

interface ShareSettingsProps {
  settings: SettingsState
  validateAdCode: (adFreeCode: string) => void
}

export const ShareSettings: React.FC<ShareSettingsProps> = ({ settings, validateAdCode }) => {
  const [adFreeCode, setAdFreeCode] = useState('')

  if (!settings.shouldShowAds) {
      return null
  }

  function handleSubmitAdFreeCode() {
    validateAdCode(adFreeCode)
  }

  function handleShare() {
    Share.share({
      message: 'Windchill - What-if temperature at a glance',
      url: 'https://apps.apple.com/us/app/windchill-easy-windchill-calculator/id1175553238'
    })
  }

  return (
    <Promo
      heading="Share Windchill and get a year ad-free"
      headerAccessory={
        <Button onPress={handleShare} style={styles.shareButton} textStyle={styles.shareButtonText}>
          Share
        </Button>
      }
    >
      <Text style={styles.textSecondary}>
        Contact me above with a screenshot of your post to receive a code.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        placeholderTextColor="#aaa"
        value={adFreeCode}
        onChangeText={setAdFreeCode}
        onSubmitEditing={handleSubmitAdFreeCode}
        autoCorrect={false}
        autoCapitalize="characters"
        returnKeyType="go"
      />
    </Promo>
  )
}

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#111',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2
  },
  shareButtonText: {
    fontWeight: '700',
  },
  textSecondary: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 18,
  },
  input: {
    fontSize: 19,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 4 * PixelRatio.get(),
    paddingHorizontal: 15,
  },
})

export default ShareSettings

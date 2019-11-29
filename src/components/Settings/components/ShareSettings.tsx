import React, { useState } from 'react'
import { PixelRatio, Share, StyleSheet, Text, TextInput, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Button from 'src/components/common/Button'
import { SettingsState } from 'src/reducers/settingsReducer'
import * as colors from 'src/styles/colors'

const { gradient } = colors

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
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textPrimary}>
          Share Windchill and get a year ad-free
        </Text>

        <Button onPress={handleShare} style={styles.shareButton} textStyle={styles.shareButtonText}>
          Share
        </Button>
      </View>

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
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 6 * PixelRatio.get(),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
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
  textPrimary: {
    flex: 1,
    marginRight: 20,
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
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

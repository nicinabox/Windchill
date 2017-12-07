import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { AdMobBanner, PublisherBanner } from 'react-native-admob'
import errorReporter from '../utils/errorReporter'

export default function BannerAd ({shouldShowAds, onSettingsPress}) {
  if (!shouldShowAds) return false

  return (
    <View>
      <TouchableOpacity onPress={onSettingsPress}>
        <Text style={styles.removeAdsText}>
          REMOVE ADS
        </Text>
      </TouchableOpacity>

      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID="ca-app-pub-2980728243430969/5287940733"
        testDevices={[PublisherBanner.simulatorId]}
        onAdFailedToLoad={errorReporter.notify}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  removeAdsText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    padding: 6
  },
})

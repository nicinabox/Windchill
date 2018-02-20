import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AdMobBanner, PublisherBanner } from 'react-native-admob'
import errorReporter from '../utils/errorReporter'

export default function AdBanner ({shouldShowAds}) {
  if (!shouldShowAds) return false

  return (
    <View style={styles.container}>
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
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  removeAdsText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    padding: 6
  },
})

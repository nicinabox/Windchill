import React, { Component, useState, useEffect } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as StoreReview from 'react-native-store-review'
import Settings from './Settings'
import Header from './Header'
import AdBanner from './AdBanner'
import Windchill from './Windchill'
import { checkAdCodeExpiration } from '../actions/productActions'
import { trackAppOpened } from '../actions/analyticsActions'
import { SettingsState } from 'src/reducers/settingsReducer'
import { AnalyticsState } from 'src/reducers/analyticsReducer'

var {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
  Modal,
  ImageBackground,
  SafeAreaView,
} = ReactNative

const backgroundGradient = require('../images/background-gradient.png')

interface AppProps {
  checkAdCodeExpiration: () => void
  trackAppOpened: () => void
  state: {
    analytics: AnalyticsState
    settings: SettingsState
  }
}

export const App: React.FC<AppProps> = ({ state, checkAdCodeExpiration, trackAppOpened }) => {
  const [settingsVisible, setSettingsVisible] = useState(false)

  useEffect(() => {
    checkAdCodeExpiration()
    trackAppOpened()
  }, [])

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      NativeAppEventEmitter.removeAllListeners()
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  function handleAppStateChange(nextAppState: string) {
    if (nextAppState === 'active') {
      checkAdCodeExpiration()
      trackAppOpened()
    }
  }

  function shouldRequestReview() {
    return state.analytics.opens >= 5
  }

  function requestReview() {
    if (StoreReview.isAvailable && shouldRequestReview()) {
      StoreReview.requestReview()
    }
  }

  function toggleModal() {
    setSettingsVisible(!settingsVisible)
  }

  const { shouldShowAds } = state.settings

  return (
    <ImageBackground source={backgroundGradient} style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={settingsVisible ? 'default' : 'light-content'}
        />

        <Modal
          visible={settingsVisible}
          onRequestClose={toggleModal}
          animationType="slide">
          <Settings handleClose={toggleModal} />
        </Modal>

        <Header onSettingsPress={toggleModal} />

        <Windchill onChange={requestReview} />

        <AdBanner shouldShowAds={shouldShowAds} />
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
})

export default connect((state) => ({state}), {
  checkAdCodeExpiration,
  trackAppOpened,
})(App)

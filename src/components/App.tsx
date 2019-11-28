import React, { useEffect, useState } from 'react'
import ReactNative from 'react-native'
import * as StoreReview from 'react-native-store-review'
import { connect } from 'react-redux'
import { trackAppOpened } from 'src/actions/analyticsActions'
import { checkAdCodeExpiration } from 'src/actions/productActions'
import AdBanner from 'src/components/common/AdBanner'
import { AnalyticsState } from 'src/reducers/analyticsReducer'
import { SettingsState } from 'src/reducers/settingsReducer'
import Header from './Header'
import Settings from './Settings'
import Windchill from './Windchill'
import LinearGradient from 'react-native-linear-gradient'
import { gradient } from 'src/styles/colors'

var {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
  Modal,
  SafeAreaView,
} = ReactNative

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
    requestReview()
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
    <LinearGradient colors={gradient.colors} start={gradient.start} end={gradient.end} style={styles.gradient}>
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

        <Windchill units={state.settings.units} />

        <AdBanner shouldShowAds={shouldShowAds} />
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  gradient: {
    flex: 1,
  },
})

export default connect((state) => ({state}), {
  checkAdCodeExpiration,
  trackAppOpened,
})(App)

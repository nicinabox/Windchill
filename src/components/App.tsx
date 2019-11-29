import React, { useEffect, useRef } from 'react'
import ReactNative, { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modalize from 'react-native-modalize'
import { connect } from 'react-redux'
import { trackAppOpened } from 'src/actions/analyticsActions'
import { checkAdCodeExpiration } from 'src/actions/productActions'
import AdBanner from 'src/components/common/AdBanner'
import { AnalyticsState } from 'src/reducers/analyticsReducer'
import { SettingsState } from 'src/reducers/settingsReducer'
import { backgroundColor, gradient } from 'src/styles/colors'
import Header from './Header'
import Settings from './Settings'
import Windchill from './Windchill'

const {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
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
  const modalRef = useRef<Modalize>(null)

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

  function openModal() {
    const modal = modalRef.current
    if (modal) {
      modal.open()
    }
  }

  const { shouldShowAds } = state.settings

  return (
    <LinearGradient colors={gradient.colors} start={gradient.start} end={gradient.end} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Modalize
          ref={modalRef}
          snapPoint={600}
          HeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>Settings</Text>
            </View>
          }>
          <Settings />
        </Modalize>

        <Header onSettingsPress={openModal} />

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor,
  },
  headerText: {
    fontSize: 34,
    fontWeight: '700',
    marginHorizontal: 20,
    paddingVertical: 20,
  }
})

export default connect((state) => ({state}), {
  checkAdCodeExpiration,
  trackAppOpened,
})(App)

import React, { useEffect, useRef } from 'react'
import ReactNative, { Share } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modalize from 'react-native-modalize'
import { connect } from 'react-redux'
import { trackAppOpened } from 'src/actions/analyticsActions'
import { checkAdCodeExpiration } from 'src/actions/productActions'
import AdBanner from 'src/components/common/AdBanner'
import { AnalyticsState } from 'src/reducers/analyticsReducer'
import { SettingsState } from 'src/reducers/settingsReducer'
import { gradient, backgroundColor } from 'src/styles/colors'
import ModalHeader from './common/ModalHeader'
import Header from './Header'
import Settings from './Settings'
import Windchill from './Windchill'
import ViewShot from 'react-native-view-shot'

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
  const settingsModal = useRef<Modalize>(null)
  const shareWindchill = useRef<ViewShot>(null)

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
    const modal = settingsModal.current
    if (modal) {
      modal.open()
    }
  }

  function closeModal() {
    const modal = settingsModal.current
    if (modal) {
      modal.close()
    }
  }

  async function handleSharePress() {
    if (!shareWindchill.current) return

    try {
      const uri = await shareWindchill.current.capture!()

      return Share.share({
        title: 'Windchill',
        url: `data:jpg;base64,${uri}`,
      })
    } catch (e) {
      console.warn(e)
    }
  }

  const { shouldShowAds } = state.settings

  return (
    <LinearGradient colors={gradient.colors} start={gradient.start} end={gradient.end} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Modalize
          ref={settingsModal}
          snapPoint={550}
          modalStyle={{ backgroundColor }}
          HeaderComponent={
            <ModalHeader onClosePress={closeModal}>
              Settings
            </ModalHeader>
          }>
          <Settings />
        </Modalize>

        <Header
          onSettingsPress={openModal}
          onSharePress={handleSharePress}
        />

        <Windchill
          units={state.settings.units}
          shareImageRef={shareWindchill}
        />

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

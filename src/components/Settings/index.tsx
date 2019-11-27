import { format } from 'date-fns'
import React, { useRef } from 'react'
import ReactNative, { SafeAreaView, TouchableOpacity } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'
import { loadProducts, purchaseProduct, restorePurchases, validateAdCode } from 'src/actions/productActions'
import { setUnits } from 'src/actions/settingsActions'
import ListSpacer from 'src/components/common/ListSpacer'
import { ProductsState } from 'src/reducers/productsReducer'
import { SettingsState } from 'src/reducers/settingsReducer'
import * as colors from 'src/styles/colors'
import appInfo from 'src/utils/appInfo'
import ContactSettings from './components/ContactSettings'
import PurchaseSettings from './components/PurchaseSettings'
import ShareSettings from './components/ShareSettings'
import UnitSettings from './components/UnitSettings'

const {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
} = ReactNative

interface SettingsProps {
  state: {
    settings: SettingsState
    products: ProductsState
  }
  handleClose: () => void
  setUnits: () => void
  validateAdCode: () => void
  loadProducts: () => void
  purchaseProduct: () => void
  restorePurchases: () => void
}

export const Settings: React.FC<SettingsProps> = ({ state, handleClose, setUnits, validateAdCode, loadProducts, purchaseProduct, restorePurchases }) => {
  const scrollView = useRef<ReactNative.ScrollView>(null)

  function handleOpenDarkSky() {
    Linking.openURL('https://darksky.net/poweredby/')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.navBarButton} />

        <Text style={styles.navbarTitleText}>Settings</Text>

        <TouchableOpacity onPress={handleClose} style={[styles.navBarButton, styles.navBarButtonRight]}>
          <Text style={styles.navBarButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollView}
        style={styles.scrollview}>

        {!state.settings.shouldShowAds && (
          <View style={styles.thanks}>
            {state.products.adCode ? (
              <Text style={styles.thanksText}>
                🎉 Enjoy Windchill ad-free until {format(new Date(state.products.adCode.expiration), 'MMM d, yyyy')}!
              </Text>
            ) : (
              <Text style={styles.thanksText}>
                🎉 Thanks for supporting Windchill!
              </Text>
            )}
          </View>
        )}

        <UnitSettings
          settings={state.settings}
          onChange={setUnits}
        />

        <PurchaseSettings
          products={state.products}
          loadProducts={loadProducts}
          purchaseProduct={purchaseProduct}
          restorePurchases={restorePurchases}
        />

        <ContactSettings />

        <ShareSettings
          settings={state.settings}
          validateAdCode={validateAdCode}
        />

        <View style={styles.footer}>
          <Text style={styles.textMuted}>
            v{appInfo.version}
            {' • '}
            Made with ♥️
            {' • '}
            <Text onPress={handleOpenDarkSky}>
              Powered by Dark Sky
            </Text>
          </Text>
        </View>

        <ListSpacer />
      </ScrollView>

      <KeyboardSpacer onToggle={(isOpen: boolean) => {
        setTimeout(() => {
          isOpen && scrollView.current && scrollView.current.scrollToEnd()
        }, 1)
      }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scrollview: {
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff',
  },
  navbarTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkGray,
  },
  navBarButton: {
    flex: 1,
    flexDirection: 'row',
  },
  navBarButtonRight: {
    justifyContent: 'flex-end',
  },
  navBarButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.brandPrimary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textMuted: {
    color: colors.lightGray,
  },
  thanks: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center'
  },
  thanksText: {
    color: colors.brandSuccess,
    fontSize: 16,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  }
})

export default connect((state) => ({state}), {
  setUnits,
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases,
})(Settings)

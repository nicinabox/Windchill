import React from 'react'
import ReactNative from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import isIphoneX from '../utils/isIphoneX'
import NavigationBar from 'react-native-navbar'
import ListSpacer from './ListSpacer'
import ContactSettings from './ContactSettings'
import PurchaseSettings from './PurchaseSettings'
import UnitSettings from './UnitSettings'
import { setUnits } from '../actions/settingsActions'
import {
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases
} from '../actions/productActions'
import * as colors from '../styles/colors'
import pkg from '../../package.json'
import { SettingsState } from 'src/reducers/settingsReducer'
import { ProductsState } from 'src/reducers/productsReducer'

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
   let scrollView

  function handleOpenDarkSky() {
    Linking.openURL('https://darksky.net/poweredby/')
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        containerStyle={styles.navbarStyle}
        title={{
          title: 'Settings'
        }}
        rightButton={{
          title: 'Done',
          handler: handleClose
        }}
      />

      <ScrollView
        ref={r => scrollView = r}
        style={{flex:1}}>

        {!state.settings.shouldShowAds && (
          <View style={styles.thanks}>
            {state.products.adCode ? (
              <Text style={styles.thanksText}>
                🎉 Enjoy Windchill ad-free until {format(state.products.adCode.expiration, 'MMM D, YYYY')}!
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
          settings={state.settings}
          validateAdCode={validateAdCode}
          loadProducts={loadProducts}
          purchaseProduct={purchaseProduct}
          restorePurchases={restorePurchases}
        />

        <ContactSettings />

        <View style={styles.footer}>
          <Text style={styles.textMuted}>
            v{pkg.version}
            {' • '}
            <Text onPress={handleOpenDarkSky}>
              Powered by Dark Sky
            </Text>
          </Text>
        </View>

        <ListSpacer />
      </ScrollView>

      <KeyboardSpacer onToggle={(isOpen) => {
        setTimeout(() => {
          isOpen && scrollView.scrollToEnd()
        }, 1)
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingBottom: isIphoneX() ? 24 : 0,
  },
  navbarStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor,
    paddingTop: isIphoneX() ? 24 : 0,
  },
  textMuted: {
    color: colors.borderColor
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

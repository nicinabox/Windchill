import { format } from 'date-fns'
import React from 'react'
import ReactNative from 'react-native'
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
import Thanks from './components/Thanks'

const {
  StyleSheet,
  View,
  Text,
  Linking,
} = ReactNative

interface SettingsProps {
  state: {
    settings: SettingsState
    products: ProductsState
  }
  setUnits: () => void
  validateAdCode: () => void
  loadProducts: () => void
  purchaseProduct: () => void
  restorePurchases: () => void
}

export const Settings: React.FC<SettingsProps> = ({ state, setUnits, validateAdCode, loadProducts, purchaseProduct, restorePurchases }) => {
  function handleOpenDarkSky() {
    Linking.openURL('https://darksky.net/poweredby/')
  }

  return (
    <View style={styles.container}>
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

      <Thanks
        settings={state.settings}
        products={state.products}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  textMuted: {
    color: colors.lightGray,
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

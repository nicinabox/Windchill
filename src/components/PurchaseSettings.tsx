import React, { Fragment, useEffect } from 'react'
import { StyleSheet, TextInput, Text, } from 'react-native'
import * as colors from '../styles/colors'
import { isPurchased } from '../utils/purchases'
import ListRow from './ListRow'
import ListSection from './ListSection'
import Button from './Button'
import { ProductsState } from 'src/reducers/productsReducer'

interface PurchaseSettingsProps {
  products: ProductsState
  loadProducts: () => void
  restorePurchases: () => void
  purchaseProduct: (id: string) => void
}

export const PurchaseSettings: React.FC<PurchaseSettingsProps> = ({ loadProducts, purchaseProduct, restorePurchases, products, }) => {
  useEffect(() => {
    loadProducts()
  }, [])


  return (
    <Fragment>
      <ListSection header="PURCHASES">
        {products.products.map((product) => {
          const isProductPurchased = isPurchased(product.identifier, products.purchases)
          return (
            <ListRow
              key={product.identifier}
              primaryText={product.title}
              detailText={isProductPurchased ? undefined : product.priceString}
              renderAccessory={() => isProductPurchased ? (
                <Text style={styles.textMuted}>
                  Purchased!
                </Text>
              ) : (
                <Button onPress={() => purchaseProduct(product.identifier)}>
                  Remove Ads
                </Button>
              )}
            />
          )
        })}

        <ListRow
          primaryText="Restore Purchases"
          onPress={restorePurchases}
          button={true}
        />
      </ListSection>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textMuted: {
    color: colors.borderColor
  },
})

export default PurchaseSettings

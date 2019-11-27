import React, { Fragment, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Button from 'src/components/common/Button'
import ListRow from 'src/components/common/ListRow'
import ListSection from 'src/components/common/ListSection'
import { ProductsState } from 'src/reducers/productsReducer'
import * as colors from 'src/styles/colors'
import { isPurchased } from 'src/utils/purchases'

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

import React, { Component, Fragment } from 'react'
import { StyleSheet, TextInput, Text, } from 'react-native'
import { sample } from 'lodash'
import * as colors from '../styles/colors'
import { isPurchased } from '../utils/purchases'
import ListRow from './ListRow'
import ListSection from './ListSection'
import Button from './Button'

export default class PurchaseSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buyText: this.getBuyText()
    }

    this.handlePurchase = this.handlePurchase.bind(this)
    this.handleRestorePurchases = this.handleRestorePurchases.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handlePurchase(id) {
    this.props.purchaseProduct(id)
  }

  handleRestorePurchases() {
    this.props.restorePurchases()
  }

  getBuyText() {
    return sample([
      'Buy',
      'Get',
      'Pew! Pew!',
      'Remove Ads',
    ])
  }

  render() {
    return (
      <Fragment>
        <ListSection header="PURCHASES">
          {this.props.products.products.map((product) => {
            const isProductPurchased = isPurchased(product.identifier, this.props.products.purchases)
            return (
              <ListRow
                key={product.identifier}
                primaryText={product.title}
                detailText={!isProductPurchased && product.priceString}
                renderAccessory={() => isProductPurchased ? (
                  <Text style={styles.textMuted}>
                    Purchased!
                  </Text>
                ) : (
                  <Button onPress={() => this.handlePurchase(product.identifier)}>
                    {this.state.buyText}
                  </Button>
                )}
              />
            )
          })}

          <ListRow
            primaryText="Restore Purchases"
            onPress={this.handleRestorePurchases}
            button={true}
          />
        </ListSection>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textMuted: {
    color: colors.borderColor
  },
})

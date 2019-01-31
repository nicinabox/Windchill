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
    this.handleRemoveAdsCodeSubmit = this.handleRemoveAdsCodeSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleRemoveAdsCodeSubmit() {
    this.props.validateAdCode(this.state.removeAdsCode)
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

        {this.props.settings.shouldShowAds && (
          <ListSection
            header="Share Windchill on your favorite social media site or forum and get a year ad-free!"
            footer="Contact me with a link to your post and I'll send you a code.">
            <ListRow
              primaryText="Enter Ad-Free Code"
              renderAccessory={() => (
                <TextInput
                  style={styles.input}
                  value={this.state.removeAdsCode}
                  onChangeText={(removeAdsCode) => this.setState({ removeAdsCode })}
                  onSubmitEditing={this.handleRemoveAdsCodeSubmit}
                  autoCorrect={false}
                  autoCapitalize="characters"
                  returnKeyType="go"
                />
              )}
            />
          </ListSection>
        )}
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
  input: {
    height: 40,
    width: '100%',
    fontFamily: 'Menlo',
    textAlign: 'right',
  },
})

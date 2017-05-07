import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from 'react-native-navbar'
import ListSection from './ListSection'
import ListRow from './ListRow'
import { US, SI } from '../utils/conversions'
import { setItem } from '../utils/storage'
import { isPurchased } from '../utils/purchases'
import { setUnits } from '../actions/settingsActions'
import { loadProducts, purchaseProduct, restorePurchases } from '../actions/productActions'

const {
  NativeModules,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
} = ReactNative

const { InAppUtils } = NativeModules

export class Settings extends Component {
  constructor(props) {
    super(props)

    this.purchase = this.purchase.bind(this)
    this.restorePurchases = this.restorePurchases.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  purchase(id) {
    this.props.purchaseProduct(id)
  }

  restorePurchases() {
    this.props.restorePurchases()
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          containerStyle={styles.navbarStyle}
          title={{
            title: 'Settings'
          }}
          rightButton={{
            title: 'Done',
            handler: this.props.handleClose
          }}
        />

        <ScrollView>
          <ListSection header="UNITS">
            {[US, SI].map((u) => {
              return (
                <ListRow
                  key={`units-${u}`}
                  primaryText={u.toUpperCase()}
                  onPress={() => this.props.setUnits(u)}
                  checked={this.props.state.settings.units === u}
                />
              )
            })}
          </ListSection>

          <ListSection header="PURCHASES">
            {this.props.state.products.products.map((product) => {
              const isProductPurchased = isPurchased(product.identifier, this.props.state.products.purchases)
              return (
                <ListRow
                  key={product.identifier}
                  primaryText={product.title}
                  detailText={!isProductPurchased && product.priceString}
                  renderAccessory={() => isProductPurchased ? (
                    <Text style={styles.textMuted}>Purchased!</Text>
                  ) : (
                    <TouchableOpacity onPress={() => this.purchase(product.identifier)}>
                      <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                  )}
                />
              )
            })}

            <ListRow
              primaryText="Restore Purchases"
              onPress={this.restorePurchases}
            />
          </ListSection>

          {!this.props.state.settings.shouldShowAds && (
            <View style={styles.thanks}>
              <Text style={styles.thanksText}>
                Thanks for supporting Windchill!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  navbarStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb'
  },
  buttonText: {
    color: '#4990E2',
    fontSize: 17
  },
  textMuted: {
    color: '#bbb'
  },
  thanks: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'center'
  },
  thanksText: {
    color: '#1acb58'
  }
})

export default connect((state) => ({state}), {
  setUnits,
  loadProducts,
  purchaseProduct,
  restorePurchases,
})(Settings)

import React, { Component } from 'react'
import ReactNative from 'react-native'
import NavigationBar from 'react-native-navbar'
import ListSection from './ListSection'
import ListRow from './ListRow'
import { US, SI } from '../utils/conversions'

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
const products = [
  'com.nicinabox.windchill.removeads'
]

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.buy = this.buy.bind(this)
    this.restoreRemoveAds = this.restoreRemoveAds.bind(this)

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    InAppUtils.loadProducts(products, (err, products) => {
      if (err) {
        return Alert.alert(err.message)
      }
      console.log(products);
      this.setState({ products })
    })
  }

  buy(id) {
    InAppUtils.purchaseProduct(id, (err, resp) => {
      if (err) {
        return Alert.alert(err.message)
      }

      console.log(resp);

      // if (resp && resp.productIdentifier) {
      //   console.log('Purchase Successful', 'Your Transaction ID is ' + resp.transactionIdentifier)
      // }
    })
  }

  restoreRemoveAds() {
    InAppUtils.restorePurchases((err, resp) => {
      if (err) {
        return Alert.alert('Could not connect to iTunes Store')
      }
      console.log(resp);

      // if (error) {
      //   console.log('itunes Error', 'Could not connect to itunes store.')
      // } else {
      //   console.log('Restore Successful', 'Successfully restores all your purchases.')
      //
      //   if (response.length === 0) {
      //     console.log('No Purchases', "We didn't find any purchases to restore.")
      //     return
      //   }
      //
      //   response.forEach( function(purchase) {
      //     if (purchase.productIdentifier === purchases[0]) {
      //       // Handle purchased product.
      //     }
      //   })
      // }
    })
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
                  onPress={() => this.props.handleUnitChange(u)}
                  checked={this.props.units === u}
                />
              )
            })}
          </ListSection>

          <ListSection header="PURCHASES">
            {this.state.products.map((product) => (
              <ListRow
                key={product.identifier}
                primaryText={product.title}
                detailText={product.priceString}
                renderAccessory={() => (
                  <TouchableOpacity onPress={() => this.buy(product.identifier)}>
                    <Text style={styles.buttonText}>Buy</Text>
                  </TouchableOpacity>
                )}
              />
            ))}

            <ListRow
              primaryText="Restore Purchases"
              onPress={this.restoreRemoveAds}
            />
          </ListSection>
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
  }
})

import React, { Component } from 'react'
import ReactNative from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import NavigationBar from 'react-native-navbar'
import ListSection from './ListSection'
import ListRow from './ListRow'
import Button from './Button'
import { US, SI } from '../utils/conversions'
import { setItem } from '../utils/storage'
import { isPurchased } from '../utils/purchases'
import { setUnits } from '../actions/settingsActions'
import {
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases
} from '../actions/productActions'
import * as colors from '../styles/colors'

const {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Linking,
  Alert,
} = ReactNative

export class Settings extends Component {
  constructor(props) {
    super(props)

    this.purchase = this.purchase.bind(this)
    this.restorePurchases = this.restorePurchases.bind(this)
    this.handleContact = this.handleContact.bind(this)
    this.handleRemoveAdsCodeSubmit = this.handleRemoveAdsCodeSubmit.bind(this)

    this.state = {}
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

  handleContact() {
    Linking.openURL('mailto:nic@nicinabox.com?subject=Windchill Ad-free Code')
  }

  handleRemoveAdsCodeSubmit() {
    this.props.validateAdCode(this.state.removeAdsCode)
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

        <ScrollView
          ref={r => this.scrollView = r}
          style={{flex:1}}>
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
                    <Button onPress={() => this.purchase(product.identifier)}>
                      Buy
                    </Button>
                  )}
                />
              )
            })}

            <ListRow
              primaryText="Restore Purchases"
              onPress={this.restorePurchases}
            />
          </ListSection>

          {this.props.state.settings.shouldShowAds && (
            <ListSection
              header="Share Windchill on your favorite social media site or forum and get a year ad-free!"
              footer={() => (
                <Text>
                  <Text onPress={this.handleContact} style={styles.footerLink}>
                    Contact me
                  </Text>
                  {' '}with a link to your post and I'll send you a code.
                </Text>
              )}>
              <ListRow
                primaryText="Enter Code"
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

          {!this.props.state.settings.shouldShowAds && (
            <View style={styles.thanks}>
              {this.props.state.products.adCode ? (
                <Text style={styles.thanksText}>
                  🎉 Enjoy Windchill ad-free until {format(this.props.state.products.adCode.expiration, 'MMM D, YYYY')}!
                </Text>
              ) : (
                <Text style={styles.thanksText}>
                  🎉 Thanks for supporting Windchill!
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        <KeyboardSpacer onToggle={(isOpen) => {
          setTimeout(() => {
            isOpen && this.scrollView.scrollToEnd()
          }, 1)
        }}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  navbarStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor
  },
  textMuted: {
    color: colors.borderColor
  },
  thanks: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'center'
  },
  thanksText: {
    color: colors.brandSuccess
  },
  input: {
    height: 40,
    flex: 1,
    fontFamily: 'Menlo',
    textAlign: 'right',
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
})

export default connect((state) => ({state}), {
  setUnits,
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases,
})(Settings)

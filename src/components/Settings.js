import React, { Component } from 'react'
import ReactNative from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { sample } from 'lodash'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import NavigationBar from 'react-native-navbar'
import ListSection from './ListSection'
import ListRow from './ListRow'
import ListSpacer from './ListSpacer'
import Button from './Button'
import isIphoneX from '../utils/isIphoneX'
import { US, SI } from '../utils/conversions'
import { isPurchased } from '../utils/purchases'
import { setUnits } from '../actions/settingsActions'
import {
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases
} from '../actions/productActions'
import * as colors from '../styles/colors'
import pkg from '../../package.json'

const {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Linking,
} = ReactNative

export class Settings extends Component {
  constructor(props) {
    super(props)

    this.purchase = this.purchase.bind(this)
    this.restorePurchases = this.restorePurchases.bind(this)
    this.handleEmailContact = this.handleEmailContact.bind(this)
    this.handleTwitterContact = this.handleTwitterContact.bind(this)
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

  getBuyText() {
    return sample([
      'Buy',
      'Banish Ads',
      'Pew! Pew!',
      'Remove Ads',
    ])
  }

  handleEmailContact() {
    Linking.openURL(`mailto:nic@nicinabox.com?subject=Windchill (${pkg.version})`)
  }

  handleTwitterContact() {
    Linking.openURL('https://twitter.com/nicinabox')
  }

  handleDarkSky() {
    Linking.openURL('https://darksky.net/poweredby/')
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

          <ListSection header="UNITS">
            {[US, SI].map((u) => {
              return (
                <ListRow
                  key={`units-${u}`}
                  primaryText={u.toUpperCase()}
                  onPress={() => this.props.setUnits(u)}
                  checked={this.props.state.settings.unitSystem === u}
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
                      {this.getBuyText()}
                    </Button>
                  )}
                />
              )
            })}

            <ListRow
              primaryText="Restore Purchases"
              onPress={this.restorePurchases}
              button={true}
            />
          </ListSection>

          {this.props.state.settings.shouldShowAds && (
            <ListSection
              header="Share Windchill on your favorite social media site or forum and get a year ad-free!"
              footer="Contact me with a link to your post and I'll send you a code.">
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

          <ListSection header="CONTACT">
            <ListRow
              primaryText="Email"
              detailText="nic@nicinabox.com"
              onPress={this.handleEmailContact}
            />
            <ListRow
              primaryText="Twitter"
              detailText="@nicinabox"
              onPress={this.handleTwitterContact}
            />
          </ListSection>

          <View style={styles.footer}>
            <Text style={styles.textMuted}>
              v{pkg.version}
              {' • '}
              <Text onPress={this.handleDarkSky}>
                Powered by Dark Sky
              </Text>
            </Text>
          </View>

          <ListSpacer />
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
  input: {
    height: 40,
    width: '100%',
    fontFamily: 'Menlo',
    textAlign: 'right',
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

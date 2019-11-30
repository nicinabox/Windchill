import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ProductsState } from 'src/reducers/productsReducer'
import Promo from './Promo'
import { SettingsState } from 'src/reducers/settingsReducer'

interface ThanksProps {
  products: ProductsState
  settings: SettingsState
}

export const Thanks: React.FC<ThanksProps> = ({ settings, products }) => {
  const { adCode } = products

  if (settings.shouldShowAds) {
    return null
  }

  return (
    <Promo heading="🎉 Thanks for your support!">
      <Text style={styles.textSecondary}>
        {adCode
          ? `Enjoy Windchill ad-free until ${format(new Date(adCode.expiration), 'MMM d, yyyy')}!`
          : 'Windchill is made by one person and your support means a lot to me. Feel free to reach out if you need anything!'}
      </Text>
    </Promo>
  )
}

const styles = StyleSheet.create({
  textSecondary: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Thanks

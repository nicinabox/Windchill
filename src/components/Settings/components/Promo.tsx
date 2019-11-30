import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as colors from 'src/styles/colors'

const { gradient } = colors

interface PromoProps {
  heading: string
  headerAccessory?: React.ReactNode
}

export const Promo: React.FC<PromoProps> = ({ heading, headerAccessory, children }) => {
  return (
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headingText}>
          {heading}
        </Text>

        {headerAccessory}
      </View>

      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingText: {
    flex: 1,
    marginRight: 20,
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  textSecondary: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 18,
  },
})

export default Promo

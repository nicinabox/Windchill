import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as colors from 'src/styles/colors'
import isIPhoneX from 'src/utils/isIPhoneX'

interface NavbarProps {
  titleText: string
  rightButtonText: string
  onRightButtonPress: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ titleText, rightButtonText, onRightButtonPress }) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.navBarButton} />

      <Text style={styles.navbarTitleText}>{titleText}</Text>

      <TouchableOpacity onPress={onRightButtonPress} style={[styles.navBarButton, styles.navBarButtonRight]}>
        <Text style={styles.navBarButtonText}>{rightButtonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor,
    backgroundColor: '#fff',
    paddingTop: isIPhoneX() ? 44 : 20,
  },
  navbarTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkGray,
  },
  navBarButton: {
    flex: 1,
    flexDirection: 'row',
  },
  navBarButtonRight: {
    justifyContent: 'flex-end',
  },
  navBarButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.brandPrimary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
})

export default Navbar

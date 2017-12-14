import React from 'react'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import isIphoneX from '../utils/isIphoneX'
import Button from './Button'

const {
  StyleSheet,
  View,
} = ReactNative

export default function Header ({onSettingsPress}) {
  return (
    <View style={styles.container}>
      <View>
      </View>

      <Button onPress={onSettingsPress}>
        <Icon name="ios-settings-outline" size={26} style={styles.buttonText} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 44,
    position: 'absolute',
    top: isIphoneX() ? 44 : 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
  },
})

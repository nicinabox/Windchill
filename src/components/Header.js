import React from 'react'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import isIphoneX from '../utils/isIphoneX'

const {
  StyleSheet,
  View,
  TouchableOpacity,
} = ReactNative

export default function Header ({onSettingsPress}) {
  return (
    <View style={styles.container}>
      <View>
      </View>

      <TouchableOpacity
        style={styles.headerButton}
        onPress={onSettingsPress}>
        <Icon name="ios-settings-outline" size={26} style={styles.buttonText} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isIphoneX() ? 24 : 0,
    paddingHorizontal: 10,
    height: 48,
  },
  buttonText: {
    color: '#fff',
  },
})

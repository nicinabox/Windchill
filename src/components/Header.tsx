import React from 'react'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from './Button'

const {
  StyleSheet,
  View,
} = ReactNative

interface HeaderProps {
  onSettingsPress: () => void
}

export const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <View>
      </View>

      <Button onPress={onSettingsPress} style={styles.button}>
        <Icon name="ios-settings" size={26} style={styles.buttonText} />
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
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
  },
})

export default Header

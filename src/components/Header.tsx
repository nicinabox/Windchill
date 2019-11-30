import React from 'react'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Button from 'src/components/common/Button'

const {
  StyleSheet,
  View,
} = ReactNative

interface HeaderProps {
  onSettingsPress: () => void
  onSharePress: () => void
  }

export const Header: React.FC<HeaderProps> = ({ onSettingsPress, onSharePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button onPress={onSharePress} style={styles.button}>
          <Icon name="share" size={26} style={styles.buttonText} />
        </Button>

        <Button onPress={onSettingsPress} style={styles.button}>
          <Icon name="settings" size={26} style={styles.buttonText} />
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
})

export default Header

import React from 'react'
import { Text, View, MaskedViewIOS, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { gradient, lightGray, backgroundColor } from 'src/styles/colors'

interface ModalHeaderProps {
  onClosePress: () => void
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, onClosePress }) => {
  return (
    <View style={styles.header}>
      <MaskedViewIOS maskElement={
        <Text style={styles.headerText}>{children}</Text>
      }>
        <LinearGradient {...gradient}>
          <Text style={[styles.headerText, { opacity: 0 }]}>
            {children}
          </Text>
        </LinearGradient>
      </MaskedViewIOS>

      <TouchableOpacity onPress={onClosePress}>
        <Icon name="ios-close-circle" size={26} style={styles.closeButton} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor,
  },
  headerText: {
    fontSize: 34,
    fontWeight: '700',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  closeButton: {
    padding: 20,
    color: lightGray,
  },
})

export default ModalHeader

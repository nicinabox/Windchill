import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as colors from 'src/styles/colors'

interface ListRowProps {
  onPress?: () => void
  primaryText: string
  detailText?: string
  renderAccessory?: () => React.ReactNode
  button?: boolean
  checked?: boolean
}

interface TouchableWrapperProps {
  children: React.ReactNode
  style: ViewStyle
  onPress?: () => void
}

const TouchableWrapper: React.FC<TouchableWrapperProps> = ({ onPress, children, style }) => {
  if (onPress) {
    return (
      <TouchableHighlight onPress={onPress} style={style}>
        {children}
      </TouchableHighlight>
    )
  }

  return <View style={style}>{children}</View>
}

export const ListRow: React.FC<ListRowProps> = ({
  onPress,
  primaryText,
  detailText,
  renderAccessory,
  checked,
  button
}) => {
  return (
    <TouchableWrapper style={styles.row} onPress={onPress}>
      <View style={styles.rowInner}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={[styles.primaryText, button ? styles.buttonText : null]}>
              {primaryText}
            </Text>
            {detailText && (
              <Text style={styles.detailText}>
                {detailText}
              </Text>
            )}
          </View>

          <View style={styles.accessory}>
            {renderAccessory && renderAccessory()}

            {checked ? (
              <Icon name="ios-checkmark" style={styles.checkmark} />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWrapper>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
  },
  rowInner: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginLeft: 20,
    minHeight: 50,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryText: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 12,
    marginTop: 2,
    color: colors.mediumGray,
  },
  buttonText: {
    color: colors.brandPrimary,
  },
  content: {
    paddingVertical: 6,
  },
  accessory: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 10,
  },
  checkmark: {
    color: colors.brandPrimary,
    fontSize: 40,
    maxHeight: 36,
  }
})

export default ListRow

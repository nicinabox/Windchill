import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ListSeparator from './ListSeparator'
import * as colors from '../styles/colors'

interface ListRowProps {
  onPress?: () => void
  primaryText: string
  detailText: string
  renderAccessory: () => React.ReactNode
  button: boolean
  checked: boolean
}

export const ListRow: React.FC<ListRowProps> = (props) => {
  const Wrapper = ({ children }) => {
    if (props.onPress) {
      return <TouchableHighlight onPress={props.onPress} style={styles.row}>{children}</TouchableHighlight>
    }
    return <View style={styles.row}>{children}</View>
  }

  return (
    <Wrapper>
      <View style={styles.rowInner}>
        <View style={styles.contentContainer}>

          <View style={styles.content}>
            <Text style={[styles.primaryText, props.button ? styles.buttonText : null]}>
              {props.primaryText}
            </Text>
            {props.detailText && (
              <Text style={styles.detailText}>
                {props.detailText}
              </Text>
            )}
          </View>

          <View style={styles.accessory}>
            {props.renderAccessory && props.renderAccessory()}

            {props.checked ? (
              <Icon name="ios-checkmark" style={styles.checkmark} />
            ) : null}
          </View>
        </View>

        <ListSeparator />
      </View>
    </Wrapper>
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
    marginLeft: 15,
    minHeight: 44,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.mediumGray,
  },
  buttonText: {
    color: colors.brandPrimary,
  },
  content: {
  },
  accessory: {
    flex: 1,
    alignItems: 'flex-end',
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

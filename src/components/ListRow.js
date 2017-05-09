import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ListSeparator from './ListSeparator'
import * as colors from '../styles/colors'

export default function ListRow (props) {
  let Wrapper = View
  if (props.onPress) {
    Wrapper = TouchableHighlight
  }

  return (
    <Wrapper onPress={props.onPress} style={styles.row}>
      <View style={styles.rowInner}>
        <View style={styles.contentContainer}>

          <View style={styles.content}>
            <Text style={styles.primaryText}>
              {props.primaryText}
            </Text>
            {props.detailText && (
              <Text style={styles.detailText}>
                {props.detailText}
              </Text>
            )}
          </View>

          <View style={styles.accessory}>
            {props.checked ? (
              <Icon name="ios-checkmark" style={styles.checkmark} />
            ) : null}

            {props.renderAccessory && props.renderAccessory()}
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
    minHeight: 42,

    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 12,
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

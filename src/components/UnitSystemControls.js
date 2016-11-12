import React, { Component } from 'react'
import ReactNative from 'react-native'
import { US, SI } from '../utils/conversions'

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} = ReactNative

export default class UnitSystemControls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { unit } = this.props

    return (
      <View style={styles.unitControls}>
        {[US, SI].map((u) => {
          return (
            <TouchableHighlight key={`unit-${u}`} onPress={() => this.props.onPress(u)}>
              <View style={[styles.unitControl, unit === u && styles.unitControlActive]}>
                <Text style={[styles.unitControlText, unit === u && styles.unitControlActiveText]}>
                  {u.toUpperCase()}
                </Text>
              </View>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  unitControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  unitControl: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  unitControlActive: {
  },
  unitControlActiveText: {
    color: '#4990E2',
    fontWeight: 'bold',
  },
  unitControlText: {
    fontSize: 12,
    color: '#aaa'
  },
})
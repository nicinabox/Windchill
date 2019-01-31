import React, { Component } from 'react'
import { StyleSheet, View, SegmentedControlIOS } from 'react-native'
import ListSection from './ListSection'
import ListRow from './ListRow'
import * as colors from '../styles/colors'
import { UNITS } from '../utils/conversions'

export default class UnitSettings extends Component {
  render() {
    return (
      <ListSection header="UNITS">
        {Object.keys(UNITS).map((unitSystem) => {
          return (
            <ListRow
              key={unitSystem}
              primaryText={unitSystem.toUpperCase()}
              detailText={Object.values(UNITS[unitSystem]).map(({unit}) => unit).join(', ')}
              onPress={() => this.props.setUnits(unitSystem)}
              checked={this.props.settings.unitSystem === unitSystem}
            />
          )
        })}
      </ListSection>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

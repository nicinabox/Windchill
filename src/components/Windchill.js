import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import windchill from '../utils/windchill'
import { BOUNDS, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import CurrentConditions from './CurrentConditions'
import LineGaugeInput from './LineGaugeInput'
import FeelsLike from './FeelsLike'

var {
  StyleSheet,
  View,
} = ReactNative

export class Windchill extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleConditionsPress = this.handleConditionsPress.bind(this)

    const { unitSystem } = props.state.settings

    this.state = {
      speed: BOUNDS[unitSystem].speed.min,
      temperature: BOUNDS[unitSystem].temperature.max,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { unitSystem } = nextProps.state.settings

    if (unitSystem !== this.props.state.settings.unitSystem) {
      this.setState({
        speed: Math.round(convertSpeed(this.state.speed, unitSystem)),
        temperature: Math.round(convertTemp(this.state.temperature, unitSystem)),
      })
    }
  }

  calculateWindChill() {
    let { temperature, speed } = this.state
    const { unitSystem } = this.props.state.settings

    return windchill(temperature, speed, unitSystem)
  }

  handleChange(nextState) {
    this.setState(nextState)
    this.props.onChange()
  }

  handleConditionsPress(currently) {
    this.setState(currently)
  }

  render() {
    const { unitSystem } = this.props.state.settings

    return (
      <View style={styles.container}>
        <FeelsLike value={this.calculateWindChill()} />

        <View style={styles.controls}>
          <CurrentConditions
            unitSystem={unitSystem}
            onPress={this.handleConditionsPress}
          />

          <LineGaugeInput
            label="Wind Speed"
            value={this.state.speed}
            units={UNITS[unitSystem].speed}
            bounds={BOUNDS[unitSystem].speed}
            onChange={(value) => this.handleChange({ speed: value })}
          />

          <LineGaugeInput
            label="Temperature"
            value={this.state.temperature}
            units={UNITS[unitSystem].temperature}
            bounds={BOUNDS[unitSystem].temperature}
            onChange={(value) => this.handleChange({ temperature: value })}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  controls: {
    justifyContent: 'center',
  },
  settingsText: {
    color: '#fff',
    fontSize: 23,
  },
})

export default connect((state) => ({state}))(Windchill)

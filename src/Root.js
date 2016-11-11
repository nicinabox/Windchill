import React, { Component } from 'react'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import Tape from './components/Tape'

var {
  StyleSheet,
  Dimensions,
  View,
  Text,
} = ReactNative

export default class Root extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)

    this.state = {
      wind: 3,
      temp: 1,
    }
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(wind) {
    this.setState({ wind })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feelsLike}>
          <Text style={styles.feelsLikeText}>
            Feels like
          </Text>
          <Text style={styles.feelsLikeTempText}>
            {windchill.us(this.state.temp, this.state.wind)}
          </Text>
        </View>

        <View style={styles.tape}>
          <Text style={styles.tapeValue}>{this.state.wind} mph</Text>
          <Tape min={3} onChange={this._handleWindSpeedChange} />
          <Text style={styles.tapeLabel}>Wind Speed</Text>
        </View>

        <View style={styles.tape}>
          <Text style={styles.tapeValue}>{this.state.temp} F</Text>
          <Tape max={50} onChange={this._handleTemperatureChange} />
          <Text style={styles.tapeLabel}>Temperature</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tape: {
    marginTop: 20,
    marginBottom: 30
  },
  tapeValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  tapeLabel: {
    textAlign: 'center',
    color: '#4A4A4A'
  },
  feelsLike: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 80,
  },
  feelsLikeText: {
    fontSize: 38,
    color: '#4990E2',
    fontWeight: '200',
  },
  feelsLikeTempText: {
    fontSize: 144,
    fontWeight: '100',
    color: '#4990E2',
  }
})

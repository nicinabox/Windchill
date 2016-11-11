import React, { Component, PropTypes } from 'react'
import ReactNative from 'react-native'
import times from 'lodash/times'

var {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View,
} = ReactNative

const TAPE_WIDTH = Math.floor(Dimensions.get('window').width)
const MARK_WIDTH = 15

const scale = (v, inputMin, inputMax, outputMin, outputMax) => {
  return Math.floor(((v - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin)
}

export default class Tape extends Component {
  constructor(props) {
    super(props)

    this._handleScroll = this._handleScroll.bind(this)

    this.scrollMax = this._getScrollMax(props)

    this.state = {
      contentOffset: this._scaleValue(props.initialValue || props.min),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.scrollMax = this._getScrollMax(nextProps)
  }

  value(val) {
    this.setState({
      contentOffset: this._scaleValue(val)
    })
  }

  _getScrollMax(props = this.props) {
    return (props.max - props.min) * props.interval * MARK_WIDTH
  }

  _scaleScroll(x) {
    let { min, max } = this.props
    let scrollMin = 0
    let scrollMax = this.scrollMax

    return scale(x, scrollMin, scrollMax, min, max)
  }

  _scaleValue(v) {
    let { min, max } = this.props
    let scrollMin = 0
    let scrollMax = this.scrollMax

    return scale(v, min, max, scrollMin, scrollMax)
  }

  _handleScroll(event) {
    let offset = event.nativeEvent.contentOffset.x
    let { min, max } = this.props

    let val = this._scaleScroll(offset)
    val = val < min ? min : val
    val = val > max ? max : val

    this.props.onChange(val)
  }

  _getMarkSize(val) {
    let { mark } = this.props
    if (val % mark == 0) {
      return 'large'
    }

    if (Number.isInteger(mark / 2) && val % (mark / 2) === 0) {
      return 'medium'
    }

    return 'small'
  }

  _renderIntervals() {
    let { min, max, interval, mark } = this.props
    let range = max - min + 1

    let values = times(range, (i) => i + min)

    return values.map((val, i) => {
      let markSize = this._getMarkSize(val)

      return (
        <View key={`val-${i}`} style={styles.markContainer}>
          {markSize === 'large' && (
            <Text style={styles.markValue}>{val}</Text>
          )}

          <View style={[styles.mark, styles[markSize]]}/>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustInsets={false}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={MARK_WIDTH}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={this._handleScroll}
          scrollEventThrottle={100}
          contentOffset={{ x: this.state.contentOffset }}>

          <View style={styles.marks}>
            {this._renderIntervals()}
          </View>
        </ScrollView>

        <View style={styles.centerline} />
      </View>
    )
  }
}

Tape.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  interval: PropTypes.number,
  mark: PropTypes.number,
  value: PropTypes.number,
}

Tape.defaultProps = {
  min: 1,
  max: 99,
  interval: 1,
  mark: 10,
}

var styles = StyleSheet.create({
  container: {
    height: 55,
    width: TAPE_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    backgroundColor: '#F9F9F9',
    marginVertical: 8,
  },
  marks: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: TAPE_WIDTH / 2,
    marginHorizontal: -MARK_WIDTH / 2,
  },
  markContainer: {
    width: MARK_WIDTH,
    alignItems: 'center',
  },
  mark: {
    width: 1,
    marginRight: -1,
    backgroundColor: '#979797',
  },
  markValue: {
    fontSize: 9,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  small: {
    height: 13,
  },
  medium: {
    height: 20,
  },
  large: {
    backgroundColor: '#4A4A4A',
    width: 2,
    height: 26,
  },
  centerline: {
    height: 54,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
    left: TAPE_WIDTH / 2,
    opacity: 0.6,
    top: 0,
    zIndex: -1
  },
})

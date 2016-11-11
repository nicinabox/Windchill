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
const MARK_WIDTH = 12

export default class Tape extends Component {
  constructor(props) {
    super(props)

    this._handleScroll = this._handleScroll.bind(this)

    this.scrollMax = (props.max - props.min) * props.interval * MARK_WIDTH

    this.state = {
      value: props.value || props.min,
    }
  }

  _scale(x) {
    let { min, max, interval } = this.props
    let scrollMin = 0
    let scrollMax = this.scrollMax

    return Math.floor(((x - scrollMin) / (scrollMax - scrollMin)) * (max - min) + min)
  }

  _handleScroll(event) {
    let offset = event.nativeEvent.contentOffset.x
    let { min, max } = this.props

    let val = this._scale(offset)
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
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          onScroll={this._handleScroll}
          scrollEventThrottle={200}>

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
  max: 100,
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
  },
  markContainer: {
    width: MARK_WIDTH,
  },
  mark: {
    width: 1,
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

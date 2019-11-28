import React, { useRef, useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  GestureResponderEvent,
} from 'react-native'
import { times } from 'lodash'
import scale from 'src/utils/scale'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const GAUGE_WIDTH = Math.floor(SCREEN_WIDTH)
const INTERVAL_WIDTH = 12

interface LineGaugeProps {
  onChange: (value: number) => void
  min?: number
  max?: number
  largeInterval?: number
  mediumInterval?: number
  value?: number
}

export const LineGauge: React.FC<LineGaugeProps> = ({
  min = 1,
  max = 100,
  mediumInterval = 5,
  largeInterval = 10,
  value = min,
  onChange,
}) => {
  const scrollBounds = [0, getScrollMax()]

  const scrollView = useRef<ScrollView>(null)
  const scrollOffsetX = useRef(scaleValue(value))
  const scrollValue = useRef(value)

  const [isUserScrolling, setIsUserScrolling] = useState(false)

  useEffect(() => {
    if (!isUserScrolling && value !== scrollValue.current) {
      setIsUserScrolling(true)
      scrollTo(scaleValue(value))
    }
  }, [value, isUserScrolling])

  function scrollTo(x: number) {
    if (scrollView.current) {
      scrollView.current.scrollTo({ x, animated: true })
    }
  }

  function setScrollValue(nextValue: number) {
    return scrollValue.current = nextValue
  }

  function scaleValue(value: number) {
    return scale(value, [min, max], scrollBounds)
  }

  function scaleScrollOffset(offset: number) {
    return scale(offset, scrollBounds, [min, max])
  }

  function getScrollMax() {
    return (max - min) * INTERVAL_WIDTH
  }

  function getIntervalSize(val: number) {
    if (val % largeInterval == 0) return 'large'
    if (val % mediumInterval == 0) return 'medium'
    return 'small'
  }

  function handleContentSizeChange() {
    scrollTo(scaleValue(value))
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (!isUserScrolling) {
      return
    }

    const offset = event.nativeEvent.contentOffset.x
    const nextValue = scaleScrollOffset(offset)

    if (scrollValue.current !== nextValue) {
      setScrollValue(nextValue)
      onChange(nextValue)
    }
  }

  function handleScrollEnd() {
    setIsUserScrolling(false)
  }

  function handleTouchEnd({ nativeEvent }: GestureResponderEvent) {
    const { pageX } = nativeEvent

    if (isUserScrolling) return

    if (pageX < SCREEN_WIDTH / 2) {
      setScrollValue(scrollValue.current - 1)
    } else {
      setScrollValue(scrollValue.current + 1)
    }

    scrollTo(scaleValue(scrollValue.current))
  }

  function renderIntervals() {
    const range = max - min + 1
    const values: number[] = times(range, (i: number) => i + min)

    return values.map((val, i) => {
      const intervalSize = getIntervalSize(val)

      return (
        <View key={`val-${i}`} style={styles.intervalContainer}>
          {intervalSize === 'large' && (
            <Text style={styles.intervalValue}>{val}</Text>
          )}

          <View style={[styles.interval, styles[intervalSize]]}/>
        </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        decelerationRate={0.8}
        snapToInterval={INTERVAL_WIDTH}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={() => setIsUserScrolling(true)}
        onTouchEnd={handleTouchEnd}
        scrollEventThrottle={16}
        contentOffset={{ x: scrollOffsetX.current, y: 0 }}>
        <View style={styles.intervals}>
          {renderIntervals()}
        </View>
      </ScrollView>

      <View style={styles.centerline} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: GAUGE_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: 8,
  },
  intervals: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: GAUGE_WIDTH / 2,
    marginHorizontal: -INTERVAL_WIDTH / 2,
  },
  intervalContainer: {
    width: INTERVAL_WIDTH,
    alignItems: 'center',
  },
  interval: {
    width: 1,
    marginRight: -1,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  intervalValue: {
    fontSize: 9,
    marginBottom: 3,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    top: -14,
    zIndex: 1,
    width: INTERVAL_WIDTH * 2,
  },
  small: {
    height: 13,
  },
  medium: {
    height: 17,
  },
  large: {
    backgroundColor: '#fff',
    width: 2,
    height: 17,
  },
  centerline: {
    height: 47,
    width: 1,
    backgroundColor: '#50E3C2',
    position: 'absolute',
    left: GAUGE_WIDTH / 2,
    opacity: 0.6,
    top: 0,
    zIndex: -1
  },
})

export default LineGauge

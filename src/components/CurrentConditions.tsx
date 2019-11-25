import React, { Component, useEffect, useState } from 'react'
import ReactNative from 'react-native'
import errorReporter from '../utils/errorReporter'
import { DARK_SKY } from '../utils/conversions'
import fetchCurrentConditions from '../utils/fetchCurrentConditions'
import getPosition from '../utils/getPosition'
import { DarkSkyConditionsCurrently } from 'src/interfaces/api'
import { Units, Measurements, defaultMeasurements } from '../utils/units'
import convert from '../utils/convert'

var {
  StyleSheet,
  AppState,
  TouchableHighlight,
  Text,
  View,
} = ReactNative

const now = () => +(new Date)
const ONE_MIN = 60
const FIVE_MIN = ONE_MIN * 5

interface ComponentProps {
  units: Units
  onPress: (values: Measurements) => void
}

export const CurrentConditions: React.FC<ComponentProps> = ({ units, onPress: propsOnPress }) => {
  const [conditions, setConditions] = useState<DarkSkyConditionsCurrently>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(0)

  useEffect(() => {
    fetchForecast()
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  async function fetchForecast() {
    if (now() < lastUpdate + FIVE_MIN) return

    setIsLoading(true)
    setError(null)

    try {
      const position = await getPosition()
      const currently = await fetchCurrentConditions(position.coords)

      setConditions(currently)
      setLastUpdate(now())
    } catch (error) {
      errorReporter.notify(error)
      setError(error.message || 'There was an error fetching forecast. Try again?')
    } finally {
      setIsLoading(false)
    }
  }

  function handleAppStateChange(appState: string) {
    if (appState === 'active') {
      fetchForecast()
    }
  }

  function getCurrentCondition(measurement: string) {
    if (!conditions) {
        return
    }

    const value = conditions[DARK_SKY.translations[measurement]]
    return Math.round(convert(value, defaultMeasurements[measurement], units[measurement]))
  }

  function getConditions() {
    return ['temperature', 'speed'].reduce((acc, name) => ({
      ...acc,
      [name]: {
        value: getCurrentCondition(name),
        unitName: units[name].name,
      },
    }), {})
  }

  // @ts-ignore
  function StyledText({ children }) {
    return (
      <Text style={styles.text} allowFontScaling={false}>
        {children}
      </Text>
    )
  }

  // @ts-ignore
  function Button({ onPress, children }) {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#334284"
        onPress={onPress}>
          {children}
      </TouchableHighlight>
    )
  }

  function renderConditions() {
    if (!conditions) {
      return null
    }

    // @ts-ignore
    let { temperature, speed } = getConditions()

    return (
      <Button onPress={() => propsOnPress({
        temperature: temperature.value,
        speed: speed.value
      })}>
        <StyledText>
          {[
            `${temperature.value}${temperature.unitName}`,
            DARK_SKY.icons[conditions.icon],
            `${speed.value}${speed.unitName}`,
          ].join(' ')}
        </StyledText>
      </Button>
    )
  }

  let children: JSX.Element | null = (
    <StyledText>
      Getting current conditions...
    </StyledText>
  )

  if (error) {
    children = (
      <Button onPress={fetchForecast}>
        <StyledText>{error}</StyledText>
      </Button>
    )
  }

  if (!isLoading && !error) {
    children = renderConditions()
  }

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
  buttonInner: {
    flexDirection: 'row',
  },
  spacer: {
    width: 20,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
})

export default CurrentConditions

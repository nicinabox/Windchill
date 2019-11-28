import React, { useEffect, useState } from 'react'
import ReactNative, { TextStyle } from 'react-native'
import errorReporter from 'src/utils/errorReporter'
import fetchCurrentConditions from 'src/utils/fetchCurrentConditions'
import getPosition from 'src/utils/getPosition'
import { DarkSkyConditionsCurrently } from 'src/interfaces/api'
import { Units, Measurements, defaultMeasurements } from 'src/utils/units'
import convert from 'src/utils/convert'
import { DARK_SKY_TRANSLATIONS, DARK_SKY_ICONS } from 'src/utils/darkSky'

const {
  StyleSheet,
  AppState,
  TouchableHighlight,
  Text,
  View,
} = ReactNative

const now = () => new Date().getTime()
const ONE_MIN = 60 * 1000
const FIVE_MIN = ONE_MIN * 5

interface ComponentProps {
  units: Units
  onPress: (values: Measurements) => void
}

interface StyledTextProps {
  style?: TextStyle
}

const StyledText: React.FC<StyledTextProps> = ({ children, style }) => {
  return (
    <Text style={[styles.text, style]} allowFontScaling={false}>
      {children}
    </Text>
  )
}

// @ts-ignore
const Button = ({ onPress, children }) => {
  return (
    <TouchableHighlight style={styles.button} underlayColor="#334284" onPress={onPress}>
        {children}
    </TouchableHighlight>
  )
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
      setError(error.message || 'There was an error getting the forecast.')
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

    const value = conditions[DARK_SKY_TRANSLATIONS[measurement]]
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
            `${temperature.value} ${temperature.unitName}`,
            DARK_SKY_ICONS[conditions.icon],
            `${speed.value} ${speed.unitName}`,
          ].join('  ')}
        </StyledText>
      </Button>
    )
  }

  let children

  if (error) {
    children = (
      <>
        <StyledText>{error}</StyledText>
        <Button onPress={fetchForecast}>
          <StyledText>Try again</StyledText>
        </Button>
      </>
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
    justifyContent: 'center',
    marginHorizontal: 15,
    minHeight: 80,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginVertical: 5,
    borderRadius: 30,
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
    textAlign: 'center',
  },
})

export default CurrentConditions

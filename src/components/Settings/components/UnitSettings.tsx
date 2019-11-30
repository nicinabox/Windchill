import React from 'react'
import ListRow from 'src/components/common/ListRow'
import ListSection from 'src/components/common/ListSection'
import ListSeparator from 'src/components/common/ListSeparator'
import { SettingsState } from 'src/reducers/settingsReducer'
import { speedUnits, temperatureUnits, Unit } from 'src/utils/units'

interface UnitSettingsProps {
  settings: SettingsState
  onChange: (measurement: 'speed' | 'temperature', unit: Unit) => void
}

export const UnitSettings: React.FC<UnitSettingsProps> = ({ settings, onChange }) => {
  function getTemperatureFooter() {
    return `Windchill is defined only for temperatures at or below ${settings.units.temperature.bounds.max} ${settings.units.temperature.name}.`
  }

  return (
    <React.Fragment>
      <ListSection header="SPEED UNITS">
        {speedUnits.map((unit, i) => {
          return (
            <React.Fragment key={unit.name}>
              {i > 0 && <ListSeparator />}
              <ListRow
                primaryText={unit.name}
                onPress={() => onChange('speed', unit)}
                checked={settings.units.speed.name === unit.name}
              />
            </React.Fragment>
          )
        })}
      </ListSection>

      <ListSection header="TEMPERATURE UNITS" footer={getTemperatureFooter()}>
        {temperatureUnits.map((unit, i) => {
          return (
            <React.Fragment key={unit.name}>
              {i > 0 && <ListSeparator />}
              <ListRow
                primaryText={unit.name}
                onPress={() => onChange('temperature', unit)}
                checked={settings.units.temperature.name === unit.name}
              />
            </React.Fragment>
          )
        })}
      </ListSection>
    </React.Fragment>
  )
}

export default UnitSettings

import React from 'react'
import ListRow from 'src/components/common/ListRow'
import ListSection from 'src/components/common/ListSection'
import { SettingsState } from 'src/reducers/settingsReducer'
import { speedUnits, temperatureUnits, Unit } from 'src/utils/units'

interface UnitSettingsProps {
  settings: SettingsState
  onChange: (measurement: 'speed' | 'temperature', unit: Unit) => void
}

export const UnitSettings: React.FC<UnitSettingsProps> = ({ settings, onChange }) => {
  return (
    <React.Fragment>
      <ListSection header="SPEED UNITS">
        {speedUnits.map((unit) => {
          return (
            <ListRow
              key={unit.name}
              primaryText={unit.name}
              onPress={() => onChange('speed', unit)}
              checked={settings.units.speed.name === unit.name}
            />
          )
        })}
      </ListSection>

      <ListSection header="TEMPERATURE UNITS">
        {temperatureUnits.map((unit) => {
          return (
            <ListRow
              key={unit.name}
              primaryText={unit.name}
              onPress={() => onChange('temperature', unit)}
              checked={settings.units.temperature.name === unit.name}
            />
          )
        })}
      </ListSection>
    </React.Fragment>
  )
}

export default UnitSettings

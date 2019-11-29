import convert from 'convert-units'
import { Unit } from './units'

export const UNIT_NAME_MAP: { [key: string]: string } = {
  mph: 'm/h',
  kph: 'km/h',
  mps: 'm/s',
  knots: 'knot',
}

export default (value: number, from: Unit, to: Unit) => {
  const fromUnitName = UNIT_NAME_MAP[from.name] || from.name
  const toUnitName = UNIT_NAME_MAP[to.name] || to.name

  return convert(value).from(fromUnitName).to(toUnitName)
}

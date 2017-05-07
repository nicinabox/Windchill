import React from 'react'
import App from './components/App'
import { getLocaleUnits } from './utils/unitSystem'
import { getItem } from './utils/storage'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let defaultSettings = {
      units: getLocaleUnits()
    }

    getItem('settings')
      .then((settings) => settings || defaultSettings)
      .then((settings) => {
        this.setState({ settings })
      })
  }

  render() {
    return this.state.settings ? <App {...this.state} /> : null
  }
}

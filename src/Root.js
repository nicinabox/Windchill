import React from 'react'
import App from './components/App'
import { getUnits } from './utils/unitSystem'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    getUnits().then((units) => {
      this.setState({ units })
    })
  }

  render() {
    return this.state.units ? <App {...this.state} /> : null
  }
}

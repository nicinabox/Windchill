import React, { Component } from 'react'
import App from './components/App'
import { Provider } from 'react-redux'
import { getItem } from './utils/storage'
import createStore from './store'

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    getItem('store')
      .then(state => {
        if (!state) {
          return {}
        }

        // unitSystem was replaced by units
        if (state.settings.unitSystem) {
          return {}
        }

        return state
      })
      .then((initialState) => {
        const store = createStore(initialState)
        this.setState({ store })
      })
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    ) : null
  }
}

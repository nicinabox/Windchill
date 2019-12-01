import { Client } from 'bugsnag-react-native'

const mockReporter = {
  notify(err) {
    console.trace(err)
  }
}

const client = __DEV__ ? mockReporter : new Client()

export default client

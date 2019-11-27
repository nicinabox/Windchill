import { APP_OPENED } from 'src/actions/analyticsActions'
import { AnyAction } from 'redux'

export interface AnalyticsState {
  opens: number
}

const initialState: AnalyticsState = {
  opens: 0
}

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case APP_OPENED:
      return {
        opens: state.opens + 1
      }

    default:
      return state
  }
}

import { authTypes } from '../types'

const initialState = {
  loggedIn: false,
  loading: false,
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        loading: true,
      }
    case authTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
      }
    case authTypes.LOGIN_FAILURE:
      return {
        loading: false,
      }
    case authTypes.IS_LOGGED:
      return {
        loggedIn: true,
        loading: false,
      }
    case authTypes.LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

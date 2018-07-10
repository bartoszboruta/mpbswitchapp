import { authTypes } from '../types'
import { authService } from '../services'
import { AsyncStorage } from 'react-native'

const login = (email, password) => {
  return dispatch => {
    dispatch({ type: authTypes.LOGIN_REQUEST, payload: email })

    authService.login(email, password).then(
      auth => {
        if (!auth.success) {
          dispatch({ type: authTypes.LOGIN_FAILURE, payload: auth })
          return
        }
        dispatch({ type: authTypes.LOGIN_SUCCESS, payload: auth })
      },
      error => {
        dispatch({ type: authTypes.LOGIN_FAILURE, payload: auth })
      },
    )
  }
}

const logout = () => {
  authService.logout()
  return { type: authTypes.LOGOUT }
}

const isLogged = () => {
  return dispatch => {
    AsyncStorage.getItem('auth').then(auth => {
      auth = JSON.parse(auth)
      if (auth && auth.token && auth.expiresIn > new Date().getTime() / 1000) {
        dispatch({ type: authTypes.IS_LOGGED })
      } else {
        dispatch({ type: authTypes.LOGIN_FAILURE })
      }
    })
  }
}

export const authActions = {
  login,
  logout,
  isLogged,
}

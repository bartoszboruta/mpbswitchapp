import { deviceTypes, authTypes } from '../types'
import { deviceService } from '../services'

const select = deviceId => {
  return dispatch => {
    dispatch({ type: deviceTypes.SELECT, payload: deviceId })
  }
}

const add = fields => {
  return dispatch => {
    dispatch({ type: deviceTypes.ADD_REQUEST })

    deviceService.add(fields).then(
      device => {
        if (!device.error) {
          dispatch({ type: deviceTypes.ADD_SUCCESS, payload: device })
        }
      },
      error => {
        dispatch({ type: deviceTypes.ADD_FAILURE })
      },
    )
  }
}

const index = () => {
  return dispatch => {
    dispatch({ type: deviceTypes.INDEX_REQUEST })

    deviceService.index().then(
      devices => {
        if (devices.error) {
          dispatch(failure())
          if (devices.errorStatus === 401) {
            dispatch({ type: authTypes.LOGOUT })
          }
          return
        }
        dispatch({ type: deviceTypes.INDEX_SUCCESS, payload: devices })
        dispatch({ type: deviceTypes.REFILTER })
      },
      error => {
        dispatch({ type: deviceTypes.INDEX_FAILURE })
      },
    )
  }
}

const updateStatus = (device, status) => {
  return dispatch => {
    dispatch({ type: deviceTypes.UPDATE_STATUS_REQUEST })

    deviceService.updateStatus(device, status).then(
      status => {
        if (!device.error) {
          dispatch({ type: deviceTypes.UPDATE_STATUS_SUCCESS, payload: { device, status } })
          dispatch({ type: deviceTypes.REFILTER })
        }
      },
      error => {
        dispatch({ type: deviceTypes.UPDATE_STATUS_FAILURE })
      },
    )
  }
}

const updateData = device => {
  return dispatch => {
    dispatch({ type: deviceTypes.UPDATE_DATA_REQUEST })

    deviceService.updateData(device).then(
      device => {
        if (!device.error) {
          dispatch({ type: deviceTypes.UPDATE_DATA_SUCCESS, payload: { device } })
          dispatch({ type: deviceTypes.REFILTER })
        }
      },
      error => {
        dispatch({ type: deviceTypes.UPDATE_DATA_FAILURE })
      },
    )
  }
}

const removeDevice = device => {
  return dispatch => {
    dispatch({ type: deviceTypes.REMOVE_REQUEST })

    deviceService.removeDevice(device).then(
      () => {
        dispatch({ type: deviceTypes.REMOVE_SUCCESS, payload: { device } })
      },
      error => {
        dispatch({ type: deviceTypes.REMOVE_FAILURE })
      },
    )
  }
}

const filter = query => {
  return dispatch => {
    dispatch({ type: deviceTypes.FILTER, payload: query })
  }
}

export const deviceActions = {
  add,
  index,
  filter,
  select,
  updateStatus,
  updateData,
  removeDevice,
}

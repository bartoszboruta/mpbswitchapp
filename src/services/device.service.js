import { AsyncStorage } from 'react-native'
import { MBP_SWITCH_API_URL } from '../../config'

export const deviceService = {
  index,
  add,
  updateData,
  updateStatus,
  removeDevice,
}

async function updateData(device) {
  let auth = await AsyncStorage.getItem('auth')
  if (!auth) {
    return {
      error: true,
      errorMessage: 'Unauthorized',
      errorStatus: 401,
    }
  }

  auth = JSON.parse(auth)

  const token = auth.token
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

    body: JSON.stringify({
      name: device.name,
    }),
  }

  return fetch(MBP_SWITCH_API_URL + '/api/v1/device/' + device._id, requestOptions)
    .then(response => {
      if (!response.ok) {
        return {
          error: true,
          errorMessage: response._bodyText,
          errorStatus: response.status,
        }
      }

      return response.json()
    })
    .then(devices => {
      return devices
    })
    .catch(error => {})
}

async function add(fields) {
  let auth = await AsyncStorage.getItem('auth')
  if (!auth) {
    return {
      error: true,
      errorMessage: 'Unauthorized',
      errorStatus: 401,
    }
  }

  auth = JSON.parse(auth)

  const token = auth.token
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name: fields.name,
      password: fields.password,
      serial: fields.serial,
    }),
  }

  return fetch(MBP_SWITCH_API_URL + '/api/v1/device/', requestOptions)
    .then(response => {
      if (!response.ok) {
        return {
          error: true,
          errorMessage: response._bodyText,
          errorStatus: response.status,
        }
      }

      return response.json()
    })
    .then(devices => {
      return devices
    })
    .catch(error => {})
}

async function removeDevice(device) {
  let auth = await AsyncStorage.getItem('auth')
  if (!auth) {
    return {
      error: true,
      errorMessage: 'Unauthorized',
      errorStatus: 401,
    }
  }

  auth = JSON.parse(auth)

  const token = auth.token
  const requestOptions = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  return fetch(MBP_SWITCH_API_URL + '/api/v1/device/' + device._id, requestOptions)
    .then(response => {
      if (!response.ok) {
        return {
          error: true,
          errorMessage: response._bodyText,
          errorStatus: response.status,
        }
      }

      return response.json()
    })
    .then(() => {
      return {}
    })
    .catch(error => {})
}

async function index() {
  let auth = await AsyncStorage.getItem('auth')
  if (!auth) {
    return {
      error: true,
      errorMessage: 'Unauthorized',
      errorStatus: 401,
    }
  }
  auth = JSON.parse(auth)

  const token = auth.token
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }
  return fetch(MBP_SWITCH_API_URL + '/api/v1/device/', requestOptions)
    .then(response => {
      if (!response.ok) {
        return {
          error: true,
          errorMessage: response._bodyText,
          errorStatus: response.status,
        }
      }

      return response.json()
    })
    .then(devices => {
      return devices
    })
    .catch(error => {})
}

async function updateStatus(device, status) {
  let auth = await AsyncStorage.getItem('auth')
  if (!auth) {
    return {
      error: true,
      errorMessage: 'Unauthorized',
      errorStatus: 401,
    }
  }

  auth = JSON.parse(auth)

  const token = auth.token
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      data: status,
      deviceId: device._id,
    }),
  }

  return fetch(MBP_SWITCH_API_URL + '/api/v1/status/', requestOptions)
    .then(response => {
      if (!response.ok) {
        return {
          error: true,
          errorMessage: response._bodyText,
          errorStatus: response.status,
        }
      }

      return response.json()
    })
    .then(device => {
      return device
    })
    .catch(error => {})
}

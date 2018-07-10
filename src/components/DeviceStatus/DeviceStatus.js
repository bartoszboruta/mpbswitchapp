import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'

class DeviceStatus extends React.Component {
  getStatusColor = status => (status === '0' ? '#696969' : '#5BC088')

  render() {
    return (
      <Ionicons
        name="ios-power"
        style={StyleSheet.flatten([
          styles.statusIcon,
          { color: this.getStatusColor(this.props.status) },
        ])}
      />
    )
  }
}

const styles = StyleSheet.create({
  statusIcon: {
    fontSize: 66,
    height: 66,
  },
})

export { DeviceStatus }

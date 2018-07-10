import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from 'react-native-vector-icons'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { deviceActions } from '../../actions'
import { bindActionCreators } from 'redux'

class Device extends React.Component {
  state = {
    device: {
      status: {},
    },
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#004881',
    },
    headerTitleStyle: {
      color: 'white',
    },
    title: 'Device',
    headerLeft: (
      <Ionicons
        style={{ marginLeft: 15 }}
        size={25}
        name="md-arrow-back"
        onPress={() => {
          navigation.goBack(null)
        }}
      />
    ),
  })

  componentDidMount() {
    this.setState({
      device: this.props.device.selected,
    })
  }

  onNameChangeHandler(e) {
    this.setState({
      device: {
        ...this.state.device,
        name: e,
      },
    })
  }

  handleSubmit() {
    this.props.updateData(this.state.device)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput
          underlineColorAndroid="#cccccc"
          name="name"
          returnKeyType="next"
          onChangeText={this.onNameChangeHandler.bind(this)}
          value={this.state.device.name}
        />
        <Button buttonStyle={styles.button} onPress={this.handleSubmit.bind(this)} title="SUBMIT" />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#2e353e',
  },
})

const mapStateToProps = state => {
  const { device } = state
  return {
    device,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateData: deviceActions.updateData,
    },
    dispatch,
  )

const connectedDevicePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Device)
export { connectedDevicePage as Device }

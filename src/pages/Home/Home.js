import React from 'react'
import { AsyncStorage, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import Logo from '../../components/Logo/Logo'

class Home extends React.Component {
  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Logo />

        <View>
          <Button buttonStyle={styles.button} onPress={() => navigate('Login')} title="Login" />
          <Button
            buttonStyle={styles.button}
            onPress={() => navigate('Register')}
            title="Register"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e353e',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
  },
})

const mapStateToProps = state => {
  const {} = state
  return {}
}

const connectedHomePage = connect(mapStateToProps)(Home)
export { connectedHomePage as Home }

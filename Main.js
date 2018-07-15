import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import { View } from 'react-native'

import { createRootNavigator } from './src/utils'
import { authActions } from './src/actions'

class Main extends React.Component {
  componentWillMount() {
    this.props.dispatch(authActions.isLogged())
  }

  render() {
    const Layout = createRootNavigator(this.props.auth.loggedIn)
    return (
      <View style={{ flex: 1 }}>
        <Layout />
        <FlashMessage position="top" />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return {
    auth,
  }
}

const ConnectedApp = connect(mapStateToProps)(Main)
export { ConnectedApp as Main }

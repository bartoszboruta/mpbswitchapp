import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { authActions, userActions } from '../../actions'
import { Ionicons } from 'react-native-vector-icons'
import { bindActionCreators } from 'redux'

class Profile extends React.Component {
  state = {
    avatarUrl: 'http://api.adorable.io/avatar/default',
  }

  componentWillMount() {
    this.props.show()
  }

  componentDidMount() {
    this.setAvatarUrl()
  }

  handleLogout() {
    this.props.logout()
  }

  setAvatarUrl() {
    this.setState({
      avatarUrl: 'http://api.adorable.io/avatar/' + this.props.user.email,
    })
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.action}>
          <TouchableOpacity
            style={styles.actionItemContainer}
            onPress={this.handleLogout.bind(this)}
          >
            <Ionicons name="md-log-out" style={styles.actionItem} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItemContainer} onPress={() => navigate('EditUser')}>
            <Ionicons name="ios-settings" style={styles.actionItem} />
          </TouchableOpacity>
        </View>
        <View style={styles.summary}>
          <Image style={styles.avatar} source={{ uri: this.state.avatarUrl }} />
          <Text style={styles.name}>{this.props.user.name}</Text>
          <Text style={styles.email}>{this.props.user.email}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e353e',
  },
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 175,
    height: 175,
    borderRadius: 100,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  email: {
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  actionItemContainer: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionItem: {
    fontSize: 50,
    height: 50,
    color: 'white',
  },
})

const mapStateToProps = state => {
  const { user } = state
  return {
    user,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: authActions.logout,
      show: userActions.show,
    },
    dispatch,
  )

const connectedProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
export { connectedProfilePage as Profile }

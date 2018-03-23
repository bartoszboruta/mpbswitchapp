import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { userActions} from "../../actions";
import { bindActionCreators } from "redux";

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#004881',
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: 'Edit user',
        headerLeft: <Ionicons style={{marginLeft: 15}} size={25} name='md-arrow-back' onPress={ () => {navigation.goBack(null)} }  />,
    });

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    onNameChangeHandler(e) {
        this.setState({
            user: {
                ...this.state.user,
                name: e
            }
        });
    }

    onEmailChangeHandler(e) {
        this.setState({
            user: {
                ...this.state.user,
                email: e
            }
        });
    }

    handleSubmit() {
        this.props.edit(this.state.user);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    underlineColorAndroid="#cccccc"
                    name="name"
                    returnKeyType="next"
                    onChangeText={this.onNameChangeHandler.bind(this)}
                    value={this.state.user.name}
                />
                <FormLabel>Email</FormLabel>
                <FormInput
                    underlineColorAndroid="#cccccc"
                    name="email"
                    returnKeyType="next"
                    onChangeText={this.onEmailChangeHandler.bind(this)}
                    value={this.state.user.email}
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    title="SUBMIT"
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
    }
});

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    edit: userActions.edit,
}, dispatch);

const connectedEditUserPage = connect(mapStateToProps, mapDispatchToProps)(EditUser);
export { connectedEditUserPage as EditUser }
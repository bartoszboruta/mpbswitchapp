import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { userActions } from "../../actions";
import { Ionicons } from 'react-native-vector-icons';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#004881',
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: 'Register',
        headerLeft: <Ionicons style={{marginLeft: 15}} size={25} name='md-arrow-back' onPress={ () => {navigation.goBack(null)} }  />,
    });

    handleNameChange(e) {
        this.setState({ name: e });
    }

    handleEmailChange(e) {
        this.setState({ email: e });
    }

    handlePasswordChange(e) {
        this.setState({ password: e });
    }

    handleSubmit() {
        const formValues = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };

        if (formValues) {
            this.props.dispatch(userActions.add(formValues));
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput
                    underlineColorAndroid="#cccccc"
                    inputStyle={styles.button}
                    name="email"
                    onChangeText={this.handleEmailChange.bind(this)}
                />
                <FormLabel>Name</FormLabel>
                <FormInput
                    underlineColorAndroid="#cccccc"
                    name="name"
                    returnKeyType="next"
                    onChangeText={this.handleNameChange.bind(this)}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    underlineColorAndroid="#cccccc"
                    inputStyle={styles.button}
                    name="password"
                    onChangeText={this.handlePasswordChange.bind(this)}
                    secureTextEntry
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    title="Register"
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user
    };
};

const connectedRegisterPage = connect(mapStateToProps)(Register);
export { connectedRegisterPage as Register }
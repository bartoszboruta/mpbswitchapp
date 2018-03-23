import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import { emailValidate } from '../../utils';
import { bindActionCreators } from 'redux';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: false,
            password: '',
            submitted: false
        };
    }

    handleEmailEndEditing(e) {
        if (!emailValidate(e.nativeEvent.text)) {
            this.setState({
                error: true,
                errorMessage: 'Email not valid'
            })
        }
    }

    handleEmailChange(e) {
        this.setState({ email: e });
    }

    handlePasswordChange(e) {
        this.setState({ password: e });
    }

    handleSubmit(e) {
        const { email, password } = this.state;

        if (!emailValidate(email)) {
            let errorMessage = 'Email not valid'
            this.setState({
                error: true,
                errorMessage: errorMessage
            });
            alert(errorMessage);
            return;
        }

        if (!password) {
            let errorMessage = 'Password is required';
            this.setState({
                error: true,
                errorMessage: errorMessage
            });
            alert(errorMessage);
            return;
        }

        this.setState({
            error: false,
            errorMessage: '',
            submitted: true
        });

        if (email && password) {
            this.props.login(email, password);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>

                <View>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        underlineColorAndroid='#cccccc'
                        name='email'
                        onEndEditing={this.handleEmailEndEditing.bind(this)}
                        onChangeText={this.handleEmailChange.bind(this)}
                        returnKeyType='next'
                    />

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        underlineColorAndroid='#cccccc'
                        inputStyle={styles.button}
                        name='password'
                        onChangeText={this.handlePasswordChange.bind(this)}
                        secureTextEntry
                    />

                    <Button
                        buttonStyle={styles.button}
                        onPress={this.handleSubmit.bind(this)}
                        title='SUBMIT'
                    />
                </View>
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
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login: authActions.login,
}, dispatch);

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLoginPage as Login }
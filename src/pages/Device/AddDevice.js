import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {deviceActions} from "../../actions";
import { Ionicons } from 'react-native-vector-icons';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class AddDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            serial: '',
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
        title: 'Add device',
        headerLeft: <Ionicons style={{marginLeft: 15}} size={25} name='md-arrow-back' onPress={ () => {navigation.goBack(null)} }  />,
    });

    handleNameChange(e) {
        this.setState({ name: e });
    }

    handleSerialChange(e) {
        this.setState({ serial: e });
    }

    handlePasswordChange(e) {
        this.setState({ password: e });
    }

    handleSubmit() {
        let formValues = {
            name: this.state.name,
            serial: this.state.serial,
            password: this.state.password,
        };

        if (formValues) {
            this.props.dispatch(deviceActions.add(formValues));
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <FormLabel>Name</FormLabel>
                <FormInput
                    name="name"
                    returnKeyType="next"
                    onChangeText={this.handleNameChange.bind(this)}
                />
                <FormLabel>Serial</FormLabel>
                <FormInput
                    inputStyle={styles.button}
                    name="serial"
                    onChangeText={this.handleSerialChange.bind(this)}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    inputStyle={styles.button}
                    name="password"
                    onChangeText={this.handlePasswordChange.bind(this)}
                    secureTextEntry
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    title="Add device"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
    }
});

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const connectedAddDevicePage = connect(mapStateToProps)(AddDevice);
export { connectedAddDevicePage as AddDevice }
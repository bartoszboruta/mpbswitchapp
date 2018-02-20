import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { deviceActions } from "../../actions/index";
import { Ionicons } from 'react-native-vector-icons';
import { FormLabel, FormInput, Button } from 'react-native-elements';

class DeviceGroup extends React.Component {
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

    handleColorChange(e) {
        this.setState({ color: e });
    }

    handleSubmit() {
        let formValues = {
            name: this.state.name,
            color: this.state.color,
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
                <FormLabel>Color</FormLabel>
                <FormInput
                    inputStyle={styles.button}
                    name="color"
                    onChangeText={this.handleColorChange.bind(this)}
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    title="Add group"
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

const connectedDeviceGroup = connect(mapStateToProps)(DeviceGroup);
export { connectedDeviceGroup as DeviceGroup }
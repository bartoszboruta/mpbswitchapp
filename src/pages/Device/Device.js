import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import { deviceActions } from "../../actions";

class Device extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#004881',
        },
        headerTitleStyle: {
            color: 'white'
        },
        title: 'Device',
        headerLeft: <Ionicons style={{marginLeft: 15}} size={25} name='md-arrow-back' onPress={ () => {navigation.goBack(null)} }  />,
    });

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <Text>Register</Text>
                <Text>Register</Text>
            </ScrollView>
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
    const { device } = state;
    return {
        device
    };
}

const connectedDevicePage = connect(mapStateToProps)(Device);
export { connectedDevicePage as Device }
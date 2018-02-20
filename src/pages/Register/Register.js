import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

class Register extends React.Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
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
    const { user, authentication } = state;
    return {
        user
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Register);
export { connectedRegisterPage as Register }
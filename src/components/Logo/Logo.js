import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../../../assets/images/react-logo.png'

export default class Logo extends React.Component {
    render() {
        return (
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        height: 100,
        resizeMode: 'contain',
        width: 100,
    },
});
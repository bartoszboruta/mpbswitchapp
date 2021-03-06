import React from 'react';
import {StyleSheet} from "react-native";
import { Ionicons } from 'react-native-vector-icons';

class DeviceStatus extends React.Component {
    static getStatusColor(status) {
        return status === "0" ? "#696969" : "#5BC088";
    }

    render() {
        return <Ionicons
            name="ios-power"
            style={ StyleSheet.flatten([styles.statusIcon, { color: DeviceStatus.getStatusColor(this.props.status) }]) }
        />
    }
}

const styles = StyleSheet.create({
    statusIcon: {
        fontSize: 66,
        height: 66,
    },
});

export { DeviceStatus }

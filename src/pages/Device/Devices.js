import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import ActionButton from 'react-native-action-button';
import { deviceActions } from "../../actions";
import { Filter } from "./Filter";

class Devices extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(deviceActions.filter());
    }

    getDevices() {
        this.props.dispatch(deviceActions.index());
    }

    componentWillMount() {
        this.getDevices();
    }

    onRefreshClickHandler() {
        this.getDevices();
    }

    onRefreshHandler() {
        this.getDevices();
    }

    onStatusUpdateClickHandler(device) {
        const status = device.status.data === "0" ? "1" : "0";
        this.props.dispatch(deviceActions.updateStatus(device, status));
    }

    getStatusColor(status) {
        if (this.props.device.loading) {
            // return '#fafad2';
        }

        return status === "0" ? "#696969" : "#5BC088";
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Filter />
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.props.device.loading}
                        onRefresh={ this.onRefreshHandler.bind(this) }
                    />
                }>
                    <View style={styles.list}>
                        {
                            this.props.device.devices.map((device, key) => {
                                return (
                                    <TouchableOpacity
                                        key={key}
                                        style={styles.item}
                                        onPress={ this.onStatusUpdateClickHandler.bind(this, device) }
e                                       onLongPress ={() => {
                                            this.props.dispatch(deviceActions.select(device._id));
                                            navigate('Device', { device: device._id })
                                        }}
                                    >
                                        <Ionicons
                                            name="ios-power"
                                            style={ StyleSheet.flatten([styles.statusIcon, { color: this.getStatusColor(device.status.data) }]) }
                                        />
                                        <Text style={ styles.deviceName } >
                                            {
                                                device.name
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title="Refresh" onPress={ this.onRefreshClickHandler.bind(this) }>
                        <Ionicons name="ios-refresh" style={ styles.actionButtonIcon }/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Switch all" onPress={() => {}}>
                        <Ionicons name="ios-power" style={ styles.actionButtonIcon }/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Add device" onPress={() => {navigate('AddDevices')}}>
                        <Ionicons name="ios-add" style={ styles.actionButtonIcon }/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 25,
        height: 25,
        color: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
    },
    deviceName: {
        color: '#ffffff',
        marginTop: 10
    },
    item: {
        width: '48%',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        marginBottom: 16
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        justifyContent: 'space-between'
    },
    statusIcon: {
        fontSize: 66,
        height: 66,
    },
});

function mapStateToProps(state) {
    const { user, device } = state;
    return {
        user,
        device
    };
}

const connectedDevicesPage = connect(mapStateToProps)(Devices);
export { connectedDevicesPage as Devices }
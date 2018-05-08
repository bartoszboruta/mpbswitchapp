import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import ActionButton from 'react-native-action-button';
import { deviceActions } from '../../actions';
import { Filter } from './Filter';
import { DeviceStatus } from '../../components/DeviceStatus';
import { bindActionCreators } from 'redux';

class Devices extends React.Component {
    constructor(props) {
        super(props);
    }

    getDevices() {
        this.props.index();
    }

    componentDidMount() {
        this.getDevices();
    }

    onRefreshClickHandler() {
        this.getDevices();
    }

    onRefreshHandler() {
        this.getDevices();
    }

    onStatusUpdateClickHandler(device) {
        const status = device.status.data === '0' ? '1' : '0';
        this.props.updateStatus(device, status);
    }

    devices() {
        const { navigate } = this.props.navigation;

        return this.props.device.filteredDevices.map((device, key) => {
            return (
                <TouchableOpacity
                    key={key}
                    style={styles.item}
                    onPress={ () => this.onStatusUpdateClickHandler(device) }
                    onLongPress ={() => {
                        this.props.select(device._id);
                        navigate('Device', { device: device._id })
                    }}
                >
                    {
                        <DeviceStatus status={device.status.data} />
                    }

                    <Text style={ styles.deviceName } >
                        {
                            device.name
                        }
                    </Text>
                </TouchableOpacity>
            )
        })
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
                            this.devices()
                        }
                    </View>
                </ScrollView>
                <ActionButton buttonColor='rgba(231,76,60,1)'>
                    <ActionButton.Item buttonColor='#1abc9c' title='Refresh' onPress={ this.onRefreshClickHandler.bind(this) }>
                        <Ionicons name='ios-refresh' style={ styles.actionButtonIcon }/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#0085c2' title='Add device' onPress={() => {navigate('AddDevices')}}>
                        <Ionicons name='ios-add' style={ styles.actionButtonIcon }/>
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
        borderRadius: 5,
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

const mapStateToProps = (state) => {
    const { user, device } = state;
    return {
        user,
        device
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    index: deviceActions.index,
    updateStatus: deviceActions.updateStatus,
    select: deviceActions.select,
}, dispatch);

const connectedDevicesPage = connect(mapStateToProps, mapDispatchToProps)(Devices);
export { connectedDevicesPage as Devices }
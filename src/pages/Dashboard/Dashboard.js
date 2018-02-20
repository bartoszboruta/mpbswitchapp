import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>
                        Dashboard
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 25,
        height: 25,
        color: 'white',
    },
    stateIcon: {
        fontSize: 66,
        height: 66,
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        justifyContent: 'space-between'
    },
    item: {
        width: '48%',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        marginBottom: 16
    }
});

function mapStateToProps(state) {
    const { device } = state;
    return {
        device
    };
}

const connectedDashboardPage = connect(mapStateToProps)(Dashboard);
export { connectedDashboardPage as Dashboard }
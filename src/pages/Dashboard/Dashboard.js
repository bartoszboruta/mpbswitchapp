import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';
import { dashboardActions } from "../../actions";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    getDashboardSummary() {
        this.props.dispatch(dashboardActions.get());
    }

    componentDidMount() {
        this.getDashboardSummary();
    }

    onRefreshHandler() {
        this.props.dispatch(dashboardActions.get());
    }

    render() {
        const { navigate } = this.props.navigation;
        return null;
        return (
            <View style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.props.summary.loading}
                                onRefresh={ this.onRefreshHandler.bind(this) }
                    />
                }>
                    {
                        this.props.summary.data.map((summary, key) => {
                            return <TouchableOpacity
                                    key={key}
                                    style={ StyleSheet.flatten([styles.card, { backgroundColor: summary.backgroundColor }]) }
                                >
                                    <View tyle={styles.iconContainer}>
                                        <Ionicons
                                            name={ summary.icon }
                                            style={ styles.icon }
                                        />
                                    </View>
                                </TouchableOpacity>
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e353e',
    },
    card: {
        flexDirection: 'column',
        flex: 1,
        elevation: 5,
        padding: 5,
        borderRadius: 5,
        height: Dimensions.get('window').height * 0.2,
        marginBottom: 5,
        marginTop: 5,
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: Dimensions.get('window').height * 0.15,
        color: '#ffffff'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').height * 0.2,
    }
});

const mapStateToProps = (state) => {
    const { device, summary } = state;
    return {
        device,
        summary
    };
}

const connectedDashboardPage = connect(mapStateToProps)(Dashboard);
export { connectedDashboardPage as Dashboard }

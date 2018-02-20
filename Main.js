import React from 'react';
import { connect } from 'react-redux';
import { createRootNavigator } from './src/utils';
import { authActions } from "./src/actions";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(authActions.isLogged());
    }

    render() {
        const Layout = createRootNavigator(this.props.auth.loggedIn);
        return <Layout />
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    }
}

const ConnectedApp = connect(mapStateToProps)(Main);
export { ConnectedApp as Main }


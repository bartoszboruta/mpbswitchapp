import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { deviceActions } from "../../actions";

class Filter extends Component {
    handleChange(e) {
        this.props.dispatch(deviceActions.filter(e));
    }

    render() {
        return (
            <SearchBar
                onChangeText={this.handleChange.bind(this)}
            />
        );
    }
}

const connectedFilter = connect()(Filter);
export { connectedFilter as Filter }

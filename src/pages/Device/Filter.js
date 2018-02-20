import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormInput } from 'react-native-elements';
import { deviceActions } from "../../actions";

class Filter extends Component {
    handleChange(e) {
        this.props.dispatch(deviceActions.filter(e));
    }

    render() {
        return (
            <FormInput
                onChangeText={this.handleChange.bind(this)}
            />
        );
    }
}

const connectedFilter = connect()(Filter);
export { connectedFilter as Filter }

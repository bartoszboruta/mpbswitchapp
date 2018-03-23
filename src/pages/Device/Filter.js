import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { deviceActions } from "../../actions";
import { bindActionCreators } from "redux";

class Filter extends Component {
    handleChange(e) {
        this.props.filter(e);
    }

    render() {
        return (
            <SearchBar
                onChangeText={this.handleChange.bind(this)}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    filter: deviceActions.filter
}, dispatch);

const connectedFilter = connect(null, mapDispatchToProps)(Filter);
export { connectedFilter as Filter }

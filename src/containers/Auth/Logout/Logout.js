import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from '../../../redux-store/actions/actionCreators';

class Logout extends Component {
    render() {
        return <Redirect to="/" />;
    }

    componentDidMount() {
        this.props.onLogout();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);

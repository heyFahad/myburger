import React, { Component } from 'react';
import { connect } from "react-redux";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import cssClasses from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState(
            (prevState) => {
                return {
                    showSideDrawer: !prevState.showSideDrawer
                };
            }
        );
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggleSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    showSideDrawer={this.state.showSideDrawer}
                    clicked={this.sideDrawerToggleHandler} />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);

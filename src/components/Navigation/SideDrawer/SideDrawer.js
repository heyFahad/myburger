import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.css';

const SideDrawer = (props) => {
    const attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if (props.showSideDrawer) {
        attachedClasses[1] = cssClasses.Open;
    }

    return (
        <React.Fragment>
            <Backdrop
                show={props.showSideDrawer}
                backdropClicked={props.clicked} />
            <div className={attachedClasses.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;

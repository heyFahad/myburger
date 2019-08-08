import React from 'react'
import Logo from '../../Logo/Logo';
import cssClasses from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={cssClasses.Toolbar}>
            <DrawerToggle toggle={props.toggleSideDrawer} />
            <div className={cssClasses.Logo}>
                <Logo />
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;

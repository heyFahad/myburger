import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import cssClasses from './NavigationItems.css';

const NavigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        </ul>
    );
}

export default NavigationItems;

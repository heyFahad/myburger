import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import cssClasses from './NavigationItems.css';

const NavigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            <NavigationItem link="/orders">
                My Orders
            </NavigationItem>
        </ul>
    );
}

export default NavigationItems;

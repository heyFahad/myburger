import React from 'react';
import cssClasses from './NavigationItem.css';

const NavigationItem = (props) => {
    return (
        <li className={cssClasses.NavigationItem}>
            <a
                href={props.link}
                className={props.active ? cssClasses.active : null}>
                {props.children}
            </a>
        </li>
    );
}

export default NavigationItem;

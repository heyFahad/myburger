import React from 'react';
import cssClasses from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={cssClasses.Logo}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
}

export default Logo;

import React from 'react';
import cssClasses from './Button.css';

const Button = (props) => {
    return (
        <button
            className={[cssClasses.Button, cssClasses[props.btnType]].join(' ')}
            onClick={props.btnClicked}>{props.children}
        </button>
    );
}

export default Button;

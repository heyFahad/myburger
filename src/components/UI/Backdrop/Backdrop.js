import React from 'react';
import cssClasses from './Backdrop.css';

const Backdrop = (props) => {
    return (
        props.show ? <div className={cssClasses.Backdrop} onClick={props.backdropClicked}></div> : null
    );
}

export default Backdrop;

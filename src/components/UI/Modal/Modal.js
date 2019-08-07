import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import cssClasses from './Modal.css';

const Modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} backdropClicked={props.cancelOrder}/>
        <div
            className={cssClasses.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </React.Fragment>
)

export default Modal;

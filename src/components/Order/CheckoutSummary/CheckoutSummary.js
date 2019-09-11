import React from 'react';
import { connect } from 'react-redux';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={cssClasses.CheckoutSummary}>
            <h1>We hope this tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ings} />
            </div>
            <Button
                btnType="Danger"
                btnClicked={props.checkoutCancelled}>
                CANCEL
            </Button>
            <Button
                btnType="Success"
                btnClicked={props.checkoutContinued}>
                CONTINUE
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    };
}

export default connect(mapStateToProps)(CheckoutSummary);

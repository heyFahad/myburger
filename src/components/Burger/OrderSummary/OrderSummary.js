import React from 'react'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingredientKey, index) => {
            return (
                <li key={index}>
                    <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
                </li>
            )
        });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" btnClicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" btnClicked={props.continueOrder}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default OrderSummary;

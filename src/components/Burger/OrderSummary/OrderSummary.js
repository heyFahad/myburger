import React from 'react'

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
            <p>Continue to Checkout?</p>
        </React.Fragment>
    );
}

export default OrderSummary;

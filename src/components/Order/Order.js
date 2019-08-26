import React from 'react';
import cssClasses from './Order.css';

const Order = (props) => {
    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Total Price: <strong>USD 5.45</strong></p>
        </div>
    );
}

export default Order;

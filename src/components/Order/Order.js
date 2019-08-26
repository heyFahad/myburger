import React from 'react';
import cssClasses from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientsOutput = ingredients.map(ingredientKey => {
        return (
            <span key={ingredientKey.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '5px',
                    border: '1px solid #CCC'
                }}>
                {ingredientKey.name} ({ingredientKey.amount})
            </span>
        );
    });

    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Total Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default Order;

import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import cssClasses from './BuildControls.css';

const CONTROLS = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => {
    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                CONTROLS.map((ctrl, index) => {
                    return (
                        <BuildControl
                            key={index}
                            label={ctrl.label}
                            type={ctrl.type}
                            disabled={props.disabled[ctrl.type]}
                            added={() => props.ingredientAdded(ctrl.type)}
                            removed={() => props.ingredientRemoved(ctrl.type)} />
                    );
                })
            }
            <button
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}
                onClick={props.orderNow}>
                ORDER NOW
            </button>
        </div>
    );
}

export default BuildControls;

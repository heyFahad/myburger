import React from 'react';
import PropTypes from 'prop-types';
import cssClasses from './BurgerIngredient.css';

const BurgerIngredient = (props) => {
    let ingredients = null;

    switch (props.type) {
        case 'bread-bottom':
            ingredients = <div className={cssClasses.BreadBottom}></div>;
            break;
        
        case 'bread-top':
                ingredients = (
                    <div className={cssClasses.BreadTop}>
                        <div className={cssClasses.Seeds1}></div>
                        <div className={cssClasses.Seeds1}></div>
                    </div>
                );
                break;
        
        case 'meat':
                ingredients = <div className={cssClasses.Meat}></div>;
                break;
        
        case 'cheese':
                ingredients = <div className={cssClasses.Cheese}></div>;
                break;
        
        case 'salad':
                ingredients = <div className={cssClasses.Salad}></div>;
                break;
        
        case 'bacon':
                ingredients = <div className={cssClasses.Bacon}></div>;
                break;
        
        default:
            break;
    }

    return ingredients;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;

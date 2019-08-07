import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import cssClasses from './Burger.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
                .map((whateverNameOfArrayElement, indexOfArrayElement) => {
                    return <BurgerIngredient
                        key={ingredientKey + indexOfArrayElement}
                        type={ingredientKey} />;
                });
        })
        .reduce(
            (accumulatorArray, currentElement) => {
                return accumulatorArray.concat(currentElement);
            },
            []
        );

    // Check if user has added some ingredients for burger. If not, then display a proper message
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding some ingredients!</p>
    }

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;

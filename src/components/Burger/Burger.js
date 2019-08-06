import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import cssClasses from './Burger.css';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
                .map((whateverNameOfArrayElement, indexOfArrayElement) => {
                    return <BurgerIngredient
                        key={ingredientKey + indexOfArrayElement}
                        type={ingredientKey} />;
                });
        });

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;

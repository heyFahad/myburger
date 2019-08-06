import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import cssClasses from './Burger.css';

const Burger = (props) => {
    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/>
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;

import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.9,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state ={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5
    }

    addIngredientHandler = (type) => {
        // update the ingredient count first for the added ingredient
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        // then add the additional price for this ingredient in total price of burger
        const additionalPrice = INGREDIENT_PRICES[type];

        // finally update the original state to reflect changes
        this.setState((prevState, currentProps) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + additionalPrice
            };
        });
    }

    removeIngredientHandler = (type) => {
        // update the ingredient count first for the added ingredient
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0) {
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedIngredientCount;

        // then add the additional price for this ingredient in total price of burger
        const priceReduced = INGREDIENT_PRICES[type];

        // finally update the original state to reflect changes
        this.setState((prevState, currentProps) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice - priceReduced
            };
        });
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;

import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.9,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        orderPlaced: false
    }

    placeOrderHandler = () => {
        this.setState({ orderPlaced: true });
    }

    cancelOrderHandler = () => {
        this.setState({ orderPlaced: false });
    }

    continueOrderHandler = () => {
        // TODO: properly handle the checkout process and send the purchasing data to a real server
        alert('You continued a purchase!');
        this.setState({ orderPlaced: false });
    }

    setPurchasableHandler = (ingredientsAvailable) => {
        const totalIngredientsAdded = Object.keys(ingredientsAvailable)
            .map(
                (ingredientKey) => {
                    return ingredientsAvailable[ingredientKey];
                }
            )
            .reduce(
                (sum, currentValue) => {
                    return sum + currentValue;
                },
                0
            );

        this.setState({
            purchasable: totalIngredientsAdded > 0
        });
    }

    addIngredientHandler = (type) => {
        // update the ingredient count first for the added ingredient
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;

        // then add the additional price for this ingredient in total price of burger
        const additionalPrice = INGREDIENT_PRICES[type];

        // finally update the original state to reflect changes
        this.setState((prevState) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + additionalPrice
            };
        });

        this.setPurchasableHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // update the ingredient count first for the added ingredient
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount <= 0) {
            return;
        }
        const updatedIngredientCount = oldIngredientCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredientCount;

        // then add the additional price for this ingredient in total price of burger
        const priceReduced = INGREDIENT_PRICES[type];

        // finally update the original state to reflect changes
        this.setState((prevState) => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice - priceReduced
            };
        });

        this.setPurchasableHandler(updatedIngredients);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.orderPlaced} cancelOrder={this.cancelOrderHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancelOrder={this.cancelOrderHandler}
                        continueOrder={this.continueOrderHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    orderNow={this.placeOrderHandler} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;

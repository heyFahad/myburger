import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';
import * as actionCreators from '../../redux-store/actions/actionCreators';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        orderPlaced: false
    }

    updatePurchaseState = ( ingredients ) => {
        const totalIngredientsAdded = Object.keys(ingredients)
            .map(
                (ingredientKey) => {
                    return ingredients[ingredientKey];
                }
            )
            .reduce((sum, currentValue) => {
                return sum + currentValue;
            },
                0
            );

        return totalIngredientsAdded > 0;
    }

    placeOrderHandler = () => {
        this.setState({ orderPlaced: true });
    }

    cancelOrderHandler = () => {
        this.setState({ orderPlaced: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = (
            this.props.error ?
                <p style={{ textAlign: 'center', fontSize: '120%' }}>
                    Ingredients can't be loaded
                </p> :
                <Loader />
        );
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        orderNow={this.placeOrderHandler} />
                </React.Fragment>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.purchaseContinueHandler} />
            );
        }

        return (
            <React.Fragment>
                <Modal show={this.state.orderPlaced} clicked={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(BurgerBuilder, axios));

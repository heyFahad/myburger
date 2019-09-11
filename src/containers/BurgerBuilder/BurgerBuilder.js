import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-orders';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';
import * as actionTypes from '../../redux-store/actions';

class BurgerBuilder extends Component {
    state = {
        orderPlaced: false,
        loading: false,
        error: false
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
            this.state.error ?
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
        if (this.state.loading) {
            orderSummary = <Loader />;
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
        /* axios.get('https://reactjs-myburger.firebaseio.com/ingredients.json')
            .then(
                response => {
                    this.setState({
                        ingredients: response.data
                    });
                }
            )
            .catch(
                error => {
                    this.setState({
                        error: true
                    });
                }
            ); */
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(BurgerBuilder, axios));

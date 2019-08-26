import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-orders';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.9,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        orderPlaced: false,
        loading: false,
        error: false
    }

    placeOrderHandler = () => {
        this.setState({ orderPlaced: true });
    }

    cancelOrderHandler = () => {
        this.setState({ orderPlaced: false });
    }

    continueOrderHandler = () => {
        /* this.setState({ loading: true });

        const order = {
            ingredients: { ...this.state.ingredients },
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'Fahad Javed',
                email: 'fahad@email.com',
                address: {
                    street: 'Inside Shahdullah Gate',
                    city: 'Gujrat',
                    postalCode: 50700,
                    country: 'Pakistan'
                }
            },
            deliveryMethod: 'Fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    ingredients: {
                        salad: 0,
                        bacon: 0,
                        cheese: 0,
                        meat: 0
                    },
                    totalPrice: 5,
                    purchasable: false,
                    orderPlaced: false,
                    loading: false
                });
                console.log(response);
            })
            .catch(error => {
                this.setState({
                    orderPlaced: false,
                    loading: false
                });
                console.log(error);
            }); */

        // this.props.history.push("/checkout");
        const searchParamString = Object.keys(this.state.ingredients).map(
            ingredientKey => {
                return encodeURIComponent(ingredientKey) + "=" + encodeURIComponent(this.state.ingredients[ingredientKey]);
            }
        );
        searchParamString.push('price=' + this.state.totalPrice);
        const queryString = searchParamString.join("&");

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        let orderSummary = null;
        let burger = (
            this.state.error ?
                <p style={{ textAlign: 'center', fontSize: '120%' }}>
                    Ingredients can't be loaded
                </p> :
                <Loader />
        );
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
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
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler} />
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
        axios.get('https://reactjs-myburger.firebaseio.com/ingredients.json')
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
            );
    }
}

export default withAxiosErrorHandler(BurgerBuilder, axios);

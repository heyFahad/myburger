import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';
import * as actionCreators from '../../redux-store/actions/actionCreators';

class Orders extends Component {
    render() {
        return (
            <div>
                {
                    this.props.loading ? <Loader /> :
                        this.props.orders.map(order => {
                            return <Order
                                key={order.pushId}
                                ingredients={order.ingredients}
                                price={order.price} />
                        })
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken, this.props.userId);
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (idToken, userId) => dispatch(actionCreators.fecthOrders(idToken, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(Orders, axios));

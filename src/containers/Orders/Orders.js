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
        this.props.onFetchOrders(this.props.idToken);
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (idToken) => dispatch(actionCreators.fecthOrders(idToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(Orders, axios));

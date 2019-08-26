import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => {
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
        axios.get('orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        pushId: key,
                        ...response.data[key]
                    });
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }
}

export default withAxiosErrorHandler(Orders, axios);

import * as actionTypes from '../actions/actionTypes';

const initialStae = {
    orders: [],
    loading: false,
    puchased: false
};

const reducer = (state = initialStae, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                puchased: false
            };

        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            };

        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            };
    
        default:
            return state;
    }
}

export default reducer;

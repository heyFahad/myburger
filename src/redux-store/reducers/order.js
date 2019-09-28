import * as actionTypes from '../actions/actionTypes';

const initialStae = {
    orders: [],
    loading: false
};

const reducer = (state = initialStae, action) => {
    switch (action.type) {
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
                loading: false
            };

        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
    
        default:
            return state;
    }
}

export default reducer;

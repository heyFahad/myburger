import axios from "axios";
import * as actionTypes from "./actionTypes";

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtiJ3uFK6tQEnUhlxidYAX_XTFbTrSTuo';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtiJ3uFK6tQEnUhlxidYAX_XTFbTrSTuo';
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error));
            });
    };
};
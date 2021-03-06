import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUpForm) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        const API_KEY = 'AIzaSyCLMyXQ5d4b95VPq0rWxhBAe5_woibbgbQ';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if (!isSignUpForm) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        }

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
}

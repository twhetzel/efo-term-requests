import * as actionTypes from '../actions/actionTypes';

const intialState = {
    idToken: null,
    userId: null,
}

const reducer = (state = intialState, action) => {
    switch (action.types) {
        case actionTypes.AUTH_SUCCESS:
            return {};
        case actionTypes.AUTH_FAIL:
            return {};
        default:
            return state;
    }
};

export default reducer;

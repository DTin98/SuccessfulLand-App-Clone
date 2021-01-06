import { actionTypes } from '../actions/user'

const initialState = {
    data: {},
    isLogout: false,
    isLogin: false,
    session: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SIGN_IN:
            return Object.assign({}, state, {
                isLogout: action.isLogout,
                isLogin: action.isLogin,
                session: action.session
            });

        case actionTypes.DO_SIGN_UP:
            return Object.assign({}, state, {
                userdata: action.data
            });


        case actionTypes.SIGN_OUT:
            return Object.assign({}, state, initialState);

        default:
            return state;
    }
}

export default reducer;
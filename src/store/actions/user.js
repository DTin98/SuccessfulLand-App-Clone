export const actionTypes = {
    SIGN_OUT : 'SIGN_OUT',
    SIGN_IN : 'SIGN_IN',
    SIGN_UP :'SIGN_UP',
    
    DO_SIGN_IN: 'DO_SIGN_IN',
    DO_SIGN_UP :'DO_SIGN_UP',
    DO_SIGN_OUT: 'DO_SIGN_OUT',
    DO_RESET_PASS: 'DO_RESET_PASS',
};

export function _doSignUp (data) {
    return {
      type: actionTypes.DO_SIGN_UP,
      data: data
    };
  }
  
  export function _doSignIn (data) {
    return {
      type: actionTypes.DO_SIGN_IN,
      data: data
    };
  }

  export const logIn = (session) => {
    return {
      type: actionTypes.SIGN_IN,
      isLogout: false,
      isLogin: true,
      session: session
    };
  };
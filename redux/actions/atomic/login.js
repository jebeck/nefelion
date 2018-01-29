export const CLEAR_LOGIN_FAILURE = 'CLEAR_LOGIN_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function clearLoginFailure() {
  return {
    type: CLEAR_LOGIN_FAILURE,
  };
}

export function makeLoginRequester(firebase) {
  return function loginRequest({ email, password }) {
    return {
      type: LOGIN_REQUEST,
      payload: { auth: firebase.auth(), email, password },
    };
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    error: err,
  };
}

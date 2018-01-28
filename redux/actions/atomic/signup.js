export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export function makeSignupRequester(firebase) {
  return function signupRequest({ email, password }) {
    return {
      type: SIGNUP_REQUEST,
      payload: { auth: firebase.auth(), email, password },
    };
  };
}

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function signupFailure(err) {
  return {
    type: SIGNUP_FAILURE,
    error: err,
  };
}

export const CLEAR_LOGOUT_FAILURE = 'CLEAR_LOGOUT_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function clearLogoutFailure() {
  return {
    type: CLEAR_LOGOUT_FAILURE,
  };
}

export function makeLogoutRequester(firebase) {
  return function logoutRequest() {
    return {
      type: LOGOUT_REQUEST,
      payload: { auth: firebase.auth() },
    };
  };
}

export function logoutFailure(err) {
  return {
    type: LOGOUT_FAILURE,
    error: err,
  };
}

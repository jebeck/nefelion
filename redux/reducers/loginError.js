import { CLEAR_LOGIN_FAILURE, LOGIN_FAILURE } from 'atomic/login';

export default function loginError(state = null, action) {
  switch (action.type) {
    case CLEAR_LOGIN_FAILURE: {
      return null;
    }
    case LOGIN_FAILURE: {
      const { error } = action;
      return error;
    }
    default: {
      return state;
    }
  }
}

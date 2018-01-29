import { CLEAR_SIGNUP_FAILURE, SIGNUP_FAILURE } from 'atomic/signup';

export default function signupError(state = null, action) {
  switch (action.type) {
    case CLEAR_SIGNUP_FAILURE: {
      return null;
    }
    case SIGNUP_FAILURE: {
      const { error } = action;
      return error;
    }
    default: {
      return state;
    }
  }
}

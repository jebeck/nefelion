import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import currentUser from './currentUser';
import currentUserClaims from './currentUserClaims';
import loginError from './loginError';
import menuShowing from './menuShowing';
import signupError from './signupError';

const appReducers = {
  currentUser,
  currentUserClaims,
  loginError,
  menuShowing,
  signupError,
};
const app = combineReducers(appReducers);

export default combineReducers({ app, form });

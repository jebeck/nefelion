import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import currentUser from './currentUser';
import menuShowing from './menuShowing';
import signupError from './signupError';

const appReducers = { currentUser, menuShowing, signupError };
const app = combineReducers(appReducers);

export default combineReducers({ app, form });

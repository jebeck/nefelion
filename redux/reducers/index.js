import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import currentUser from './currentUser';
import menuShowing from './menuShowing';

const appReducers = { currentUser, menuShowing };
const app = combineReducers(appReducers);

export default combineReducers({ app, form });

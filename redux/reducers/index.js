import { combineReducers } from 'redux';

import menuShowing from './menuShowing';

const appReducers = { menuShowing };
const app = combineReducers(appReducers);

export default combineReducers({ app });

import _ from 'lodash';
import Router from 'next/router';
import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { TRANSITION_DURATIONS } from 'hoc/wrapPage';

const AUTH_ONLY_PATHS = ['/home', '/logout'];

export default function* firebaseAuthStateChange(action) {
  const { user } = action.payload;
  if (user) {
    /** just logged in! */
    if (_.includes(['/', '/login'], Router.pathname)) {
      yield call(Router.prefetch, '/home');
      yield delay(TRANSITION_DURATIONS[Router.pathname]);
      yield call(Router.push, '/home');
    }
  } else {
    /** just logged out! */
    if (_.includes(AUTH_ONLY_PATHS, Router.pathname)) {
      yield call(Router.prefetch, '/');
      yield delay(TRANSITION_DURATIONS[Router.pathname]);
      yield call(Router.push, '/');
    }
  }
}

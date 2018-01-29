import { call, put } from 'redux-saga/effects';

import { logoutFailure } from 'atomic/logout';
import * as api from 'utils/firebaseApi';

export default function* logout(action) {
  const error = yield call(api.logout, action.payload);
  if (error) {
    /** TODO: handle this in a reducer! */
    yield put(logoutFailure(error));
  }
}

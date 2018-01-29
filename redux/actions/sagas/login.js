import { call, put } from 'redux-saga/effects';

import { loginFailure, loginSuccess } from 'atomic/login';
import * as api from 'utils/firebaseApi';

export default function* login(action) {
  const { error, user } = yield call(api.login, action.payload);
  if (user) {
    yield put(loginSuccess());
  }
  if (error) {
    yield put(loginFailure(error));
  }
}

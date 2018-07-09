import { call, put } from 'redux-saga/effects';

import { loginFailure, loginSuccess } from 'atomic/login';
import { getUserClaimsSuccess } from 'atomic/userClaims';
import * as api from 'utils/firebaseApi';

export default function* login(action) {
  const { claims, error, user } = yield call(api.login, action.payload);
  if (claims) {
    yield put(getUserClaimsSuccess(claims));
  }
  if (user) {
    yield put(loginSuccess());
  }
  if (error) {
    yield put(loginFailure(error));
  }
}

import { call, put } from 'redux-saga/effects';

import { loginFailure } from 'atomic/login';
import * as api from 'utils/firebaseApi';

export default function* login(action) {
  const error = yield call(api.login, action.payload);
  if (error) {
    yield put(loginFailure(error));
  }
}

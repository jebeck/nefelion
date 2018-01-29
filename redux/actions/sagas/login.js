import { call, put } from 'redux-saga/effects';

import { signupFailure } from 'atomic/signup';
import * as api from 'utils/firebaseApi';

export default function* signup(action) {
  const error = yield call(api.signup, action.payload);
  if (error) {
    yield put(signupFailure(error));
  }
}

import { all, takeLatest } from 'redux-saga/effects';

import { SIGNUP_REQUEST } from 'atomic/signup';
import signup from 'sagas/signup';

function* watchForSignups() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* rootSaga() {
  try {
    yield all([watchForSignups()]);
  } catch (err) {
    console.warn(err);
  }
}

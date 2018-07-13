import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { FIREBASE_AUTH_STATE_CHANGE } from 'atomic/firebaseAuthStateChange';
import { LOGIN_REQUEST } from 'atomic/login';
import { LOGOUT_REQUEST } from 'atomic/logout';
import { SIGNUP_REQUEST } from 'atomic/signup';
import { TRACK_REQUEST } from 'atomic/track';

import firebaseAuthStateChange from './firebaseAuthStateChange';
import login from 'sagas/login';
import logout from 'sagas/logout';
import signup from 'sagas/signup';
import track from 'sagas/track';

function* watchForFirebaseAuthStateChanges() {
  yield takeEvery(FIREBASE_AUTH_STATE_CHANGE, firebaseAuthStateChange);
}

function* watchForLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchForLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchForSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchForTrack() {
  yield takeEvery(TRACK_REQUEST, track);
}

export default function* rootSaga() {
  try {
    yield all([
      watchForFirebaseAuthStateChanges(),
      watchForLogin(),
      watchForLogout(),
      watchForSignup(),
      watchForTrack(),
    ]);
  } catch (err) {
    console.warn(err);
  }
}

import { call, put } from 'redux-saga/effects';

import { trackFailure, trackSuccess } from 'atomic/track';

import * as api from 'utils/firebase';

export default function* track(action) {
  /** TODO: add a client-side validation step here */
  const { error, success } = yield call(api.track, action.payload);
  if (success) {
    yield put(trackSuccess());
  }
  if (error) {
    yield put(trackFailure(error));
  }
}

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  try {
    yield all([]);
  } catch (err) {
    console.warn(err);
  }
}

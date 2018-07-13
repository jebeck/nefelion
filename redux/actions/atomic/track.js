export const CLEAR_TRACK_FAILURE = 'CLEAR_TRACK_FAILURE';

export const TRACK_REQUEST = 'TRACK_REQUEST';
export const TRACK_SUCCESS = 'TRACK_SUCCESS';
export const TRACK_FAILURE = 'TRACK_FAILURE';

export function clearTrackFailure() {
  return {
    type: CLEAR_TRACK_FAILURE,
  };
}

export function makeTrackRequester(firebase, collection) {
  return function trackRequest(payload) {
    return {
      type: TRACK_REQUEST,
      payload: { collection, datum: payload, db: firebase.firestore() },
    };
  };
}

export function trackSuccess() {
  return {
    type: TRACK_SUCCESS,
  };
}

export function trackFailure(err) {
  return {
    type: TRACK_FAILURE,
    error: err,
  };
}

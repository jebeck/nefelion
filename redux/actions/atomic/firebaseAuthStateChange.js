export const FIREBASE_AUTH_STATE_CHANGE = 'FIREBASE_AUTH_STATE_CHANGE';

export default function firebaseAuthStateChange(user) {
  return {
    type: FIREBASE_AUTH_STATE_CHANGE,
    payload: { user },
  };
}

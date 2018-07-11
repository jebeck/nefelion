import _ from 'lodash'

import { FIREBASE_AUTH_STATE_CHANGE } from 'atomic/firebaseAuthStateChange';

export default function currentUser(state = null, action) {
  switch (action.type) {
    case FIREBASE_AUTH_STATE_CHANGE: {
      const { user } = action.payload;
      if (user) {
        return _.pick(user, ['displayName', 'email', 'emailVerified', 'isAnonymous']);
      } else {
        return null;
      }
    }
    default:
      return state;
  }
}

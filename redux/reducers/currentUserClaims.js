import _ from 'lodash';

import { GET_USER_CLAIMS_SUCCESS } from 'atomic/userClaims';

const CUSTOM_CLAIMS = ['track'];

export default function currentUserClaims(state = null, action) {
  switch (action.type) {
    case GET_USER_CLAIMS_SUCCESS: {
      const { claims } = action.payload;
      if (claims) {
        return _.pick(claims, CUSTOM_CLAIMS);
      } else {
        return null;
      }
    }
    default:
      return state;
  }
}

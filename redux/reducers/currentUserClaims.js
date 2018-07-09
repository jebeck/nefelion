import { GET_USER_CLAIMS_SUCCESS } from 'atomic/userClaims';

export default function currentUserClaims(state = null, action) {
  switch (action.type) {
    case GET_USER_CLAIMS_SUCCESS: {
      const { claims } = action.payload;
      if (claims) {
        return claims;
      } else {
        return null;
      }
    }
    default:
      return state;
  }
}

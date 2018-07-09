export const GET_USER_CLAIMS_SUCCESS = 'GET_USER_CLAIMS_SUCCESS';

export function getUserClaimsSuccess(claims) {
  return {
    type: GET_USER_CLAIMS_SUCCESS,
    payload: { claims },
  };
}

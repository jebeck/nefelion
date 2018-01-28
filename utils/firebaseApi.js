export function signup({ auth, email, password }) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => ({ error }));
}

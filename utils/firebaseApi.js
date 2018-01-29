export function login({ auth, email, password }) {
  return auth.signInWithEmailAndPassword(email, password).catch(error => error);
}

export function signup({ auth, email, password }) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => error);
}

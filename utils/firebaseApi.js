export function login({ auth, email, password }) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      const claims = await auth.currentUser
        .getIdTokenResult()
        .then(({ claims }) => {
          return claims;
        });
      return { claims, user };
    })
    .catch(error => ({ error }));
}

export function logout({ auth, email, password }) {
  return auth.signOut().catch(error => error);
}

export function signup({ auth, email, password }) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => ({ error }));
}

export function track({ collection, datum, db }) {
  if (!datum.id) {
    throw new Error(
      `You must provide an 'id' on any datum you are tracking! Current datum.id is: ${
        datum.id
      }.`
    );
  }
  return db
    .collection(collection)
    .doc(datum.id)
    .set(datum)
    .then(() => ({ success: true }))
    .catch(error => ({ error }));
}

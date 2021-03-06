import _ from 'lodash';
import { initializeApp } from 'firebase';
import 'firebase/firestore';

import firebaseAuthStateChange from 'atomic/firebaseAuthStateChange';
import { getUserClaimsSuccess } from 'atomic/userClaims';

export function getFirebaseConfig() {
  const config = {};

  if (
    process.env.FIREBASE_API_KEY &&
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_MESSAGING_SENDER_ID
  ) {
    config.apiKey = process.env.FIREBASE_API_KEY;
    config.authDomain = `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`;
    config.databaseURL = `https://${
      process.env.FIREBASE_PROJECT_ID
    }.firebaseio.com`;
    config.projectId = process.env.FIREBASE_PROJECT_ID;
    config.storageBucket = `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
    config.messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
  }

  return config;
}

let firebase = null;

export default function initFirebase(config, isServer, dispatch) {
  // don't initialize Firebase on the server
  if (isServer && typeof window === 'undefined') {
    return null;
  }

  if (!firebase && !_.isEmpty(config)) {
    firebase = initializeApp(config);
    firebase.firestore().settings({ timestampsInSnapshots: true });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(({ claims }) => {
            if (claims) {
              dispatch(getUserClaimsSuccess(claims));
            }
          });
      }
      dispatch(firebaseAuthStateChange(user));
    });
  }

  return firebase;
}

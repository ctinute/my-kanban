import {authentication} from './firebase-app';

export const firebaseLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authentication.signInWithPopup(provider);
};

export const firebaseLogout = () => {
  return authentication.signOut();
};

export const getCurrentUser = () => {
  return authentication.currentUser;
};

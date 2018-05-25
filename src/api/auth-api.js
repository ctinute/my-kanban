export const firebaseLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};

export const firebaseLogout = () => {
    return firebase.auth().signOut();
};

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
};

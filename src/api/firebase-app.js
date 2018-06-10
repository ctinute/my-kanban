// noinspection SpellCheckingInspection
export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCcnboD6v1Qdze8In091sos7N3bkZ3MPko',
  authDomain: 'project-my-kanban.firebaseapp.com',
  databaseURL: 'https://project-my-kanban.firebaseio.com',
  projectId: 'project-my-kanban',
  storageBucket: 'project-my-kanban.appspot.com',
  messagingSenderId: '964738474969',
});

export const database = firebase.database();
export const authentication = firebase.auth();

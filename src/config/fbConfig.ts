
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig  = {
  apiKey: "AIzaSyDb4hWd8K4xHavOZ0OAkV7ob94t9Bz1MLQ",
  authDomain: "accountable-3157c.firebaseapp.com",
  projectId: "accountable-3157c",
  storageBucket: "accountable-3157c.appspot.com",
  messagingSenderId: "496100206309",
  appId: "1:496100206309:web:3e2069a9ab8816f639960c",
  measurementId: "G-YVXS89E90N"
};

export const reduxFirebase = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: true
}

// Initialize Firebase
try {
	firebase.initializeApp(firebaseConfig);
	console.log("Firebase Initialized");
} catch (err) {
	console.log("Error Initializing Firebase");
}

//export const db = firebase.firestore();
//firebase.firestore().settings({ timestampsInSnapshots: true });
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
// export default { fbConfig, reduxFirebase };
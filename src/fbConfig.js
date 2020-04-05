import firebase from 'firebase'
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBIuppBPjctUSsXp7QEJIJeMdOnfXLeaVA",
    authDomain: "stat-counter-react-app.firebaseapp.com",
    databaseURL: "https://stat-counter-react-app.firebaseio.com",
    projectId: "stat-counter-react-app",
    storageBucket: "stat-counter-react-app.appspot.com",
    messagingSenderId: "592498891126",
    appId: "1:592498891126:web:1f065f6f9bb390852c8257",
    measurementId: "G-VSWG7RHNXP"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//const db = firebase.firestore().settings( {timestampsInSnapshots: true});
const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

// Initialize the FirebaseUI Widget using Firebase.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider
  ]
};

export { db }; 
export {increment, decrement};
export {uiConfig};




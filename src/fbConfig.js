import firebase from 'firebase';
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

export { db }; 
export {increment, decrement};



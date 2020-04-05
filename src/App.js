import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SigninScreen from './components/signinscreen';


function App() {

  var buttons;
  var counter;
  var login = false;
  
  
 
    return (
      <React.Fragment>
        <SigninScreen></SigninScreen>
  
        <br></br>
        <script src="/__/firebase/7.13.1/firebase-app.js"></script>
        <script src="/__/firebase/7.13.1/firebase-analytics.js"></script>
        <script src="/__/firebase/init.js"></script>
        <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
      <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
      </React.Fragment>
      
    );

}

//<CreateButton buttons={buttons} counter={counter}></CreateButton>



export default App;

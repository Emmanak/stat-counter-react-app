import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateButton from './components/createbutton';

function App() {

  var buttons;
  var counter; 

  

  return (
    <div>
      <br></br>
      <CreateButton buttons={buttons} counter={counter}></CreateButton>
      <script src="/__/firebase/7.13.1/firebase-app.js"></script>
      <script src="/__/firebase/7.13.1/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>

    </div>
    
  );
}



export default App;

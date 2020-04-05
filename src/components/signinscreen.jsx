import firebase from 'firebase'
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig} from '../fbConfig'
import CreateButton from './createbutton';

class SignInScreen extends React.Component {
    state = {
        loginStatus: false,
        forgotPassword: false,
        logoutButton : "btn btn-primary mr-2 invisible",
        loginButton: "btn btn-primary mr-2",
        signUpButton: "btn btn-secondary mr-10",
        email: ""
    }

    render() {
        if(this.state.loginStatus === true){
            return(
                <React.Fragment>
                    <div className="d-flex justify-content-between">
                    <span className="badge badge-info badge-block">Info</span>
                    <div className="card">
                        
                        <div className="card-body justify">
                            To manually sync devices, click the "Refresh" button!
                        </div>
                    </div>
                    </div>
                    <br></br>
                    <CreateButton email={this.state.email}></CreateButton>
                    <br></br>
                    <br></br>
                    <div className="d-flex center-content-between">
                      <button id="btnLogout" className={this.state.logoutButton} onClick={this.signOut}>Logout</button>
                  </div>
                </React.Fragment>
                
            );
        }
        else if(this.state.forgotPassword === true){
            return(
                <div className="container">
                    <nav className="navbar navbar-light bg-light">
                        <span className="navbar-brand mb-0 h1 mx-auto">Forgot Password</span>
                    </nav>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  <br></br>
                  <div className="input-group input-group-lg col-10 mx-auto">
                      <input id="forgot_password" type="email" placeholder="Email" className="form-control"></input>
                  </div>
                  <br></br>
                  <div className="input-group input-group-lg col-10 mx-auto">
                      <button id="sendResetEmail" className="btn btn-secondary" onClick={this.forgotPassword}>Send Reset Email</button>
                      <button id="backsendResetEmail" className="btn btn-primary ml-3" onClick={this.goBack}>Back</button>
                      </div>
                </div>
            );

        }
        else{
            return (
                <div className="container">
                    <nav className="navbar navbar-light bg-light">
                        <span className="navbar-brand mb-0 h1 mx-auto">Collaborative Stat Tracker</span>
                    </nav>
                    <br></br>
                    <div className="d-flex justify-content-between">
                    <span className="badge badge-info badge-block">Info</span>
                    <div className="card">
                        
                        <div className="card-body justify">
                            This web app allows you to create <i>customizable </i> 
                             push-buttons that can sync across multiple devices. 
                            First, create an <b>account</b>. Second, create some <b>buttons</b>! 
                            Finally, log into one of <b>more</b> devices and push away! 
                            Any change on each individual devices will be <b>synced</b> across all devices!
                        </div>
                    </div>
                    </div>
                    
                    
                    
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  <br></br>
                  <div className="input-group input-group-lg col-10 mx-auto">
                      <input id="txtEmail" type="email" placeholder="Email" className="form-control"></input>
                  </div>
                  
                  <br></br>
        
                  <div className="input-group input-group-lg col-10 mx-auto">
                      <input id="txtPassword" type="password" placeholder="Password" className="form-control"></input>
                  </div>
                  
                  <br></br>
        
                  <div className="input-group input-group-lg col-10 mx-auto">
                      <button id="btnLogin" className={this.state.loginButton} onClick={this.login}>Login</button>
                      <button id="btnSignUp" className={this.state.signUpButton} onClick={this.signUp}>Sign Up</button>
                      <button id="btnLogout" className={this.state.logoutButton} onClick={this.signOut}>Logout</button>
                      <button id="btnLogout" className="btn btn-action" onClick={this.forgotPassword}>Forgot Password?</button>
                  </div>
        
                  
                </div>
              );
        }
      
    }

    login = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;

        //Sign in
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                this.setState({email: firebaseUser.uid});
                this.setState({logoutButton: "btn btn-primary col-3 mx-auto"});
                this.setState({loginButton: "btn btn-primary mr-2 invisible"});
                this.setState({signUpButton: "btn btn-secondary mr-10 invisible"});
                this.setState({loginStatus : true});
            }
            else{
                console.log('STATUS: Not logged in');
                //window.alert("Please ensure that you registered with a valid email and password. If not, try to sign up or login again.");
                promise.catch(e => window.alert(e.message));
            }
        });
    }

    signUp = () => {
        const email = document.getElementById("txtEmail").value;
        const pass = document.getElementById("txtPassword").value;

        //Sign Up
        const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        window.alert("Login to complete Sign up!");

        window.location.reload();
        return false;

        
    }

    signOut = () => {
        firebase.auth().signOut();

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
            }
            else{
                console.log('STATUS: Not logged in');
                this.setState({logoutButton: "btn btn-primary mr-2 invisible"});
                this.setState({loginButton: "btn btn-primary mr-2"});
                this.setState({signUpButton: "btn btn-secondary mr-10"});
                this.setState({loginStatus: false});
                window.alert("You have been logged out!");
                

            }
            window.location.reload();
            return false;
        });


    }

    forgotPassword = () => {
        if(this.state.forgotPassword === false){
            this.setState({forgotPassword: true});
            return;
        }
        else if(this.state.forgotPassword === true){
        firebase.auth().sendPasswordResetEmail(document.getElementById("forgot_password").value);
        this.setState({forgotPassword: false});
        window.location.reload();
        return false;
        }
    }

    goBack = () => {
        this.setState({forgotPassword: false});
        window.location.reload();
        return false;
    }

  }

  export default SignInScreen;
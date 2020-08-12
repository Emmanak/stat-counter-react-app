import React, { Component } from 'react';
import firebase from 'firebase'
import CreateButton from './createbutton';


class DemoPage extends Component {
    state = { 
        loginStatus: false,
        anon_login: false,
        forgotPassword: false,
        signUpStatus: false,
        logoutButton : "btn btn-primary mr-2 invisible",
        loginButton: "btn btn-primary ml-3 mr-2",
        signUpButton: "btn btn-secondary mr-10",
        email: ""
     }
    render() {
        if(this.state.loginStatus === true){
            return(
                <React.Fragment>
                    
                    <div className="container">
                    <div className="d-flex justify-content-center">
                    <span className="badge badge-info badge-block">Info</span>
                    <div className="card">
                        
                        <div className="card-body">
                            Only the owner can create or delete buttons.
                        </div>
                    </div>
                    </div>
                    </div>
                    <br></br>
                    <CreateButton email={this.state.email} anon_login={this.state.anon_login}></CreateButton>
                    <br></br>
                    <div className="d-flex center-content-between">
                      <button id="btnLogout" className={this.state.logoutButton} onClick={this.signOut}>Logout</button>
                  </div>
                </React.Fragment>
                
            );
        }
        else{
            return (
                <React.Fragment>
                <div className="d-flex card">
                        
                        <div className="card-body mx-auto">
                            <h1><span className="badge badge-info">Click OK!</span></h1>
                        </div>
                    </div> 
                <div className="container card">
                          <div className="card-body">
                          <div className="input-group input-group-lg col-10 mx-auto">
                          <input id="button_set_id" type="email" value="7I0jkTDalEayoniYia9vH0vIpWA3" className="form-control"></input>
                          <button id="btnLogin" className="btn btn-primary ml mr-2" onClick={this.login_anon}>OK</button>
                            </div>
    
                          </div>
                      </div>
                </React.Fragment>
             );
            
        } 
        
    }

    login_anon = () => {
        var button_set_id = document.getElementById("button_set_id").value;
        console.log(button_set_id);
        const promise = firebase.auth().signInAnonymously();

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(button_set_id.length > 0 && firebaseUser){
                
                this.setState({email: button_set_id});
                this.setState({logoutButton: "btn btn-primary col-3 mx-auto"});
                this.setState({loginStatus : true})
                this.setState({anon_login: true});
            }
            else{
                console.log('STATUS: Not logged in');
                promise.catch(e => window.alert(e.message));

            }
        });

    }
}
 
export default DemoPage;


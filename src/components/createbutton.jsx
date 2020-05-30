import React, { Component } from 'react';
import PushButton from './pushbutton';
import ColorButton from './colorbutton';
import {db} from '../fbConfig.js';
import {increment, decrement} from '../fbConfig.js';

var data_init = false;


class CreateButton extends Component {
    
    state = { buttons: [],
        time: 0,
        counter: 10,
        email: this.props.email,
        anon_login: this.props.anon_login,
        colorbuttons: [
            {c_id : "c1",  class_id : "primary", color : "Blue"},
            {c_id : "c2",  class_id : "secondary", color : "Grey"},
            {c_id : "c3",  class_id : "success", color : "Green"},
            {c_id : "c4",  class_id : "danger", color : "Red"},
            {c_id : "c5",  class_id : "warning", color : "Yellow"},
            {c_id : "c6",  class_id : "info", color : "Turquoise"}
        ],
        currentColor: "primary"
    };

    render() {

        
        let {buttons} = this.state;
        if(buttons === undefined || buttons.length === 0){
            if(data_init === false){
                data_init = true;
                this.init_database();
            }
            return ( 
            <React.Fragment>
              <button
               id="refreshButton" onClick={this.init_database}
                 className="btn btn-block btn-success invisible"
               >
                 Refresh
               </button>
               <div className="container p-4">
              <div className="card">
                <div className="card-body">
                  <div>
                    <span className="badge badge-info badge-large"><h6>Create Button:</h6></span>
                    
                  </div>
                  <br></br>
                    <div className="d-flex justify-content-center">
                      <ColorButton
                        colorbuttons={this.state.colorbuttons}
                        selectColor={this.buttonColor}
                        currentColor={this.state.currentColor}/>
                    </div>
                    <br></br>

                    <div className="input-group input-group-lg mx-auto">

                      <input
                        type="text"
                        className="form-control"
                        id="create-button"
                        placeholder="Enter button name"
                      ></input>

                      <div className="input-group-append">
                        <button
                          onClick={this.readInput}
                          className="btn btn-primary btn-lg">OK
                        </button>

                      </div>

                    </div>
                  </div>
                
              </div>
            </div>

                
                
                    
            </React.Fragment>
            
         );

        }
        else {
         return (
           <React.Fragment>
             <div className="container">
                 <div className="container mx-auto p-20 col-10">

                 <button
                      id="refreshButton"
                    className="btn btn-success btn-block"
                    onClick={this.init_database}>
                    Refresh
               </button>
                     
                 </div>
             </div>

             <div className="container"> 
               {this.state.buttons.map((button) => (
                 <PushButton
                   key={button.button_id}
                   id={button.button_id}
                   value={button.value}
                   name={button.name}
                   onIncrement={this.handleIncrement}
                   onDecrement={this.handleDecrement}
                   color={button.color}
                   onDelete={this.handleDelete}
                 ></PushButton>
               ))}
             </div>

             

            <div className="container p-4">
              <div className="card">
                <div className="card-body">
                  <div>
                    <span className="badge badge-info badge-large"><h6>Create Button:</h6></span>
                    
                  </div>
                  <br></br>
                    <div className="d-flex justify-content-center">
                      <ColorButton
                        colorbuttons={this.state.colorbuttons}
                        selectColor={this.buttonColor}
                        currentColor={this.state.currentColor}/>
                    </div>
                    <br></br>

                    <div className="input-group input-group-lg mx-auto">

                      <input
                        type="text"
                        className="form-control"
                        id="create-button"
                        placeholder="Enter button name"
                      ></input>

                      <div className="input-group-append">
                        <button
                          onClick={this.readInput}
                          className="btn btn-primary btn-lg">OK
                        </button>

                      </div>

                    </div>
                  </div>
                
              </div>
            </div>
             
             <br></br>
             <div className="container p-4 mx-auto">
             <div className="card">
               <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted"><span className="badge badge-info badge-large mr-2">Button Set ID</span></h5><h6>Share this ID with your fellow collaborators:</h6>
                 
                 <p id="copyToClipboard" value={this.state.email} className="card-text bg-light">{this.state.email}
                 </p>
                 <button className="btn btn-secondary" onClick={this.copyToClipboard}>
                   Copy to Clipboard
                 </button>
               </div>
             </div>

             </div>
           </React.Fragment>
         );
         
        }
    }

    readInput = (event) => {
        //Read Value of Button Name Text Input
        console.log(this.props.anon_login);
        if(this.props.anon_login === true){
          document.getElementById("create-button").value = "";
          window.alert("You are not authorized to create buttons. Please contact the button owner.");
          return;
        }
        else{
          document.getElementById("refreshButton").click();
        var name = document.getElementById("create-button").value;
        document.getElementById("create-button").value = "";
        
        if(name.length === 0){
            window.alert("Please give your button a name.");
            return;
        }
        else{
            let {counter} = this.state;

        //Creating properties for the new button
        var button = {
            button_id: 1,
            value: 0,
            name: name, 
            color: this.state.currentColor
        };

        
        counter = counter + 1;
        button.button_id = counter;
        button.color = this.state.currentColor;
        button.name = name;
        button.value = 0;

        
        
        
        //Add new button to database
        db.collection("stat-tracker").doc(this.props.email)
        .collection("buttons").doc('button'+button.button_id)
        .set(button).then(function() {
            console.log("Document successfully written!");
            document.getElementById("refreshButton").click()
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            document.getElementById("refreshButton").click()
        });

        }

        }
        
 
    }

    handleIncrement = (button_id) => {
        console.log("Increment Clicked for button",button_id);

        //Increment DATABSE value of Button# by 1
        db.collection("stat-tracker").doc(this.props.email)
        .collection("buttons").doc("button"+button_id).update({
            value: increment

        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        //Increment LOCAL value of button by 1
        var buttons = this.state.buttons;
        for(var i=0; i < buttons.length; i++){
            if(buttons[i].button_id === button_id){
                buttons[i].value++;
            }
        }
        this.setState({buttons: buttons});

    }

    handleDecrement = (button_id) => {
        console.log("Decrement Clicked for button",button_id);

        //Decrement Local Value of button by 1
        var buttons = this.state.buttons;
        for(var i=0; i < buttons.length; i++){
            if(buttons[i].button_id === button_id){
                if(buttons[i].value > 0){
                    buttons[i].value--;
                }
                else{
                    return;
                }
            }
        }
        this.setState({buttons: buttons});

        //Decrement DATABSE value of Button# by 1
        db.collection("stat-tracker").doc(this.props.email)
        .collection("buttons").doc("button"+button_id).update({
            value: decrement

        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    handleDelete = (button_id) => {
        console.log("Delete Clicked for button",button_id);
        if(this.props.anon_login === true){
          document.getElementById("create-button").value = "";
          window.alert("You are not authorized to delete buttons. Please contact the button owner.");
          return;
        }
        else{
          var confirmDelete = window.confirm("Are you sure you want to delete this button? All saved data will be lost.");
          console.log(confirmDelete);
        
          if(confirmDelete === true){


              //Delete removed button from online Database
              db.collection("stat-tracker").doc(this.props.email)
              .collection("buttons").doc("button".concat(button_id)).delete().then(function() {
                  console.log("Document successfully deleted!");
                  window.alert("Button has been deleted");
                  setTimeout(document.getElementById("refreshButton").click(), 1000);
              
              }).catch(function(error) {
                  console.error("Error removing document: ", error);
                  
              });
              console.log(this.state.buttons);
          }

        }
        
        

        

        
        
    
    }

    buttonColor = (button_color) => {
        this.setState({currentColor: button_color});
    }

    init_database = () => {
        console.log("Updating local state from Database:");
        while(this.props.email === ""){
          console.log("waiting");
        }
        db.collection("stat-tracker").doc(this.props.email).collection("buttons")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            if(data === undefined || data[data.length-1] === undefined){
                window.alert("No button data is available. Please create a new button.");
                this.setState({buttons: data});
                data_init = true
                return;
            }
                this.setState({buttons: data});
                console.log(data);
                console.log(this.state.buttons);
                this.setState({counter: data[data.length-1].button_id});
                data_init = true;
            
        });
      
      }

      copyToClipboard = () => {
          var text = this.state.email;
        /* Select the text field */
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        alert("Copied the text: " + text);
        try {
          return document.execCommand("cut");
        } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
        } finally {
          document.body.removeChild(textarea);
        }

        /* Alert the copied text */
        
      }

      componentDidMount() {
        this.interval = setInterval(() => document.getElementById("refreshButton").click(), 15000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    

}


export default CreateButton;
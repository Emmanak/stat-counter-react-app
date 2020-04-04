import React, { Component } from 'react';
import PushButton from './pushbutton';
import ColorButton from './colorbutton';
import {db} from '../fbConfig.js';
import {increment, decrement} from '../fbConfig.js';


class CreateButton extends Component {
    
    state = { buttons: [],
        counter: 0,
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
        console.log(buttons);
        if(buttons === undefined || buttons.length === 0){
            return ( 
            <div>
                <div className="container col-3 mx-auto"> 
                    <button className="btn btn-block btn-success" onClick={this.init_database}>Previous Buttons</button>
                </div>

                <ColorButton colorbuttons={this.state.colorbuttons} selectColor={this.buttonColor}/>

                <div className="input-group input-group-lg col-8 mx-auto">
                    <input type="text" className="form-control" id="create-button" placeholder="Button name"></input>
                    <div className="input-group-append"><button onClick={this.readInput} className="btn btn-primary btn-lg">OK</button>
                    </div>
                </div>
                    
            </div>
            
         );

        }
         return (
            <React.Fragment>

                <div className="container col-3 mx-auto"> 
                    <button className="btn btn-block btn-success" onClick={this.init_database}>Refresh</button>
                </div>

                <div className="container">
                    {this.state.buttons.map(button => (<PushButton key={button.button_id} id={button.button_id} value={button.value} 
                    name={button.name} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} color={button.color} onDelete={this.handleDelete}></PushButton>))}
                </div>

                <ColorButton colorbuttons={this.state.colorbuttons} selectColor={this.buttonColor}/>
                    
                <div className="input-group input-group-lg col-8 mx-auto">
                    <input type="text" className="form-control" id="create-button" placeholder="Enter button name"></input>
                    <div className="input-group-append"><button onClick={this.readInput} className="btn btn-primary btn-lg">OK</button>
                    </div>
                </div>
                    
            </React.Fragment>

         );
    }

    readInput = (event) => {
        //Read Value of Button Name Text Input
        var name = document.getElementById("create-button").value;
        document.getElementById("create-button").value = "";
        
        if(name.length === 0){
            window.alert("Please give your button a name.");
            return;
        }

        this.init_database();
        let {buttons, counter} = this.state;

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
        buttons.push(button)
        this.setState( {buttons: buttons});
        this.setState({counter: counter});
        
        //Add new button to database
        db.collection("buttons").doc('button'+button.button_id).set(button).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
 
    }

    handleIncrement = (button_id) => {
        console.log("Increment Clicked for button",button_id);

        //Increment DATABSE value of Button# by 1
        db.collection("buttons").doc("button"+button_id).update({
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
        db.collection("buttons").doc("button"+button_id).update({
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
        var confirmDelete = window.confirm("Are you sure you want to delete this button? All saved data will be lost.");
        
        //Remove button from local array using filter
        if(confirmDelete === true){
            let buttons = this.state.buttons.filter(button => button.id !== button_id);
            this.setState({buttons: buttons});
        }

        //Delete removed button from online Database
        db.collection("buttons").doc("button".concat(button_id)).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        this.init_database();
        
    
    }

    buttonColor = (button_color) => {
        this.setState({currentColor: button_color});
    }

    init_database = () => {
        console.log("Updating local state from Database:");
      
        db.collection("buttons")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            this.setState({buttons: data});
            this.setState({counter: data[data.length-1].button_id});
            
        });
      
      }

      //Real-Time db listener
      db_listener = () => {
          db.collection("buttons").onSnapshot(snapshot => {
              //let changes = snapshot.docChanges();  //Can show when changes are made.
                                                    //Certain fields will be changed to
                                                    // "Added" or "Modified" to indicate
                                                    //Type of change
            });
      }

    

}
 
export default CreateButton;
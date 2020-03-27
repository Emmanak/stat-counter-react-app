import React, { Component } from 'react';
import PushButton from './pushbutton';
import ColorButton from './colorbutton';


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
        let {buttons } = this.state;
        if(buttons === undefined || buttons.length === 0){
            return ( 
            <div>

                <div className="container">
                    <div className="row">
                        <span className="text mx-auto">Select Color:</span>
                    </div>
                    <div className="row row-m-t">
                        <div className="btn-group mx-auto mr-2 outer" role="group" aria-label="Basic example">
                            {this.state.colorbuttons.map(button => (<ColorButton key={button.c_id} id={button.class_id} type="button" 
                            selectColor={this.buttonColor} name={button.color} className={'btn btn-'.concat(button.class_id)}>{button.color}</ColorButton>))}
                        </div>
                    </div>
                </div>

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

                <div className="container">
                    {this.state.buttons.map(button => (<PushButton key={button.id} id={button.id} value={button.value} 
                    name={button.name} color={this.state.currentColor} onDelete={this.handleDelete}></PushButton>))}
                </div>

                <div className="container">
                    <div className="row">
                        <span className="text mx-auto">Select Color:</span>
                    </div>
                    <div className="row row-m-t">
                            <div className="btn-group mx-auto mr-2 outer" role="group" aria-label="Basic example">
                                {this.state.colorbuttons.map(button => (<ColorButton key={button.c_id} id={button.class_id} type="button" 
                                selectColor={this.buttonColor} name={button.color} className={'btn btn-'.concat(button.class_id)}>{button.color}</ColorButton>))}
                        </div>
                    </div>
                </div>
                    
                <div className="input-group input-group-lg col-8 mx-auto">
                    <input type="text" className="form-control" id="create-button" placeholder="Enter button name"></input>
                    <div className="input-group-append"><button onClick={this.readInput} className="btn btn-primary btn-lg">OK</button>
                    </div>
                </div>
                    
            </React.Fragment>

         );
    }

    readInput = (event) => {
        
        var name = document.getElementById("create-button").value;
        
        if(name.length === 0){
            window.alert("Please give your button a name.");
            return;
        }

        let {buttons, counter} = this.state;

        var button = {id: 1, value: 0, name: name};

        counter = counter + 1;
        button.id = counter;
        button.value = 0;
        button.name = name;
        buttons.push(button)
        
        
        this.setState( {buttons: buttons});
        this.setState({counter: counter});
        //console.log(this.state);
        
    }

    handleDelete = (button_id) => {
        var confirmDelete = window.confirm("Are you sure you want to delete this button?");
        if(confirmDelete === true){
            let buttons = this.state.buttons.filter(button => button.id !== button_id);
            this.setState({buttons: buttons});
        }
        
    
    }

    buttonColor = (button_color) => {
        
        this.setState({currentColor: button_color});

    }

}
 
export default CreateButton;

//<PushButton id={this.state.id} value={this.state.value} name={this.state.name}></PushButton>
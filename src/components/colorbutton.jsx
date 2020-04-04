import React, { Component } from 'react';

class ColorButton extends Component {
    state = { 
        colorbuttons: this.props.colorbuttons
    }
    render() { 
        return (
            <div className="container">
                    <div className="row">
                        <span className="text mx-auto">Select Color:</span>
                    </div>
                    <div className="row row-m-t">
                            <div className="btn-group mx-auto mr-2 outer" role="group" aria-label="Basic example">
                                {this.state.colorbuttons.map(button => (<button key={button.c_id} id={button.class_id} type="button" 
                                onClick={ () => this.props.selectColor(button.class_id)} name={button.color} className={'btn btn-'.concat(button.class_id)}>{button.color}</button>))}
                        </div>
                    </div>
                </div>
        
             );
    }
}
 
export default ColorButton;
import React, { Component } from 'react';

class ColorButton extends Component {
    state = { 
        c_id: this.props.id,
        c_class: this.props.className,
        name: this.props.name,
        type: this.props.type 
    }
    render() { 
        return ( 
        <button id={this.state.c_id} type={this.state.type} className={this.state.c_class} onClick={()=> this.props.selectColor(this.props.id)}>{this.state.name}</button>
             );
    }
}
 
export default ColorButton;
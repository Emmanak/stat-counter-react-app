import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class ColorButton extends Component {
    state = { 
        colorbuttons: this.props.colorbuttons
    }
    render() { 
        return (
            
            <React.Fragment>
                
                
                <DropdownButton id="dropdown-item-button"  size="lg" title="Select Color" variant={this.props.currentColor}>
                {this.state.colorbuttons.map(button => (<Dropdown.Item key={button.c_id} id={button.class_id} type="button" 
                                onClick={ () => this.props.selectColor(button.class_id)} name={button.color} className={'btn btn-'.concat(button.class_id)}>{button.color}</Dropdown.Item>))}
                </DropdownButton>
                        
                </React.Fragment>
                
                    
               
        
             );
    }
}
 
export default ColorButton;
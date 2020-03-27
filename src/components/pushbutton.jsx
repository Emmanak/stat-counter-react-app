import React, { Component } from 'react';

class PushButton extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        value: this.props.value,
        button_color: this.props.color 
     }
    render() { 
        return (
            
            <div className="row row-m-t disable-dbl-tap-zoom outer">
               
                
                    <button className="btn btn-lg btn-secondary col-1 mr-2" onClick={this.handleDecrement}><b>-</b></button>
                    <span className="mr-2"><b>{this.state.value}</b></span>
                    
                    
                    <button name={this.state.name} id={this.state.id} className={this.buttonStyle()} color="pink" onClick={this.handleIncrement}>
                {this.state.name}
                </button>
                
                    <button className="btn btn-lg btn-danger col-1" onClick={() => this.props.onDelete(this.props.id)}>X</button>
            
            </div>
            


          );
    }

    buttonStyle() {
        //let { id } = this.state;
        
        return 'btn btn-lg col-7 mr-5 btn-'.concat(this.state.button_color);
        
    }

    badgeStyle() {
        const { value } = this.state;
        if( value === 0) {
            return 'badge badge-warning badge-lg col-1 mr-2 align-left';
        }
        else{
            return 'badge badge-info badge-lg col-1 mr-2 align-middle';
        }
    }

    handleIncrement = () => {
        this.setState({value: this.state.value +1 });
    }

    handleDecrement = () => {
        if(this.state.value > 0){
            this.setState({value: this.state.value -1 });

        }
    }

}
export default PushButton;

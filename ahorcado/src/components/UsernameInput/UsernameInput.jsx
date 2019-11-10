import React, { Component } from 'react';
import './UsernameInput.css';

class UsernameInput extends Component {

    constructor(props) {
        super(props);
        this.username = props.username;

        this.updateInputValue = this.updateInputValue.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }

    updateInputValue(event) {
        this.username = event.target.value;
    }

    changeUsername(event) {
        if (this.username !== "") {
            this.props.changeUsername(this.username);
        }
    }

    render() {
        return (
            <div className="input-group mb-3" id="username-field">
                <input type="text" className="form-control" aria-label="Username" aria-describedby="button-addon2" onChange={this.updateInputValue} placeholder="Username" />
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.changeUsername}>Button</button>
            </div>
        );
    }
}

export default UsernameInput;
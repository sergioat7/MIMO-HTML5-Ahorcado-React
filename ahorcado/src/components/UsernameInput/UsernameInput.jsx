import React, { Component } from 'react';
import './UsernameInput.css';

class UsernameInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: props.username
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }

    updateInputValue(event) {
        this.setState({username: event.target.value});
    }

    changeUsername() {
        if (this.state.username !== "") {
            this.props.changeUsername(this.state.username);
        }
    }

    render() {
        return (
            <form className="input-group mb-3" id="username-form" onSubmit={this.changeUsername}>
                <input type="text" className="form-control" aria-label="Username" aria-describedby="button-addon2" onChange={this.updateInputValue} placeholder="Usuario" value={this.state.username} />
                <button className="btn btn-primary" type="submit" id="button-addon2" onClick={this.changeUsername}>Aceptar</button>
            </form>
        );
    }
}

export default UsernameInput;
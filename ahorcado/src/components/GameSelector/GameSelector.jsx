import React, { Component } from 'react';
import './GameSelector.css';

class GameSelector extends Component {

    constructor(props) {
        super(props);

        this.changeGameMode = this.changeGameMode.bind(this);
    }

    changeGameMode(event) {
        this.props.setGameMode(event.target.id);
    }

    render() {
        return (
            <div>
                <input type="radio" id="easy" name="mode" className="mode-radio" onClick={this.changeGameMode} defaultChecked />
                <label htmlFor="easy" className="text-mode">Fácil</label>
                <input type="radio" id="medium" name="mode" className="mode-radio" onClick={this.changeGameMode} />
                <label htmlFor="medium" className="text-mode">Medio</label>
                <input type="radio" id="difficult" name="mode" className="mode-radio" onClick={this.changeGameMode} />
                <label htmlFor="difficult" className="text-mode">Difícil</label>
            </div>
        );
    }
}

export default GameSelector;

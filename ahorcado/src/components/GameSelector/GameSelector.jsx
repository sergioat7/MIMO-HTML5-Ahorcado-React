import React, { Component } from 'react';
import './GameSelector.css';

class GameSelector extends Component {

    constructor(props) {
        super(props);

        this.gameMode = props.gameMode;

        this.changeGameMode = this.changeGameMode.bind(this);
    }

    changeGameMode(event) {
        this.props.setGameMode(event.target.id);
    }

    render() {
        let easyInput = this.gameMode === "easy" ? <input type="radio" id="easy" name="mode" className="mode-radio" onClick={this.changeGameMode} defaultChecked /> : <input type="radio" id="easy" name="mode" className="mode-radio" onClick={this.changeGameMode} />
        let mediumInput = this.gameMode === "medium" ? <input type="radio" id="medium" name="mode" className="mode-radio" onClick={this.changeGameMode} defaultChecked /> : <input type="radio" id="medium" name="mode" className="mode-radio" onClick={this.changeGameMode} />
        let difficultInput = this.gameMode === "difficult" ? <input type="radio" id="difficult" name="mode" className="mode-radio" onClick={this.changeGameMode} defaultChecked /> : <input type="radio" id="difficult" name="mode" className="mode-radio" onClick={this.changeGameMode} />
        return (
            <div>
                {easyInput}
                <label htmlFor="easy" className="text-mode">Fácil</label>
                {mediumInput}
                <label htmlFor="medium" className="text-mode">Medio</label>
                {difficultInput}
                <label htmlFor="difficult" className="text-mode">Difícil</label>
            </div>
        );
    }
}

export default GameSelector;

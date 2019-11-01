import React, { Component } from 'react';
import GameSelector from './components/GameSelector/GameSelector';
import CharactersBox from './components/CharactersBox/CharactersBox';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reset: 0,
      title: "Iniciar partida",
      gameMode: null,
      letters: 5,
      attemtps: 3,
      restart: true,
    }

    this.resetBoard = this.resetBoard.bind(this);
  }

  setGameMode = (mode) => {
    this.setState({ gameMode: mode });
    this.resetBoard();
  }

  selectCharacter = (character) => {
    var title = "";
    if (this.gameFinished(character) === true) {
      title = "Has ganado!";
    } else if (this.state.attemtps > 1) {
      var attemtps = this.state.attemtps - 1;
      title = "Te quedan " + attemtps + " intentos";
    } else {
      title = "Has perdido";
    }
    this.setState({
      title: title,
      attemtps: this.state.attemtps - 1
    });
  }

  gameFinished(character) {
  }

  resetBoard() {
    this.setState({
      restart: !this.state.restart,
      title: "Iniciar partida",
      attemtps: 3
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <GameSelector setGameMode={this.setGameMode}></GameSelector>
          <h4 id="title">{this.state.title}</h4>
        </header>
        {this.state.attemtps > 0 && <CharactersBox key={this.state.restart} selectCharacter={this.selectCharacter}></CharactersBox>}
        <footer>
          <div>
            <button className="btn btn-warning" name="restart_game" type="button" onClick={this.resetBoard}>Reiniciar partida</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

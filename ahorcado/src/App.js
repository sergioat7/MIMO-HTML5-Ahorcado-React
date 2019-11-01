import React, { Component } from 'react';
import GameSelector from './components/GameSelector/GameSelector';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Iniciar partida",
      gameMode: null
    }
    this.title = "Iniciar partida";
    this.gameMode = "";

    this.resetBoard = this.resetBoard.bind(this);
  }

  setGameMode = (mode) => {
    this.setState({ gameMode: mode });
  }

  resetBoard() {
    this.setState({ title: "Hola" });
  }

  render() {
    return (
      <div className="App">
        <header>
          <GameSelector setGameMode={this.setGameMode}></GameSelector>
          <h4 id="title">{this.title}</h4>
        </header>
        <footer>
          <div>
            <button className="btn btn-warning" name="restart_game" type="button" onClick={this.resetBoard}>Reiniciar
          partida</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

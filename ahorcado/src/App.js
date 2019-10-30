import React, { Component } from 'react';
import './App.css';

class App extends Component {

  resetBoard() {
    console.log("Reset");
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <input type="radio" id="easy" name="mode" className="mode-radio" onClick={this.resetBoard}></input>
            <label htmlFor="easy" className="text-mode">Fácil</label>
            <input type="radio" id="medium" name="mode" className="mode-radio" onClick={this.resetBoard}></input>
            <label htmlFor="medium" className="text-mode">Medio</label>
            <input type="radio" id="difficult" name="mode" className="mode-radio" onClick={this.resetBoard}></input>
            <label htmlFor="difficult" className="text-mode">Difícil</label>
          </div>
          <h4 id="title">Iniciar partida</h4>
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

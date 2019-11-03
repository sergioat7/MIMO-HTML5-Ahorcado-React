import React, { Component } from 'react';
import GameSelector from './components/GameSelector/GameSelector.jsx';
import CharactersBox from './components/CharactersBox/CharactersBox.jsx';
import Answer from './components/Answer/Answer.jsx';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restart: true,
      title: "Iniciar partida",
      gameMode: null,
      attemtps: 3,
    }
    this.movie = this.getMovie();
    this.words = this.getMovie().split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });

    this.resetBoard = this.resetBoard.bind(this);
  }

  getMovie() {
    return "el señor de los anillos el retorno del rey";
  }

  setGameMode = (mode) => {
    this.setState({ gameMode: mode });
    this.resetBoard();
  }

  selectCharacter = (character) => {
    var success = this.checkAnswer(character);
    var title = "";
    var attemtps = this.state.attemtps;
    if (!success) {
      attemtps = this.state.attemtps - 1
    }
    if (this.gameFinished() === true) {
      title = "Has ganado!";
      attemtps = 0;
    } else if (attemtps > 0) {
      title = "Te quedan " + attemtps + " intentos";
    } else {
      attemtps = 0;
      title = "Has perdido";
      this.showAnswer();
    }
    this.setState({
      title: title,
      attemtps: attemtps
    });
  }

  checkAnswer(character) {
    var success = false;
    this.answer = this.words.map((word, i) => {
      return word.split("").map((c, j) => {
        if (c === character) {
          success = true;
          return c
        } else {
          return this.answer[i][j];
        }
      });
    });
    return success
  }

  showAnswer() {
    this.answer = this.words.map((word, i) => {
      return word.split("").map((c, j) => {
        return c;
      });
    });
  }

  gameFinished() {
    var gameFinished = true;
    for (let word of this.answer) {
      for (let character of word) {
        if (character === '-') { gameFinished = false }
      }
    }
    return gameFinished;
  }

  resetBoard() {
    this.setState({
      restart: !this.state.restart,
      title: "Iniciar partida",
      attemtps: 3,
    });
    this.movie = this.getMovie();
    this.words = this.getMovie().split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>El Ahorcado</h1>
          <GameSelector setGameMode={this.setGameMode}></GameSelector>
          <h4 id="title">{this.state.title}</h4>
        </header>
        <section>
          <Answer key={this.answer} movie={this.movie} answer={this.answer}></Answer>
          {this.state.attemtps > 0 && <CharactersBox key={this.state.restart} selectCharacter={this.selectCharacter}></CharactersBox>}
        </section>
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

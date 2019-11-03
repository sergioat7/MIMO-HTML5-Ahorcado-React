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
    }
    this.gameMode = "easy";
    this.getMovie();

    this.resetBoard = this.resetBoard.bind(this);
  }

  getMovie() {
    this.movie = "el señor de los anillos el retorno del rey";
    this.words = this.movie.split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });
    this.setAttemtps();
  }

  setAttemtps() {
    var attemtps = 0;
    for (let word of this.words) {
      attemtps += word.length;
    }
    if (this.gameMode === "easy") {
      attemtps = Math.floor(1.5 * attemtps);
    } else if (this.gameMode === "medium") {
      attemtps = Math.floor(attemtps);
    } else {
      attemtps = Math.floor(0.8 * attemtps);
    }
    this.attemtps = attemtps;
  }

  setGameMode = (mode) => {
    this.gameMode = mode;
    this.resetBoard();
  }

  selectCharacter = (character) => {
    var success = this.checkAnswer(character);
    var title = "";
    if (!success) {
      this.attemtps = this.attemtps - 1
    }
    if (this.gameFinished() === true) {
      title = "Has ganado!";
      this.attemtps = 0;
    } else if (this.attemtps > 0) {
      title = "Te quedan " + this.attemtps + " intentos";
    } else {
      this.attemtps = 0;
      title = "Has perdido";
      this.showAnswer();
    }
    this.setState({ title: title });
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
    });
    this.getMovie();
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
          {this.attemtps > 0 && <CharactersBox key={this.state.restart} selectCharacter={this.selectCharacter}></CharactersBox>}
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

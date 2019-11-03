import React, { Component } from 'react';
import GameSelector from './components/GameSelector/GameSelector.jsx';
import CharactersBox from './components/CharactersBox/CharactersBox.jsx';
import Answer from './components/Answer/Answer.jsx';
import Timer from './components/Timer/Timer.jsx';
import './App.css';

const EASY_MODE = "easy";
const MEDIUM_MODE = "medium";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restart: true,
      title: "Iniciar partida",
    }
    this.time = 0;
    this.gameMode = EASY_MODE;
    this.getMovie();

    this.setTimer = this.setTimer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
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
    this.initAttemtps();
  }

  initAttemtps() {
    var attemtps = 0;
    for (let word of this.words) {
      attemtps += word.length;
    }
    if (this.gameMode === EASY_MODE) {
      attemtps = Math.floor(1.5 * attemtps);
      this.time = 0;
    } else if (this.gameMode === MEDIUM_MODE) {
      attemtps = Math.floor(attemtps);
      this.time = 2;
    } else {
      attemtps = Math.floor(0.8 * attemtps);
      this.time = 1;
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
      this.showAnswer();
    } else if (this.attemtps > 0) {
      title = "Te quedan " + this.attemtps + " intentos";
    } else {
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

  setTimer(timeLeft) {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      this.showAnswer();
      this.setState({ title: "Has perdido" });
    }
  }

  showAnswer() {
    this.attemtps = 0;
    this.time = 0;
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
        <section key={this.state.restart}>
          {this.time > 0 && <Timer key={this.time} time={this.time} timesUp={this.setTimer}></Timer>}
          <Answer key={this.answer} movie={this.movie} answer={this.answer}></Answer>
          {this.attemtps > 0 && <CharactersBox selectCharacter={this.selectCharacter}></CharactersBox>}
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

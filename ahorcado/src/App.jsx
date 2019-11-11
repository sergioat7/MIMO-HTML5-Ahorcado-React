import React, { Component } from 'react';
import Answer from './components/Answer/Answer.jsx';
import CharactersBox from './components/CharactersBox/CharactersBox.jsx';
import GameImage from './components/GameImage/GameImage.jsx';
import GameSelector from './components/GameSelector/GameSelector.jsx';
import RankingList from './components/RankingList/RankingList.jsx';
import Timer from './components/Timer/Timer.jsx';
import UsernameInput from './components/UsernameInput/UsernameInput.jsx';

import moviesJSON from './assets/movies';
import './App.css';

const EASY_MODE = "easy";
const MEDIUM_MODE = "medium";
const DIFFICULT_MODE = "difficult";
const movies = moviesJSON.movies;
const VICTORY = 0;
const DEFEAT = 1;

class App extends Component {

  constructor(props) {
    super(props);

    var title = this.getUsername();
    this.state = {
      restart: true,
      title: title,
    }
    if (this.username !== "") {
      this.saveGameData();
    }
    this.getRankingList();

    this.changeUsername = this.changeUsername.bind(this);
    this.saveGameData = this.saveGameData.bind(this);
    this.saveGameTime = this.saveGameTime.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  //MARK: Obtención inicial de datos

  getUsername() {
    var username = localStorage.getItem('username');
    if (username != null) {
      this.username = username;
      return this.getGameData();
    } else {
      this.username = "";
      this.gameMode = EASY_MODE;
      this.answer = [];
      this.image = "";
      this.attempts = 0;
      this.time = { minutes: 0, seconds: 0 }
      return "Escribe tu usuario";
    }
  }

  getGameData() {
    var title = "Iniciar partida";
    var data = JSON.parse(localStorage.getItem('data-' + this.username));
    if (data !== null) {
      title = data.title;
      this.gameMode = data.gameMode;
      this.movie = data.movie;
      this.words = this.movie.split(" ");
      this.answer = data.answer;
      this.image = data.image;
      this.charactersSelected = data.charactersSelected;
    } else {
      this.gameMode = EASY_MODE;
      this.generateData();
    }
    var attempts = localStorage.getItem('attempts-' + this.username);
    if (attempts !== null) {
      this.attempts = parseInt(attempts)
    } else {
      this.initAttempts();
    }
    var timeData = JSON.parse(localStorage.getItem('timeData-' + this.username));
    if (timeData !== null) {
      this.time = { minutes: timeData.minutes, seconds: timeData.seconds };
    } else {
      this.initTime();
    }
    return title;
  }

  getRankingList() {
    var ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    this.rankingList = ranking;
  }

  //MARK: Generación inicial de datos

  generateData() {
    this.getMovie();
    this.image = "hangman1.png";
  }

  getMovie() {
    this.movie = movies[Math.floor(Math.random() * movies.length)];
    this.words = this.movie.split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });
    this.charactersSelected = [];
  }

  initAttempts() {
    var attempts = 0;
    for (let word of this.words) {
      attempts += word.length;
    }
    if (this.gameMode === DIFFICULT_MODE) {
      attempts = Math.floor(0.8 * attempts);
    } else if (this.gameMode === MEDIUM_MODE) {
      attempts = Math.floor(attempts);
    } else {
      attempts = Math.floor(1.5 * attempts);
    }
    this.attempts = attempts;
  }

  initTime() {
    if (this.gameMode === DIFFICULT_MODE) {
      this.time = { minutes: 1, seconds: 0 }
    } else if (this.gameMode === MEDIUM_MODE) {
      this.time = { minutes: 2, seconds: 0 }
    } else {
      this.time = { minutes: 0, seconds: 0 }
    }
    this.saveGameTime(this.time.minutes, this.time.seconds);
  }

  //MARK: Funciones del juego

  changeUsername(username) {
    this.username = username;
    localStorage.setItem('username', this.username);
    this.setState({ title: this.getGameData() });
  }

  setGameMode = (mode) => {
    this.gameMode = mode;
    this.resetBoard();
  }

  selectCharacter = (character) => {
    this.charactersSelected.push(character);
    var success = this.checkAnswer(character);
    var title = "";
    if (!success) {
      this.attempts = this.attempts - 1
    }
    if (this.gameFinished() === true) {
      title = "Has ganado!";
      this.image = "game_won.png";
      this.showAnswer(VICTORY);
    } else if (this.attempts > 0) {
      title = "Te quedan " + this.attempts + " intentos";
      this.image = this.setImage();
    } else {
      title = "Has perdido";
      this.image = "game_lost.png";
      this.showAnswer(DEFEAT);
    }
    this.setState({ title: title }, this.saveGameData);
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

  setImage() {
    var totalAttempts = 0;
    for (let word of this.words) {
      totalAttempts += word.length;
    }
    if (this.gameMode === DIFFICULT_MODE) {
      totalAttempts = Math.floor(0.8 * totalAttempts);
    } else if (this.gameMode === MEDIUM_MODE) {
      totalAttempts = Math.floor(totalAttempts);
    } else {
      totalAttempts = Math.floor(1.5 * totalAttempts);
    }
    var groups = Math.ceil(totalAttempts / 6);
    var imageID = 6 - Math.floor(this.attempts / groups);
    return "hangman" + Math.max(1,imageID) + ".png";
  }

  setTimer(timeLeft) {
    this.saveGameTime(timeLeft.minutes, timeLeft.seconds);
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      this.setState({ title: "Has perdido" });
      this.image = "game_lost.png";
      this.showAnswer(DEFEAT);
    }
  }

  showAnswer(result) {
    this.attempts = 0;
    this.time = { minutes: 0, seconds: 0 };
    this.answer = this.words.map((word, i) => {
      return word.split("").map((c, j) => {
        return c;
      });
    });
    this.saveGameData();
    this.saveRanking(result);
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

  //MARK: Funciones de guardado de datos del juego

  saveGameData() {
    var data = {
      'title': this.state.title,
      'gameMode': this.gameMode,
      'movie': this.movie,
      'answer': this.answer,
      'image': this.image,
      'charactersSelected': this.charactersSelected
    };
    localStorage.setItem('data-' + this.username, JSON.stringify(data));
    localStorage.setItem('attempts-' + this.username, this.attempts);
    localStorage.setItem('username', this.username);
  }

  saveRanking(result) {
    var ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    var userData = {
      'username': this.username,
      'victories': result === VICTORY ? 1 : 0,
      'defeats': result === DEFEAT ? 1 : 0
    };
    ranking = ranking.filter((r) => {
      if (r.username === this.username) {
        userData = r;
        if (result === VICTORY) { userData.victories++; }
        if (result === DEFEAT) { userData.defeats++; }
      }
      return r.username !== this.username;
    });
    ranking.push(userData);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.rankingList = ranking;
  }

  saveGameTime(minutes, seconds) {
    var timeData = {
      'minutes': minutes,
      'seconds': seconds
    };
    localStorage.setItem('timeData-' + this.username, JSON.stringify(timeData));
  }

  //MARK: Función de reinicio el juego

  resetBoard() {
    this.setState({
      restart: !this.state.restart,
      title: "Iniciar partida",
    });
    this.generateData();
    this.initAttempts();
    this.initTime();
    this.saveGameData();
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>El Ahorcado</h1>
          <UsernameInput username={this.username} changeUsername={this.changeUsername}></UsernameInput>
          {this.username !== "" && <GameSelector key={this.gameMode} gameMode={this.gameMode} setGameMode={this.setGameMode}></GameSelector>}
          <h4 id="title">{this.state.title}</h4>
        </header>
        <section key={this.state.restart}>
          {this.image !== "" && <GameImage key={this.image} imagePath={this.image}></GameImage>}
          {(this.time.minutes > 0 || this.time.seconds > 0) && <Timer key={this.time} time={this.time} timesUp={this.setTimer}></Timer>}
          {this.answer.length > 0 && <Answer key={this.answer} movie={this.movie} answer={this.answer}></Answer>}
          {this.attempts > 0 && <CharactersBox charactersSelected={this.charactersSelected} selectCharacter={this.selectCharacter}></CharactersBox>}
        </section>
        <footer>
          <div>
            {this.username !== "" && <button className="btn btn-warning" name="restart_game" type="button" onClick={this.resetBoard}>Reiniciar partida</button>}
          </div>
          <RankingList key={this.rankingList} rankingList={this.rankingList}></RankingList>
        </footer>
      </div>
    );
  }
}

export default App;

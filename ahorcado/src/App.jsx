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

    var initialState = this.getUsername();
    this.state = {
      restart: true,
      username: initialState.username,
      title: initialState.title,
      gameMode: initialState.gameMode,
      attempts: initialState.attempts,
      movie: initialState.movie
    }
    if (initialState.username !== "") {
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
      return this.getGameData(username);
    } else {
      this.answer = [];
      this.image = "";
      this.time = 0;
      return { username: "", title: "Escribe tu usuario", gameMode: EASY_MODE, attempts: 0 };
    }
  }

  getGameData(username) {
    var title = "Iniciar partida";
    var gameMode = EASY_MODE;
    var movie;

    var data = JSON.parse(localStorage.getItem('data-' + username));
    if (data !== null) {
      title = data.title;
      gameMode = data.gameMode;
      movie = data.movie;
      this.words = movie.split(" ");
      this.answer = data.answer;
      this.image = data.image;
      this.charactersSelected = data.charactersSelected;
    } else {
      var newData = this.generateData();
      movie = newData.movie;
    }
    
    var attempts = 0;
    var attemptsStorage = localStorage.getItem('attempts-' + username);
    if (attemptsStorage !== null) {
      attempts = parseInt(attemptsStorage);
    } else {
      attempts = this.initAttempts(gameMode);
    }

    var timeData = localStorage.getItem('time-' + username);
    if (timeData !== null) {
      this.time = timeData;
    } else {
      this.initTime(gameMode, username);
    }

    return { username: username, title: title, gameMode: gameMode, attempts: attempts, movie: movie };
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
    this.image = "hangman1.png";
    return this.getMovie();
  }

  getMovie() {
    var movie = movies[Math.floor(Math.random() * movies.length)];
    this.words = movie.split(" ");
    this.answer = this.words.map((word) => {
      return word.split("").map(() => {
        return "-";
      });
    });
    this.charactersSelected = [];
    return { movie: movie };
  }

  initAttempts(mode) {
    var attempts = 0;
    for (let word of this.words) {
      attempts += word.length;
    }
    if (mode === DIFFICULT_MODE) {
      attempts = Math.floor(0.8 * attempts);
    } else if (mode === MEDIUM_MODE) {
      attempts = Math.floor(attempts);
    } else {
      attempts = Math.floor(1.5 * attempts);
    }
    return attempts;
  }

  initTime(mode, username) {
    if (mode === DIFFICULT_MODE) {
      this.time = 60;
    } else if (mode === MEDIUM_MODE) {
      this.time = 120;
    } else {
      this.time = 0;
    }
    this.saveGameTime(this.time, username);
  }

  //MARK: Funciones del juego

  changeUsername(username) {
    localStorage.setItem('username', username);
    this.setState(this.getGameData(username));
  }

  setGameMode = (mode) => {
    this.setState({
      gameMode: mode
    }, this.resetBoard);
  }

  selectCharacter = (character) => {
    this.charactersSelected.push(character);
    var success = this.checkAnswer(character);
    var title = "";
    var attempts = this.state.attempts;
    if (!success) {
      attempts--;
    }
    if (this.gameFinished() === true) {
      title = "Has ganado!";
      this.image = "game_won.png";
      this.showAnswer(VICTORY);
      attempts = 0;
    } else if (attempts > 0) {
      title = "Te quedan " + attempts + " intentos";
      this.image = this.setImage();
    } else {
      title = "Has perdido";
      this.image = "game_lost.png";
      this.showAnswer(DEFEAT);
      attempts = 0;
    }
    this.setState({ title: title, attempts: attempts }, this.saveGameData);
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
    if (this.state.gameMode === DIFFICULT_MODE) {
      totalAttempts = Math.floor(0.8 * totalAttempts);
    } else if (this.state.gameMode === MEDIUM_MODE) {
      totalAttempts = Math.floor(totalAttempts);
    } else {
      totalAttempts = Math.floor(1.5 * totalAttempts);
    }
    var groups = Math.ceil(totalAttempts / 6);
    var imageID = 6 - Math.floor(this.state.attempts / groups);
    return "hangman" + Math.max(1,imageID) + ".png";
  }

  setTimer(timeLeft) {
    this.saveGameTime(timeLeft, this.state.username);
    if (timeLeft === 0) {
      this.setState({ title: "Has perdido", attempts: 0 });
      this.image = "game_lost.png";
      this.showAnswer(DEFEAT);
    }
  }

  showAnswer(result) {
    this.time = 0;
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
      'gameMode': this.state.gameMode,
      'movie': this.state.movie,
      'answer': this.answer,
      'image': this.image,
      'charactersSelected': this.charactersSelected
    };
    localStorage.setItem('data-' + this.state.username, JSON.stringify(data));
    localStorage.setItem('attempts-' + this.state.username, this.state.attempts);
    localStorage.setItem('username', this.state.username);
  }

  saveRanking(result) {
    var ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [];
    }
    var userData = {
      'username': this.state.username,
      'victories': result === VICTORY ? 1 : 0,
      'defeats': result === DEFEAT ? 1 : 0
    };
    ranking = ranking.filter((r) => {
      if (r.username === this.state.username) {
        userData = r;
        if (result === VICTORY) { userData.victories++; }
        if (result === DEFEAT) { userData.defeats++; }
      }
      return r.username !== this.state.username;
    });
    ranking.push(userData);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.rankingList = ranking;
  }

  saveGameTime(timeLeft, username) {
    localStorage.setItem('time-' + username, timeLeft);
  }

  //MARK: Función de reinicio el juego

  resetBoard() {
    var attempts = this.initAttempts(this.state.gameMode);
    var newData = this.generateData();
    this.initTime(this.state.gameMode, this.state.username);
    this.setState({
      restart: !this.state.restart,
      title: "Iniciar partida",
      attempts: attempts,
      movie: newData.movie
    }, this.saveGameData);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>El Ahorcado</h1>
          <UsernameInput username={this.state.username} changeUsername={this.changeUsername}></UsernameInput>
          {this.state.username !== "" && <GameSelector key={this.state.gameMode} gameMode={this.state.gameMode} setGameMode={this.setGameMode}></GameSelector>}
          <h4 id="title">{this.state.title}</h4>
        </header>
        <section key={this.state.restart}>
          {this.image !== "" && <GameImage key={this.image} imagePath={this.image}></GameImage>}
          {this.time > 0 && <Timer key={this.time} time={this.time} timesUp={this.setTimer}></Timer>}
          {this.answer.length > 0 && <Answer key={this.answer} movie={this.state.movie} answer={this.answer}></Answer>}
          {this.state.attempts > 0 && <CharactersBox charactersSelected={this.charactersSelected} selectCharacter={this.selectCharacter}></CharactersBox>}
        </section>
        <footer>
          <div>
            {this.state.username !== "" && <button className="btn btn-warning" name="restart_game" type="button" onClick={this.resetBoard}>Reiniciar partida</button>}
          </div>
          <RankingList key={this.rankingList} rankingList={this.rankingList}></RankingList>
        </footer>
      </div>
    );
  }
}

export default App;

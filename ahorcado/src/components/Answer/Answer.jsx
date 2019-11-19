import React, { Component } from 'react';
import './Answer.css';

class Answer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            words: props.movie.split(" "),
            answer: props.answer,
        }
    }

    getWords() {
        return this.state.words.map((word, i) => {
            return <ul key={i} className="answer">{this.getWordLetters(word, i)}<li className="spaceInAnswer" disabled></li></ul>
        });
    }

    getWordLetters(word, i) {
        var letters = word.split("");
        return letters.map((letter, j) => {
            return this.state.answer[i][j] === "-" ? <li key={[i]+[j]} className="characterInAnswer" disabled></li> : <li key={[i]+[j]} className="characterInAnswer" disabled>{letter}</li>
        });
    }

    render() {
        return (
            this.getWords()
        );
    }
}

export default Answer;

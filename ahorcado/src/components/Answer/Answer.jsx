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
            return <ul className="answer">{this.getWordLetters(word, i)}<li className="spaceInAnswer" disabled></li></ul>
        });
    }

    getWordLetters(word, i) {
        var letters = word.split("");
        return letters.map((letter, j) => {
            return <li className="characterInAnswer" disabled>
                {this.state.answer[i][j] === "-" ? <span>{letter}</span> : <span className="visible">{letter}</span> }
            </li>
        });
    }

    render() {
        return (
            this.getWords()
        );
    }
}

export default Answer;

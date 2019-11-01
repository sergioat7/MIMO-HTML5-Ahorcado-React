import React, { Component } from 'react';
import './CharactersBox.css';

class CharactersBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            letters: [
                { value: "a", disabled: false },
                { value: "b", disabled: false },
                { value: "c", disabled: false },
                { value: "d", disabled: false },
                { value: "e", disabled: false },
                { value: "f", disabled: false },
                { value: "g", disabled: false },
                { value: "h", disabled: false },
                { value: "i", disabled: false },
                { value: "j", disabled: false },
                { value: "k", disabled: false },
                { value: "l", disabled: false },
                { value: "m", disabled: false },
                { value: "n", disabled: false },
                { value: "ñ", disabled: false },
                { value: "o", disabled: false },
                { value: "p", disabled: false },
                { value: "q", disabled: false },
                { value: "r", disabled: false },
                { value: "s", disabled: false },
                { value: "t", disabled: false },
                { value: "u", disabled: false },
                { value: "v", disabled: false },
                { value: "w", disabled: false },
                { value: "x", disabled: false },
                { value: "y", disabled: false },
                { value: "z", disabled: false }
            ],
            numbers: [
                { value: "0", disabled: false },
                { value: "1", disabled: false },
                { value: "2", disabled: false },
                { value: "3", disabled: false },
                { value: "4", disabled: false },
                { value: "5", disabled: false },
                { value: "6", disabled: false },
                { value: "7", disabled: false },
                { value: "8", disabled: false },
                { value: "9", disabled: false }
            ]
        }

        this.selectCharacter = this.selectCharacter.bind(this);
    }

    getLetters() {
        return this.state.letters.map((letter) => {
            return <li key={letter.value} disabled={letter.disabled} onClick={this.selectCharacter}>{letter.value}</li>
        });
    }

    getNumbers() {
        return this.state.numbers.map((number) => {
            return <li key={number.value} disabled={number.disabled} onClick={this.selectCharacter}>{number.value}</li>
        });
    }

    selectCharacter(event) {
        const target = event.target;
        var letters = this.state.letters.map((letter => {
            if (letter.value === target.innerHTML) {
                letter.disabled = true;
            }
            return letter;
        }));
        var numbers = this.state.numbers.map((number => {
            if (number.value === target.innerHTML) {
                number.disabled = true;
            }
            return number;
        }));
        this.setState({
            letters: letters,
            numbers: numbers
          });
        this.props.selectCharacter(target.innerHTML);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.getLetters()}
                </ul>
                <ul>
                    {this.getNumbers()}
                </ul>
            </div>
        );
    }
}

export default CharactersBox;

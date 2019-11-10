import React, { Component } from 'react';

class GameImage extends Component {

    constructor(props) {
        super(props);
        this.imagePath = props.imagePath;
    }

    render() {
        return (
            <div>
                <img src={require('../../assets/images/'+this.imagePath)} alt="hangman_image" width="300px" height="300px"/>
            </div>
        );
    }
}

export default GameImage;
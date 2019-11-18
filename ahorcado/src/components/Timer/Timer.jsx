import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: props.time
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            var time = this.state.time
            if (time > 0) {
                this.setState(({ time }) => ({
                    time: time - 1
                }))
            } else {
                clearInterval(this.myInterval);
            }
            this.timeChanges(this.state.time);
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    timeChanges(timeLeft) {
        this.props.timesUp(timeLeft);
    }

    render() {
        var minutes = Math.floor(this.state.time / 60);
        var seconds = this.state.time - minutes * 60;
        return (
            <div>
                { this.state.time > 0 && <h5>Tiempo restante: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h5> }
            </div>
        )
    }
}

export default Timer;
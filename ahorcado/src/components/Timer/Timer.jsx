import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            minutes: props.time,
            seconds: 0
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }

            this.timeChanges(this.state);
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    timeChanges(timeLeft) {
        this.props.timesUp(timeLeft);
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { (minutes > 0 || seconds > 0) && <h5>Tiempo restante: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h5> }
            </div>
        )
    }
}

export default Timer;
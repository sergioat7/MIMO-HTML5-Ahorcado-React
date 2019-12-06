import React, { Component } from 'react';
import './RankingList.css';

class RankingList extends Component {

    getOrderedList() {
        this.props.rankingList.sort( (a, b) => {
            if (a.victories > b.victories) {
                return -1;
            }
            if (b.victories > a.victories) {
                return 1;
            }
            return 0;
        });
        return (
            <tbody>
                {this.props.rankingList.map((user, index) => {
                    return (
                        <tr key={user.username}>
                            <th scope="row">{index+1}</th>
                            <td>{user.username}</td>
                            <td>{user.victories}</td>
                            <td>{user.defeats}</td>
                        </tr>);
                })}
            </tbody>
        );
    }

    render() {
        return (
            <div id="rankingContainer">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Victorias</th>
                            <th scope="col">Derrotas</th>
                        </tr>
                    </thead>
                    {this.getOrderedList()}
                </table>
            </div>
        );
    }
}

export default RankingList;

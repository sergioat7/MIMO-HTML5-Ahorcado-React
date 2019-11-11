import React, { Component } from 'react';
import './RankingList.css';

class RankingList extends Component {

    getOrderedList() {
        this.rankingList.sort( (a, b) => {
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
                {this.rankingList.map((user, index) => {
                    return (
                        <tr key={user.username}>
                            <th scope="row">{index}</th>
                            <td>{user.username}</td>
                            <td>{user.victories}</td>
                            <td>{user.defeats}</td>
                        </tr>);
                })}
            </tbody>
        );
    }

    render() {
        this.rankingList = this.props.rankingList;
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
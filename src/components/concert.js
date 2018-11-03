import React, { Component } from "react";

export class Concert extends Component {
    render() {
        const concert = this.props.concert;
        return (
            <div>
                <h3>{concert.place}</h3>
                <p>{concert.date}</p>
            </div>
        );
    }
}

export default Concert;

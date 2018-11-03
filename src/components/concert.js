import React, { Component } from "react";

export class Concert extends Component {
    render() {
        const concert = this.props.concert;
        return (
            <div>
                <h3>{concert.venue} {concert.date.replace(/T.*$/, '')}</h3>
                <p>{concert.description}</p>
                <p>Concert starts {concert.date.replace(/^.*T(\d\d\:\d\d).*$/, '$1')}</p>
            </div>
        );
    }
}

export default Concert;

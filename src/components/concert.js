import React, { Component } from "react";

export class Concert extends Component {
    render() {
        const concert = this.props.concert;
        const title = <span>
                <span itemProp="startDate">{concert.date.replace(/T.*$/, '')}</span>
                {' - '}
                <span itemProp="location">{concert.venue}, {concert.city}</span>
            </span>;
        const titleLink = concert.eventURL ? <a href={concert.eventURL}>{title}</a> : title;
        return (
            <div itemScope itemType="https://schema.org/MusicEvent">
                <h3>{titleLink}</h3>
                <p itemProp="description">{concert.description}</p>
            </div>
        );
    }
}

export default Concert;

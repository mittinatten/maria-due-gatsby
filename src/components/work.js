import React, { Component } from "react";

class Work extends Component {
    render(data) {
        const title = this.props.work.title;
        const year = this.props.work.year;
        const artist = this.props.work.by;
        const spotify = this.props.work.spotify;

        return (
            <div>
                <p>
                    <a href={ spotify }><i className={'fas fa-play-circle'}></i></a>&nbsp;&nbsp;
                    { artist.name } - { title } - { year }
                </p>
            </div>
        );
    }
}

export default Work;

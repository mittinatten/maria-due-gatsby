import React, { Component } from "react";

class Work extends Component {
    render(data) {
        const title = this.props.work.title;
        const year = this.props.work.year;
        const artist = this.props.work.by;
        const spotify = this.props.work.spotify;

        let artistField;
        if (artist.homePage) {
            artistField = <a href={ artist.homePage }>{ artist.name }</a>;
        } else {
            artistField = artist.name;
        }

        return (
            <div style={{display: 'flex', marginBottom: '0.8rem'}}>
                <div>
                    <a href={ spotify } className="play-link"><i className={'fas fa-play-circle'}></i></a>
                </div>
                <div>
                    { artistField }: <em>{ title }</em> ({ year })
                </div>
            </div>
        );
    }
}

export default Work;

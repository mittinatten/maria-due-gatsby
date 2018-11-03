import React, { Component } from "react";

class Album extends Component {
    render() {
        const album = this.props.album;
        const spotify = album.spotify;

        return (
            <div>
                <h3>{album.title}</h3>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 4, marginRight: '20px' }}>
                        <img src={album.cover.asset.url} alt="cover"/>
                    </div>
                    <div style={{ flex: 5 }} >
                        <p>{album.year}</p>
                        <p>Listen on <a href={ spotify }>Spotify</a></p>
                    </div>
                </div>
            </div>
        );
    }
}


export default Album;

import React, { Component } from "react";

class Album extends Component {
    render() {
        const album = this.props.album;
        const spotify = album.spotify;
        console.log(spotify);
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <img src={album.cover.asset.url} alt="cover"/>
                </div>
                <div style={{ flex: 2 }} >
                    <h3>{album.title}</h3>
                    <p>{album.year}</p>
                    <p>Listen on <a href={ spotify }>Spotify</a></p>
                </div>
            </div>
        );
    }
}

export default Album;

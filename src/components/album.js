import React, { Component } from "react";

class Album extends Component {
    render(data) {
        const album = this.props.album;
        const artist = this.props.artist;
        const spotify = album.spotify;

        return (
            <div itemScope itemType="https://schema.org/MusicAlbum">
                <h3 itemProp="name">{album.title}</h3>
                <span style={{display: 'none'}} itemProp="byArtist" itemScope itemType="https://schema.org/MusicGroup">{artist}</span>
                 <div style={{ display: 'flex' }}>
                    <div style={{ flex: 4, marginRight: '20px' }}>
                        <img src={album.cover.asset.url} alt="cover"/>
                    </div>
                    <div style={{ flex: 5 }} itemProp="albumRelease" itemScope itemType="https://schema.org/MusicRelease">
                        <p itemProp="datePublished">{album.year}</p>
                        <p>Listen on <a href={ spotify }>Spotify</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;

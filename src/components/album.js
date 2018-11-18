import React, { Component } from "react";
import AlbumCover from "./album-cover";

class Album extends Component {
    render(data) {
        const album = this.props.album;
        const artist = this.props.artist;

        return (
            <div itemScope itemType="https://schema.org/MusicAlbum"
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem'
                }}>
                <span style={{display: 'none'}} itemProp="byArtist" itemScope itemType="https://schema.org/MusicGroup">{artist}</span>
                <div style={{flex: 8 }}>
                    <a href={album.fields.slug}>
                        <AlbumCover album={album}></AlbumCover>
                    </a>
                </div>
                <div itemProp="name" style={{flex: 1}}>
                    <a href={album.fields.slug}>{album.title}</a>
                </div>
            </div>
        );
    }
}

export default Album;

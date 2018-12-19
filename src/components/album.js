import React, { Component } from "react";
import AlbumCover from "./album-cover";

class Album extends Component {
    render(data) {
        const { album, artistName, artistSameAs } = this.props;

        return (
            <div itemScope itemType="https://schema.org/MusicAlbum"
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem'
                }}>
                <span style={{display: 'none'}} itemProp="byArtist">
                    <span itemScope itemType="https://schema.org/MusicGroup">
                        <span itemProp="sameAs">{artistSameAs}</span>
                        <span itemProp="name">{artistName}</span>
                    </span>
                </span>
                <div style={{flex: 8 }}>
                    <a href={album.fields.slug}>
                        <AlbumCover album={album}></AlbumCover>
                    </a>
                </div>
                <div style={{flex: 1}}>
                    <a href={album.fields.slug} itemProp="name">{album.title}</a>
                </div>
            </div>
        );
    }
}

export default Album;

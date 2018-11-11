import React, { Component } from "react";

class Album extends Component {
    render(data) {
        const album = this.props.album;
        const artist = this.props.artist;
        let cover;
        if (album.cover) {
            cover = <img src={album.cover.asset.url} alt="cover" style={{margin: 0}}/>
        }

        return (
            <div itemScope itemType="https://schema.org/MusicAlbum">
                <span style={{display: 'none'}} itemProp="byArtist" itemScope itemType="https://schema.org/MusicGroup">{artist}</span>
                { cover }
                <p itemProp="name"><a href={album.fields.slug}>{album.title}</a></p>
                {/* <div itemProp="albumRelease" itemScope itemType="https://schema.org/MusicRelease" style={{marginBottom: '1rem'}}>
                    <span itemProp="datePublished">{album.year}</span>
                    <a href={ spotify } style={{padding: '0px 8px'}}><i class="fas fa-play-circle"></i></a>
                </div>
                */}
            </div>
        );
    }
}

export default Album;

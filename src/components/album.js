import React, { Component } from "react";

class Album extends Component {
    render(data) {
        const album = this.props.album;
        const artist = this.props.artist;
        let cover;

        if (album.cover) {
            cover = <img src={album.cover.asset.url} alt="cover" style={{margin: 0}}/>
        } else {
            cover =
                <div style={{
                    backgroundColor: 'yellow',
                    width: '100%',
                    height: 0,
                    paddingTop: '45%',
                    paddingBottom: '55%',
                    textAlign: 'center'
                }}>
                    <div>
                        { album.title }<br />
                        { album.year }
                    </div>
                </div>
        }

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
                    { cover }
                </div>
                <div itemProp="name" style={{flex: 1}}>
                    <a href={album.fields.slug}>{album.title}</a>
                </div>
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

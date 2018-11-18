import React, { Component } from "react";

class AlbumCover extends Component {
    render(data) {
        const album = this.props.album;
        let cover;
        if (album.cover) {
            cover = <img src={album.cover.asset.url} alt="cover" style={{margin: 0}}/>;
        } else {
            cover =
                <div style={{
                    display: 'block',
                    backgroundColor: 'yellow',
                    width: '100%',
                    height: 0,
                    paddingTop: '45%',
                    paddingBottom: '55%',
                    textAlign: 'center',
                    textDecoration: 'none'
                }}>
                    <div>
                        { album.title }<br />
                        { album.year }
                    </div>
                </div>;
        }

        return cover;
    }
}

export default AlbumCover;

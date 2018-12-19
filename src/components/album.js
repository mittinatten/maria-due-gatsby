import React, { Component } from "react";
import AlbumCover from "./album-cover";

class Album extends Component {
    render(data) {
        const { album } = this.props;

        return (
            <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem'
                }}>
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

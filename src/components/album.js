import React, { Component } from "react";

class Album extends Component {
    render() {
        const album = this.props.album;
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <img src={album.cover.asset.url} alt="cover"/>
                </div>
                <div style={{ flex: 2 }} >
                    <h3>{album.title}</h3>
                    <p>{album.year}</p>
                </div>
            </div>
        );
    }
}

export default Album;

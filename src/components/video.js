import React, { Component } from "react";

export class Video extends Component {
    render() {
        const video = this.props.video;
        const id = video.url.match(/v=(\w+)$/)[1];
        return (
            <div style={{padding: '5px'}}>
                <h3>{video.title}</h3>
                <a href={video.url} title={video.title}>
                    <img src={ 'https://img.youtube.com/vi/' + id + '/0.jpg' } alt="thumbnail" />
                </a>
            </div>
        );
    }
}

export default Video;

import React, { Component } from "react";

export class Video extends Component {
    constructor(props) {
        super(props);
        this.state = { showImage: true };
    }

    displayVideo = () => {
        this.setState(state => ({
            showImage: false
        }));
    }

    render() {
        const video = this.props.video;
        const id = video.url.match(/v=(\w+)$/)[1];

        let videoFrame;

        const videoFrameStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer',
            width: '100%',
            height: '96%',
            backgroundColor: 'black'
        }

        if (this.state.showImage) {
            videoFrame =
                <span href="#"
                  style={videoFrameStyle}
                  title={video.title}
                  onClick={this.displayVideo}>
                   <img src={ 'https://img.youtube.com/vi/' + id + '/0.jpg' } alt="thumbnail" />
                </span>;
        } else {
            videoFrame =
                    <iframe style={videoFrameStyle}
                      allowFullScreen="allowfullscreen"
                      id="ytplayer" type="text/html" width="640" height="360"
                      src={'https://www.youtube.com/embed/' + id + '?autoplay=1'} title={video.title}
                      frameBorder="0"></iframe>
        }
        return (
            <div style={{marginBottom: '35px'}}>
                <div style={{ position: 'relative', height: 0, paddingTop: '25px', paddingBottom: '68%'}}>
                    {videoFrame}
                </div>
                <p><a href={video.url}>{video.title}</a></p>
            </div>
        );
    }
}

export default Video;

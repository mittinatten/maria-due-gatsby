import React from "react";

export const Video = ({video, withLink}) => {
    const id = video.url.match(/v=(\w+)$/)[1];

    const videoFrameStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer',
        width: '100%',
        height: '96%',
        backgroundColor: 'black'
    }

    return (
        <div style={{marginBottom: '35px'}}>
            <div style={{ position: 'relative', height: 0, paddingTop: '25px', paddingBottom: '68%'}}>
                <iframe style={videoFrameStyle}
                  allowFullScreen="allowfullscreen"
                  id="ytplayer" type="text/html" width="640" height="360"
                  src={'https://www.youtube.com/embed/' + id + '?autoplay=0&modestbranding=1'} title={video.title}
                  frameBorder="0"></iframe>
            </div>
            { withLink
                ? <p><a href={video.url}>{video.title}</a></p>
                : null }
        </div>
    );
};

export default Video;

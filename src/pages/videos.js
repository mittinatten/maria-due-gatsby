import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Video from '../components/video';

import './style.css';

export const VideoPage = ({ data }) => {
    const concerts = data.allVideo.edges.map(edge =>
        <Video video={edge.node} key={edge.node._id} />
    );

    return(
            <Layout>
                <div className='cards'>
                { concerts }
                </div>
            </Layout>
    );
}

export const query = graphql`
  query {
    allVideo(sort: {fields: [ sortOrder ], order: DESC} ) {
      totalCount,
      edges {
        node {
          _id,
          url,
          title,
          sortOrder
        }
      }
    }
  }
`;


export default VideoPage

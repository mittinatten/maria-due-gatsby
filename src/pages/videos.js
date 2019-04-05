import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet'

import Layout from '../components/layout';
import Video from '../components/video';

export const VideoPage = ({ data, location }) => {
    const videos = data.allVideo.edges.map(edge =>
        <Video video={edge.node} key={edge.node._id} />
    );

    return(
            <Layout location={location}
                breadCrumb={[{title: 'Videos'}]}>
                <Helmet meta={[
                    { name: 'description', content: 'Music videos by Maria Due' }
                ]}>
                    <title>Maria Due - Videos</title>
                </Helmet>
                <h1>Videos</h1>
                <div className='cards'>
                { videos }
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

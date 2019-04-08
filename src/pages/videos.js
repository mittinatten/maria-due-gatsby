import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet'

import Layout from '../components/layout';
import Video from '../components/video';

export const VideoPage = ({ data }) => {
    const { allVideo, site } = data;
    const { aboutName } = site.siteMetadata;
    const videos = allVideo.edges.map(edge =>
        <Video video={edge.node} key={edge.node._id} withLink={true}/>
    );

    return(
            <Layout breadCrumb={[{title: 'Videos'}]}>
                <Helmet meta={[
                    { name: 'description', content: 'Music videos by ' + {aboutName} + '.' }
                ]}>
                    <title>{aboutName} - Videos</title>
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
        },
        site {
            siteMetadata {
                aboutName,
            }
        }
    }
`;


export default VideoPage

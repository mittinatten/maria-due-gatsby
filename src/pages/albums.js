import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Album from '../components/album';

export const AlbumPage = ({ data }) => {
    const albums = data.allAlbum.edges.map(edge =>
        <Album album={edge.node} key={edge.node._id}/>
    );

    return(
            <Layout>
            { albums }
            </Layout>
    );
}

export const query = graphql`
  query {
    allAlbum {
      totalCount,
      edges {
        node {
          _id,
          title,
          year,
          spotify,
          cover {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;


export default AlbumPage

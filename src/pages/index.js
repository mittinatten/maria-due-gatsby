import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Album from '../components/album';
import Concert from '../components/concert';

export const IndexPage = ({ data }) => {
    const concerts = data.allConcert.edges.map(edge =>
        <Concert concert={edge.node} key={edge.node._id} />
    );
    const albums = data.allAlbum.edges.map(edge =>
        <Album album={edge.node} key={edge.node._id}/>
    );
    return(
            <Layout>
            <h2>Albums</h2>
            { albums }
            <h2 style={{ marginTop: '2rem' }}>Concerts</h2>
            { concerts }
            </Layout>
    );
}

export default IndexPage

export const query = graphql`
  query {
    allAlbum {
      totalCount,
      edges {
        node {
          _id,
          title,
          year,
          cover {
            asset {
              url
            }
          }
        }
      }
    },
    allConcert {
      totalCount,
      edges {
        node {
          _id,
          place,
          date
        }
      }
    },
  }
`;

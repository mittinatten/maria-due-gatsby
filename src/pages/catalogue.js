import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Album from '../components/album';
import Work from '../components/work';

export const AlbumPage = ({ data }) => {
    const albums = data.allAlbum.edges.map(edge =>
        <Album album={edge.node} artist={data.site.siteMetadata.about} key={edge.node._id}/>
    );

    const appearsOn = data.allAppearsOn.edges.map(edge =>
        <Work work={edge.node} key={edge.node._id}></Work>
    );

    return(
            <Layout>
                { albums }
                <h2>Collaborations</h2>
                { appearsOn }
            </Layout>
    );
}

export const query = graphql`
  query {
    allAlbum(sort: {fields: [ year ], order: DESC} ) {
      totalCount,
      edges {
        node {
          _id,
          title
        }
      }
    },
    allAppearsOn(sort: {fields: [ year ], order: DESC}) {
        totalCount,
        edges {
            node {
                _id,
                title,
                year,
                spotify,
                by {
                    name
                }
            }
        }
    }
    site {
      siteMetadata {
        about
      }
    }
  }
`;


export default AlbumPage

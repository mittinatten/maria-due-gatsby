import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Album from '../components/album';
import Work from '../components/work';

export const AlbumPage = ({ data }) => {
    const albums = data.allAlbum.edges.map(edge =>
        <div style={{minHeight: '200px'}}  key={edge.node._id}>
            <Album album={edge.node} artist={data.site.siteMetadata.about}/>
        </div>
    );

    const appearsOn = data.allAppearsOn.edges.map(edge =>
        <Work work={edge.node} key={edge.node._id}></Work>
    );

    return(
            <Layout>
                <div className="cards">{ albums }</div>
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
                    title,
                    year,
                    spotify,
                    cover {
                        asset {
                            url
                        }
                    }
                    fields {
                        slug
                    }
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

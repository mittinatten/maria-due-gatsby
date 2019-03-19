import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet'

import Layout from '../components/layout';
import Album from '../components/album';
import Work from '../components/work';

export const AlbumPage = ({ data }) => {
    const { aboutName } = data.site.siteMetadata;

    const albums = data.allAlbum.edges.map(edge =>
        <div style={{minHeight: '200px'}}  key={edge.node._id}>
            <Album album={edge.node} {...data.site.siteMetadata} />
        </div>
    );

    const appearsOn = data.allAppearsOn.edges.map(edge =>
        <Work work={edge.node} key={edge.node._id}></Work>
    );

    return(
            <Layout>
                <Helmet meta={[
                    { name: 'description', content: 'List of albums by ' + {aboutName} + ' and collaborations'}
                ]}>
                    <title>{aboutName} - Catalogue</title>
                </Helmet>
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
                    producer {
                        name,
                        homePage,
                        sameAs
                    },
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
                        name,
                        homePage
                    }
                }
            }
        },
        site {
            siteMetadata {
                about,
                aboutName,
                siteUrl
            }
        }
    }
`;


export default AlbumPage

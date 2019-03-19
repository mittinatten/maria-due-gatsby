import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Concert from '../components/concert';

export const ConcertPage = ({ data }) => {
    const { siteMetadata } = data.site;

    const concerts = data.allConcert.edges.map(edge =>
        <Concert concert={edge.node} {...siteMetadata} key={edge.node._id} />
    );

    return(
        <Layout>
            <Helmet meta={[
                { name: 'description', content: 'Concert calendar for Maria Due.'}
            ]}>
                <title>Maria Due - Calendar</title>
            </Helmet>
            { concerts }
        </Layout>
    );
}

export const query = graphql`
    query {
        allConcert(sort: {fields: [ date ], order: ASC} ) {
            totalCount,
            edges {
                node {
                    _id,
                    venue,
                    date,
                    description,
                    eventURL,
                    city,
                    country
                }
            }
        }
        site {
            siteMetadata {
                about,
                aboutName,
                siteUrl
            }
        }
    }
`;

export default ConcertPage

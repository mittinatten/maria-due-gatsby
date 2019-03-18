import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Concert from '../components/concert';

export const ConcertPage = ({ data }) => {
    const { about, aboutName } = data.site.siteMetadata;

    const concerts = data.allConcert.edges.map(edge =>
        <div itemProp="event" key={edge.node._id}
            itemScope itemType="https://schema.org/MusicEvent">
            <span itemProp="performer"
                itemScope itemType="https://schema.org/MusicGroup">
                <meta itemProp="name" content={aboutName} />
                <meta itemProp="sameAs" content={about} />
            </span>
            <Concert concert={edge.node} />
        </div>
    );

    return(
        <Layout>
            <Helmet>
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
                aboutName
            }
        }
    }
`;

export default ConcertPage

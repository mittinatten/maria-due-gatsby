import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import Concert from '../components/concert';

export const ConcertPage = ({ data }) => {
    const concerts = data.allConcert.edges.map(edge =>
        <div itemProp="event" key={edge.node._id}>
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
    allConcert {
      totalCount,
      edges {
        node {
          _id,
          venue,
          date,
          description,
          eventURL,
          city
        }
      }
    }
  }
`;


export default ConcertPage

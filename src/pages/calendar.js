import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Concert from '../components/concert';

export const ConcertPage = ({ data }) => {
    const concerts = data.allConcert.edges.map(edge =>
        <Concert concert={edge.node} key={edge.node._id} />
    );

    return(
            <Layout>
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
          description
        }
      }
    }
  }
`;


export default ConcertPage

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    return(
            <Layout>
            {data.frontMatter.body}
            </Layout>
    );
}

export default IndexPage

export const query = graphql`
  query {
    frontMatter {
        _id,
        body
    }
  }
`;

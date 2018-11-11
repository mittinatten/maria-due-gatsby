import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    return(
            <Layout>
            <h2>{data.frontMatter.title}</h2>
            <p>{data.frontMatter.body}</p>
            </Layout>
    );
}

export default IndexPage

export const query = graphql`
  query {
    frontMatter {
        _id,
        body,
        title
    }
  }
`;

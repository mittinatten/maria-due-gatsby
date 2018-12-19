import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    return(
            <Layout>
            <h2>{data.frontMatter.title}</h2>
            <BlockContent blocks={JSON.parse(data.frontMatter.body_toString)} />
            </Layout>
    );
}

export default IndexPage

export const query = graphql`
  query {
    frontMatter {
        _id,
        body_toString,
        title
    }
  }
`;

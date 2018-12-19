import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    return(
            <Layout>
            <h2>{data.frontMatter.title}</h2>
            <p>{data.frontMatter.body}</p>
            <h3>Contact</h3>
            <p>{data.contactInfo.description} <a href={'mailto:' + data.contactInfo.email}>{data.contactInfo.email}</a></p>
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
    },
    contactInfo {
        _id,
        email,
        description
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    const { frontMatter, site, contactInfo } = data;
    return(
        <Layout breadCrumb={[{ title: 'About' }]}>
            <Helmet>
                <title>{site.siteMetadata.aboutName} - About</title>
            </Helmet>
            <h2>{frontMatter.title}</h2>
            <BlockContent blocks={JSON.parse(frontMatter.body_toString)} />
            <h3>Contact</h3>
            <p>{contactInfo.description} <a href={'mailto:' + contactInfo.email}>{contactInfo.email}</a></p>
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
        },
        contactInfo {
            _id,
            email,
            description
        },
        site {
            siteMetadata {
                aboutName,
            }
        }
    }
 `;

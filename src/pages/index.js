import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Helmet from 'react-helmet';

import Layout from '../components/layout';

export const IndexPage = ({ data }) => {
    return(
            <Layout breadCrumb={[]}>
                <Helmet meta={[
                    { name: 'description', content: data.frontMatter.title },
                    { name: 'og:image', content: data.frontMatter.image.asset.url }
                ]} />
                <h2>{data.frontMatter.title}</h2>
                <div style={{display: 'flex', flexWrap: 'no-wrap'}}>
                    <div style={{maxWidth: '40%', margin: '0 1rem' }}>
                        <img src={data.frontMatter.image.asset.url} alt="Illustration" />
                    </div>
                    <BlockContent blocks={JSON.parse(data.frontMatter.body_toString)} />
                </div>
            </Layout>
    );
}

export default IndexPage

export const query = graphql`
  query {
    frontMatter {
        _id,
        body_toString,
        title,
        image {
            asset {
                url
            }
        }
    }
  }
`;

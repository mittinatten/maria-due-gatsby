import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header';
import './style.css';
import image from '../images/mariadue-the-colour-white.jpg'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title,
            description,
            url,
            about,
            aboutName
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
            { name: 'google-site-verification', content: 'zo-B2TdZe7lSw-ZoS0usXLKmwI380HjWKWlsSzFKVa8' },
            { name: 'og:image', content: image }
          ]}
          link={[
            {
              rel: 'stylesheet',
              href: 'https://use.fontawesome.com/releases/v5.5.0/css/all.css',
              integrity: 'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU',
              crossorigin: 'anonymous'
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div itemScope itemType="https://schema.org/MusicGroup"
          style={{
            margin: '0 auto',
            maxWidth: 800,
            padding: '0px 1.0875rem 1.45rem',
          }}
        >
          <span style={{display: 'none'}}>
            <span itemProp="name">{data.site.siteMetadata.aboutName}</span>
            <span itemProp="sameAs">{data.site.siteMetadata.about}</span>
          </span>
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

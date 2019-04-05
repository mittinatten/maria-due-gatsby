import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router';

import Header from './header';
import './style.css';
import image from '../images/default.jpg';

const MetaHeader = ({location, siteMetadata, breadcrumbList }) => {
    const { title, description, keywords, about, aboutName, siteUrl, city, country, email } = siteMetadata;
    const owner = {
        '@type': 'Person',
        name: aboutName,
        sameAs: about,
        email: email,
        address: {
            '@type': 'PostalAddress',
             addressLocality: city,
             addressCountry: country
        }
    };

    return <Helmet
        title={title}
        meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
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
        ]} >
        <html lang="en" />
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: aboutName,
                description: description,
                url: siteUrl,
                image: image,
                copyrightHolder: owner,
                author: owner
            })}
        </script>
        <script type="application/ld+json">
        {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: aboutName,
            '@id': siteUrl,
            sameAs: about
        })}
        </script>
        { location && location.href && <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                numberOfItems: breadcrumbList.length,
                itemListElement: breadcrumbList.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'Thing',
                        '@id': (item.link && item.link.replace(/^\//, siteUrl + '/')) || location.href,
                        name: item.title,
                    }
                }))
            })}
        </script> }
    </Helmet>
};

// a breadcrumb without link is assumed to be the last item and have location as path, only for json-ld.
const Layout = ({ breadCrumb, children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title,
                        description,
                        siteUrl,
                        about,
                        aboutName,
                        city,
                        country,
                        email
                    }
                }
            }
        `}
        render={data => {
            const { title, aboutName, siteUrl } = data.site.siteMetadata;
            const breadcrumbList = [{ title: aboutName, link: siteUrl }].concat(breadCrumb || []);

            return (<Location>
                    {({ location }) =>
                        (<>
                            <MetaHeader siteMetadata={data.site.siteMetadata}
                                location={location}
                                breadcrumbList={breadcrumbList}/>
                            <Header siteTitle={title} breadCrumb={breadCrumb} />
                            <div style={{
                                margin: '0 auto',
                                maxWidth: 800,
                                padding: '0px 1.0875rem 1.45rem',
                            }}>
                                {children}
                            </div>
                        </> )
                   }
                </Location>)
        }
    }
    />)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    breadCrumb: PropTypes.array
}

export default Layout

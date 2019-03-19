import React from "react";
import image from '../images/default.jpg';
import Helmet from 'react-helmet';

export const Concert = ({ concert, siteUrl, aboutName, about }) => {
    return (
        <div style={{display: 'flex', cursor: concert.eventURL ? 'pointer' : 'default'}}
            onClick={() => concert.eventURL ? window.open(concert.eventURL) : null}
        >
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'http://schema.org',
                        '@type': 'Event',
                        startDate: concert.date,
                        endDate: concert.date,
                        name: aboutName + ' at ' + concert.venue,
                        image: siteUrl + image,
                        url: concert.url,
                        location: {
                            '@type': 'Place',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: concert.city,
                                addressCountry: concert.country
                            },
                            name: concert.venue
                        },
                        description: concert.description,
                        offers: [],
                        performers: {
                            '@type': 'MusicGroup',
                            name: aboutName,
                            sameAs: about,
                            url: siteUrl
                        }
                    })}
                </script>
            </Helmet>
            <div style={{minWidth: 150, maxWidth: 150}}>
                <div style={{fontSize: '1.2rem'}}>
                    {concert.date.replace(/T.*$/, '')}
                </div>
                { concert.eventURL ? <meta itemProp="sameAs" content={concert.eventURL} /> : '' }
                <div style={{textTransform: 'uppercase', color: 'grey', fontSize: '0.85rem'}}>
                   {concert.city + ', ' + concert.country}
                </div>
            </div>
            <div>
                <h3 style={{marginBottom: '0.5rem', textDecoration: concert.eventURL ? 'underline' : 'none'}}>
                    {concert.venue}
                </h3>
                <p>{concert.description}</p>
            </div>
        </div>
    );
};

export default Concert;

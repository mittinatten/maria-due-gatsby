import React from "react";
import image from '../images/default.jpg';
import Helmet from 'react-helmet';
import './concert.css';

export const Concert = ({ concert, siteUrl, aboutName, about }) => {
    return (
        <div className="concert">
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
                            name: concert.venue,
                            sameAs: concert.venueURL
                                ? concert.venueURL
                                : null
                        },
                        description: concert.description,
                        offers: concert.tickets
                            ? [{
                                '@type': 'Offer',
                                url: concert.tickets
                                }]
                            : [],
                        performers: {
                            '@type': 'MusicGroup',
                            name: aboutName,
                            sameAs: about,
                            url: siteUrl
                        }
                    })}
                </script>
            </Helmet>
            <div className="meta">
                <div className="date">
                    {concert.date.replace(/T.*$/, '')}
                </div>
                <div className="address">
                    {concert.city + ', ' + concert.country}
                 </div>

            </div>
            <div className="description">
                <h2>
                    { concert.venue }
                </h2>
                <p>{concert.description}</p>
                <div className="links">
                    { concert.tickets &&
                        <a href={concert.tickets}>Tickets</a>
                    }
                    { concert.eventURL &&
                        <a href={concert.eventURL}>Event</a>
                    }
                    { concert.venueURL &&
                        <a href={concert.venueURL}>Venue</a>
                    }
                </div>
            </div>
        </div>
    );
};

export default Concert;

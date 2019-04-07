import React from "react";
import AlbumCover from "./album-cover";
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

export const albumMetadata = ({album, aboutName, about, siteUrl}) =>
    ({
        '@context': 'http://schema.org',
        '@type': 'MusicAlbum',
        '@id': siteUrl + album.fields.slug,
        url: siteUrl + album.fields.slug,
        byArtist: {
            '@type': 'MusicGroup',
            '@id': siteUrl,
            name: aboutName,
            sameAs: about,
            url: siteUrl
        },
        name: album.title,
        image: album.cover && album.cover.asset.url,
        datePublished: album.year,
        producer:  album.producer && {
            '@type': 'Person',
            '@id': album.producer.homePage,
            name: album.producer.name,
            url: album.producer.homePage
        },
    });


const Album = ({aboutName, about, album }) =>
    (<div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1rem'
        }}>
        <Helmet>
            <script type="application/ld+json">
               {JSON.stringify(albumMetadata({ aboutName, about, album }))}
            </script>
        </Helmet>
        <div style={{flex: 8 }}>
            <Link to={album.fields.slug}>
                <AlbumCover album={album}></AlbumCover>
            </Link>
        </div>
        <div style={{flex: 1}}>
            <Link to={album.fields.slug}>
                {album.title}
            </Link>
        </div>
    </div>);

export default Album;

import React from "react";
import AlbumCover from "./album-cover";
import Helmet from 'react-helmet';

export const albumMetadata = ({album, aboutName, about, siteUrl}) =>
    ({
        '@context': 'http://schema.org',
        '@type': 'MusicAlbum',
        byArtist: {
            '@type': 'MusicGroup',
            name: aboutName,
            sameAs: about,
            url: siteUrl
        },
        name: album.title,
        url: siteUrl + album.fields.slug,
        image: album.cover && album.cover.asset.url,
        datePublished: album.year,
        producer:  album.producer && {
            '@type': 'Person',
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
            <a href={album.fields.slug}>
                <AlbumCover album={album}></AlbumCover>
            </a>
        </div>
        <div style={{flex: 1}}>
            <a href={album.fields.slug}>
                {album.title}
            </a>
        </div>
    </div>);

export default Album;

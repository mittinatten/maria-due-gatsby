import React from "react";
import Helmet from 'react-helmet'
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import AlbumCover from "../components/album-cover";
import { albumMetadata } from '../components/album';
import "./album.css"

export default ({ data }) => {
    const { album } = data;
    const { fields } = album;
    const { about, aboutName, siteUrl } = data.site.siteMetadata;
    let songs;
    let play;
    let release;
    let producer;

    if (album.spotify) {
        play = <a href={ album.spotify } className='play-link'><i className={'fas fa-play-circle'}></i></a>;
    }

    if (fields.songs) {
        songs =
            <div>
                <ol>
                    { album.fields.songs.map(song =>
                        <li key={song.slug}>
                            <Link to={song.slug}>{ song.title }</Link>
                        </li>)
                    }
                </ol>
            </div>;
    }

    if (album.recordLabel) {
        let label;
        if (album.recordLabel.homePage) {
            label = <a href={album.recordLabel.homePage}>{album.recordLabel.name}</a>;
        } else {
            label = album.recordLabel.name;
        }

        release =
            <span>
                Released on { label } in <span itemProp="datePublished">{album.year}</span>.
            </span>
    }

    if (album.producer) {
        let name;
        if (album.producer.homePage) {
            name = <a href={album.producer.homePage}>{album.producer.name}</a>;
        } else {
            name = album.producer.name;
        }

        producer =
            <span>
                Produced by <span itemProp="name">{ name }</span>.
            </span>;
    }

    const meta = [
        { name: 'description', content: 'Album by Maria Due, released in ' + album.year}
    ];

    if (album.cover && album.cover.asset) {
        meta.push({ name: 'og:image', content: album.cover.asset.url});
    }

    return (
        <Layout breadCrumb={[
            {title: 'Albums', link: '/catalogue'},
            {title: album.title, link: fields.slug }
        ]}>
            <Helmet meta={meta}>
                <title>{aboutName} - {album.title} (album)</title>
                <script type="application/ld+json">
                    {JSON.stringify({
                        ...albumMetadata({ aboutName, about, album }),
                        track: album.fields.songs.map(song => ({
                            '@type': 'MusicRecording',
                            recordingOf: {
                                '@type': 'MusicComposition',
                                '@id': siteUrl + song.slung,
                                name: song.title,
                                url: siteUrl + song.slug
                            }
                        }))
                    })}
                </script>
            </Helmet>
            <div style={{marginBottom: '1rem'}}>
                <h1>{play}<span itemProp="name">{album.title} ({album.year})</span></h1>
                <div className="album">
                    <div className="cover">
                        <AlbumCover album={album}></AlbumCover>
                    </div>
                    <div className="songs">
                        { songs }
                    </div>
                </div>
                <p>{ producer } { release }</p>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        album(fields: { slug: { eq: $slug } }) {
            title,
            spotify,
            year,
            cover {
                asset {
                    url
                }
            },
            recordLabel {
                name,
                homePage
            },
            producer {
                name,
                homePage,
                sameAs
            },
            fields {
                slug,
                songs {
                    title,
                    slug
                }
            }
        },
        site {
            siteMetadata {
                about,
                aboutName,
                siteUrl
            }
        }
    }
`;

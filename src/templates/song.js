import React from "react";
import { graphql } from "gatsby";
import Helmet from 'react-helmet'

import Layout from "../components/layout";
import Video from "../components/video";

import "./song.css";

export default ({ data, location }) => {
    let lyricsMarkup;
    let albumMarkup;
    let creator;
    const { song, site } = data;
    const { title, video, lyrics, album, fields } = song;

    const { about, aboutName, siteUrl } = site.siteMetadata;

    if (data.song.lyrics) {
        lyricsMarkup = lyrics.split('\n').map((line, index) =>
            <div key={index} className="textline">{ line }</div>);
    }

    if (album && fields && fields.albumSlug) {
        albumMarkup =
            <p>
                {'Song recorded by '}
                {aboutName}
                {' in '}
                { album.year }
                {' on the album '}
                <a href={fields.albumSlug}>{ album.title }</a>.
            </p>
    }

    if (JSON.stringify(fields.lyricsBy) === JSON.stringify(fields.musicBy)) {
        const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
        creator =
            <p className="credits">
                Words and music by {lyricsByNames}.
            </p>
    } else {
        const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ').replace(/,(?!.*,)/, ' and');
        const musicByNames = fields.musicBy.map(person => person.name).join(', ').replace(/,(?!.*,)/, ' and');
        creator =
            <p className="credits">
                Composition by {musicByNames}.<br />
                Lyrics by {lyricsByNames}.
            </p>
    }

    return (
        <Layout breadCrumb={[
                { title: album.title, link: fields.albumSlug },
                { title: song.title, link: fields.slug }]}>
            <Helmet meta={[
                { name: 'description', content: 'Song perfromed by Maria Due'}
            ]}>
                <title>{aboutName} - { data.song.title } (song)</title>
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'http://schema.org',
                        '@type': 'MusicComposition',
                        '@id': siteUrl + fields.slug,
                        url: siteUrl + fields.slug,
                        name: title,
                        composer: fields.musicBy.map(person => ({
                            '@type': 'Person',
                            ...person
                        })),
                        lyricist: fields.lyricsBy.map(person => ({
                            '@type': 'Person',
                            ...person
                        })),
                        datePublished: album.year,
                        recordedAs: {
                            '@type': 'MusicRecording',
                            inAlbum: {
                                '@type': 'MusicAlbum',
                                name: album.title,
                                datePublished: album.year,
                                url: siteUrl + fields.albumSlug
                            },
                            byArtist: {
                                '@type': 'MusicGroup',
                                name: aboutName,
                                sameAs: about
                            }
                        },
                        lyrics: {
                            '@type': 'CreativeWork',
                            text: lyrics
                        },
                        associatedMedia: video && {
                            '@type': 'MediaObject',
                            embedUrl: video
                        }
                    })}
                </script>
            </Helmet>
            <h1>{ title }</h1>
            <div className="lyrics">{ lyricsMarkup }</div>
            { creator }
            <div className="credits">
                { albumMarkup }
            </div>
            { video
                ? <div style={{maxWidth: 500}}><Video video={{url: video, title: title}} withLink={false} /></div>
                : null }
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        song(fields: { slug: { eq: $slug } }) {
            title,
            lyrics,
            album {
                title,
                year
            },
            video,
            fields {
                slug,
                albumSlug,
                lyricsBy {
                    name,
                    sameAs
                },
                musicBy {
                    name,
                    sameAs
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

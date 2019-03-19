import React from "react";
import { graphql } from "gatsby";
import Helmet from 'react-helmet'

import Layout from "../components/layout";

import "./song.css";

export default ({ data }) => {
    let lyrics;
    let album;
    let creator;
    const fields = data.song.fields;
    const { about, aboutName } = data.site.siteMetadata;

    if (data.song.lyrics) {
        lyrics = data.song.lyrics.split('\n').map((line, index) =>
            <div key={index} className="textline">{ line }</div>);
    }

    if (data.song.album && fields && fields.albumSlug) {
        album =
            <p>
                Recorded by&nbsp;
                <span itemProp="byArtist" itemScope itemType="https://schema.org/MusicGroup">
                    <span itemProp="name">{aboutName}</span>
                    <meta itemProp="sameAs" content={about} />
                </span>
                &nbsp;in&nbsp;
                <span itemProp="datePublished">{ data.song.album.year }</span>
                &nbsp;on the album&nbsp;
                <a itemProp="sameAs" href={fields.albumSlug}>
                    <span itemProp="name">
                        { data.song.album.title }
                    </span>
                </a>
                .
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

    const lyricsMicrodata = fields.lyricsBy.map(person =>
        <span style={{display: 'none'}}
            itemProp="lyricist"
            itemScope itemType="https://schema.org/Person"
            key={person.sameAs}>
            <span itemProp="sameAs">{person.sameAs}</span>
            <span itemProp="name">{person.name}</span>
        </span>
    );

    const musicMicrodata = fields.musicBy.map(person =>
        <span style={{display: 'none'}}
            itemProp="composer"
            itemScope itemType="https://schema.org/Person" key={person.sameAs}>
            <span itemProp="sameAs">{person.sameAs}</span>
            <span itemProp="name">{person.name}</span>
        </span>
    );

    return (
        <Layout>
            <Helmet meta={[
                { name: 'description', content: 'Song perfromed by Maria Due'}
            ]}>
                <title>{aboutName} - { data.song.title } (song)</title>
            </Helmet>
            <div itemScope itemType="https://schema.org/MusicComposition">
                <h2 itemProp="name">{ data.song.title }</h2>
                { lyricsMicrodata }
                { musicMicrodata }
                <div className="lyrics"
                    itemProp="lyrics"
                    itemScope itemType="https://schema.org/CreativeWork">
                    <div itemProp="text">{ lyrics }</div>
                </div>
                { creator }
                <div itemProp="recordedAs"
                    itemScope itemType="https://schema.org/MusicRecording"
                    className="credits">
                    <span itemProp="inAlbum"
                          itemScope itemType="https://schema.org/MusicAlbum">
                        { album }
                    </span>
                </div>
            </div>
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
            fields {
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
                aboutName
            }
        }
    }
`;

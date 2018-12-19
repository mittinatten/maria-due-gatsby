import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

import "./song.css";

export default ({ data }) => {
    let lyrics;
    let album;
    let creator;
    const fields = data.song.fields;

    if (data.song.lyrics) {
        lyrics = data.song.lyrics.split('\n').map((line, index) =>
            <div key={index} className="textline">{ line }</div>);
    }

    if (data.song.album && fields && fields.albumSlug) {
        album =
            <p style={{marginTop: '2em'}}>
                From the album <a href={fields.albumSlug} itemProp="name">
                    { data.song.album.title }
                </a> <span itemProp="datePublished">{ data.song.album.year }</span>.
            </p>
    }

    if (JSON.stringify(fields.lyricsBy) === JSON.stringify(fields.musicBy)) {
        const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
        creator =
            <p>
                Words and music by {lyricsByNames}.
            </p>
    } else {
        const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ').replace(/,(?!.*,)/, ' and');
        const musicByNames = fields.musicBy.map(person => person.name).join(', ').replace(/,(?!.*,)/, ' and');
        creator =
            <p>
                Lyrics by {lyricsByNames}. Music by {musicByNames}.
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
            <div itemScope itemType="https://schema.org/MusicComposition">
                <h2 itemProp="name">{ data.song.title }</h2>
                { lyricsMicrodata }
                { musicMicrodata }
                <div itemProp="lyrics" itemScope itemType="https://schema.org/CreativeWork">
                    <div itemProp="text">{ lyrics }</div>
                </div>
                <div itemProp="isPartOf"
                    itemScope itemType="https://schema.org/MusicAlbum">
                    { album }
                </div>
                { creator }
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
        }
    }
`;

import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
    let lyrics;
    let album;
    let creator;
    const fields = data.song.fields;

    if (data.song.lyrics) {
        lyrics = data.song.lyrics.split('\n').map((line, index) =>
            <div key={index} style={{textIndent: '-1em', marginLeft: '1em', minHeight: '1em' }}>{ line }</div>);
    }

    if (data.song.album && fields && fields.albumSlug) {
        album =
            <p style={{marginTop: '2em'}}>
                From the album <a href={fields.albumSlug} itemProp="name">
                    { data.song.album.title }
                </a> <span itemProp="datePublished">{ data.song.album.year }</span>.
            </p>
    }

    if (fields && fields.lyricsBy && fields.musicBy) {
        let display;
        if (JSON.stringify(fields.lyricsBy) === JSON.stringify(fields.musicBy)) {
            const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
            display =
                <p>
                    Words and music by {lyricsByNames}.
                </p>
        } else {
            const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
            const musicByNames = fields.musicBy.map(person => person.name).join(', ');
            display =
                <p>
                    Lyrics by {lyricsByNames}, music by {musicByNames}.
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

        creator = <div>{ display } { lyricsMicrodata } { musicMicrodata }</div>
    }

    return (
        <Layout>
            <div itemScope itemType="https://schema.org/MusicComposition">
                <h2 itemProp="name">{ data.song.title }</h2>
                <div itemProp="lyrics">{ lyrics }</div>
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

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
                From the album <a href={fields.albumSlug}>{ data.song.album.title }</a> { data.song.album.year }.
            </p>
    }

    if (fields && fields.lyricsBy && fields.musicBy) {
        if (JSON.stringify(fields.lyricsBy) === JSON.stringify(fields.musicBy)) {
            const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
            creator =
                <p>
                    Words and music by {lyricsByNames}.
                </p>
        } else {
            const lyricsByNames = fields.lyricsBy.map(person => person.name).join(', ');
            const musicByNames = fields.musicBy.map(person => person.name).join(', ');
            creator =
                <p>
                    Lyrics by {lyricsByNames}, music by {musicByNames}.
                </p>
        }
    }

    return (
        <Layout>
            <h2>{ data.song.title }</h2>
            { lyrics }
            { album }
            { creator }
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

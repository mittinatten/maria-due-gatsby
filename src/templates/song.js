import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
    let lyrics;
    let album;

    if (data.song.lyrics) {
        lyrics = data.song.lyrics.split('\n').map((line, index) =>
            <div key={index} style={{textIndent: '-1em', marginLeft: '1em', minHeight: '1em' }}>{ line }</div>);
    }

    if (data.song.album && data.song.fields && data.song.fields.albumSlug) {
        album =
            <p style={{marginTop: '2em'}}>
                From <a href={data.song.fields.albumSlug}>{ data.song.album.title }</a> { data.song.album.year }
            </p>
    }

    return (
        <Layout>
            <h2>{ data.song.title }</h2>
            { lyrics }
            { album }
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
                albumSlug
            }
        }
    }
`;

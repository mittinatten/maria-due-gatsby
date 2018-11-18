import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
    let lyrics;
    if (data.song.lyrics) {
        lyrics = data.song.lyrics.split('\n').map((line, index) =>
            <div key={index} style={{textIndent: '-1em', marginLeft: '1em', minHeight: '1em' }}>{ line }</div>);
    }

    return (
        <Layout>
            <h2>{ data.song.title }</h2>
            { lyrics }
            <p style={{marginTop: '2em'}}>
                From <a href={data.song.fields.albumSlug}>{ data.song.album.title }</a> { data.song.album.year }</p>
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

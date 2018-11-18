import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
    const album = data.album;
    let songs;
    let cover;
    let play;

    if (album.spotify) {
        play = <a href={ album.spotify } className='play-link'><i className={'fas fa-play-circle'}></i></a>;
    }

    if (album.cover) {
        cover = <img src={album.cover.asset.url} alt="cover" style={{margin: 0}}/>
    }

    if (album.fields.songs) {
        songs =
            <div><h3>Songs</h3><ul>
                { album.fields.songs.map(song =>
                    <li key={song.title}><a href={song.slug}>{ song.title }</a></li>)
                }
            </ul></div>;
    }

    return (
        <Layout>
            <h2>{play}{album.title}</h2>
            { cover }
            { songs }
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        album(fields: { slug: { eq: $slug } }) {
            title,
            spotify,
            cover {
                asset {
                    url
                }
            },
            fields {
                songs {
                    title,
                    slug
                }
            }
        }
    }
`;

import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import AlbumCover from "../components/album-cover";
import "./album.css"

export default ({ data }) => {
    const album = data.album;
    let songs;
    let play;

    if (album.spotify) {
        play = <a href={ album.spotify } className='play-link'><i className={'fas fa-play-circle'}></i></a>;
    }

    if (album.fields.songs) {
        songs =
            <div>
                <ol>
                    { album.fields.songs.map(song =>
                        <li key={song.title}><a href={song.slug}>{ song.title }</a></li>)
                    }
                </ol>
            </div>;
    }

    return (
        <Layout>
            <div itemProp="albumRelease" itemScope itemType="https://schema.org/MusicRelease" style={{marginBottom: '1rem'}}>
                <span itemProp="datePublished">{album.year}</span>
                <h2>{play}<span itemProp="name">{album.title}</span></h2>
                <div className="album">
                    <div className="cover">
                        <AlbumCover album={album}></AlbumCover>
                    </div>
                    <div className="songs">
                        { songs }
                    </div>
                </div>
            </div>
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

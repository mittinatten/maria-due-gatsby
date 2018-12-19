import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import AlbumCover from "../components/album-cover";
import "./album.css"

export default ({ data }) => {
    const album = data.album;
    const { about, aboutName } = data.site.siteMetadata;
    let songs;
    let play;
    let release;
    let producer;

    if (album.spotify) {
        play = <a href={ album.spotify } className='play-link'><i className={'fas fa-play-circle'}></i></a>;
    }

    if (album.fields.songs) {
        songs =
            <div>
                <ol>
                    { album.fields.songs.map(song =>
                        <li itemProp="track"
                            itemScope itemType="https://schema.org/MusicRecording"
                            key={song.title}>
                            <span itemProp="recordingOf"
                                itemScope itemType="https://schema.org/MusicComposition">
                                <a href={song.slug} itemProp="sameAs">
                                    <span itemProp="name">{ song.title }</span>
                                </a>
                            </span>
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
            <span itemProp="contributor" itemScope itemType="https://schema.org/Person">
                Produced by <span itemProp="name">{ name }</span>.
                <span itemProp="sameAs" style={{display: 'none'}}>{album.producer.sameAs}</span>
            </span>;
    }

    return (
        <Layout>
            <div itemScope itemType="https://schema.org/MusicAlbum" style={{marginBottom: '1rem'}}>
                <h2>{play}<span itemProp="name">{album.title}</span></h2>
                <span style={{display: 'none'}}
                    itemProp="byArtist"
                    itemScope itemType="https://schema.org/MusicGroup">
                    <span itemProp="name">{aboutName}</span>
                    <span itemProp="sameAs">{about}</span>
                </span>
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
                songs {
                    title,
                    slug
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

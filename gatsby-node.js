/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');



function titleToSlug(title) {
    return title.replace(/ /g, '-').toLowerCase();
}

function createAlbumSlug(album) {
    return '/albums/' + titleToSlug(album.title);
}

function createSongSlug(song) {
    return '/songs/' + titleToSlug(song.title);
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    if (node.internal.type === 'Album') {
        const { createNodeField, createNode } = actions;
        const slug = createAlbumSlug(node);

        createNodeField({
             node,
             name: 'slug',
             value: slug
        });

        createNodeField({
             node,
             name: 'songs',
             value: (node.songs && node.songs.length ) ?
                node.songs.map(song => { return { title: song.title, slug: createSongSlug(song) }; }) :
                []
        });
    }

    if (node.internal.type === 'Song') {
        const { createNodeField } = actions;
        const slug = createSongSlug(node);

        createNodeField({
             node,
             name: 'slug',
             value: slug
        });

        if (node.album && node.album.title) {
            createNodeField({
                node,
                name: 'albumSlug',
                value: createAlbumSlug(node.album)
            })
        }
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        graphql(`{
            allAlbum {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            },
            allSong {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }`).then(result => {
            result.data.allAlbum.edges.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/templates/album.js'),
                    context: { slug: node.fields.slug },
                });
            });
            result.data.allSong.edges.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/templates/song.js'),
                    context: { slug: node.fields.slug },
                });

            });
        })
        .then(() => resolve());
    });
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.onCreateNode = ({ node, getNode, actions}) => {
    if (node.internal.type === 'Album') {
        const { createNodeField } = actions;
        const slug = '/' + node.title.replace(/ /g, '-').toLowerCase();
        createNodeField({
             node,
             name: 'slug',
             value: slug
        });
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        graphql(`{
            allAlbum     {
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
                    context: {
                        slug: node.fields.slug
                    },
                });
            });
            resolve();
        });
    });
}

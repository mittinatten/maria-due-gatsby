module.exports = {
    siteMetadata: {
        title: 'Maria Due [test]',
        description: 'Artist page for Maria Due',
        url: 'https://mariadue.net',
        about: 'https://www.wikidata.org/wiki/Q17143368',
        keywords: 'music, Maria Due',
        robots: 'noindex, nofollow' // TODO: change this when finished!
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'maria-due',
                short_name: 'maria-due',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js',
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://mariadue.net',
                policy: [{ userAgent: '*', disallow: '/' }]
            }
        },
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'zp0hhhsi',
                dataset: 'production',
                queries: [
                    {
                        name: 'albums',
                        type: 'Album',
                        groq: `*[_type == 'album']{
                            _id,
                            cover {
                                _type,
                                asset->
                            },
                            'songs': songs[]->{_ref, title},
                            title,
                            year,
                            spotify,
                            recordLabel {
                                name,
                                homePage
                            },
                            producer {
                                name,
                                homePage
                            }
                        }`
                    },
                    {
                        name: 'appearsOn',
                        type: 'AppearsOn',
                        groq: `*[_type == 'appearsOn']`
                    },
                    {
                        name: 'songs',
                        type: 'Song',
                        groq: `*[_type == 'song']{
                            _id,
                            title,
                            lyrics,
                            'album': album->{_ref, title, year}
                        }`
                    },
                    {
                        name: 'concerts',
                        type: 'Concert',
                        groq: `*[_type == 'concert']`
                    },
                    {
                        name: 'frontMatter',
                        type: 'FrontMatter',
                        groq: `*[_type == 'frontMatter']`
                    },
                    {
                        name: 'videos',
                        type: 'Video',
                        groq: `*[_type == 'video']`
                    }
                ]
            }
        }
    ],
}

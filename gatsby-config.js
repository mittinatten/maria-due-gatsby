module.exports = {
    siteMetadata: {
        title: 'Maria Due',
        description: 'Artist page for Maria Due',
        url: 'https://mariadue.net',
        siteUrl: 'https://mariadue.net', // necessary for robots.txt
        about: 'https://www.wikidata.org/wiki/Q17143368',
        aboutName: 'Maria Due',
        keywords: 'music, Maria Due'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
              siteUrl: `https://mariadue.net`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'maria-due',
                short_name: 'maria-due',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/default.jpg', // This path is relative to the root of the site.
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
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'zp0hhhsi',
                dataset: 'production',
                stringifyPattern: '_toString',
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
                                homePage,
                                sameAs
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
                            video,
                            'album': album->{_ref, title, year},
                            'lyricsBy': lyricsBy[],
                            'musicBy': musicBy[],
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
                        groq: `*[_type == 'frontMatter']{
                            _id,
                            title,
                            image {
                                _type,
                                asset->
                            },
                            "body_toString": body,
                        }`
                    },
                    {
                        name: 'videos',
                        type: 'Video',
                        groq: `*[_type == 'video']`
                    },
                    {
                        name: 'contactInfo',
                        type: 'ContactInfo',
                        groq: `*[_type == 'contactInfo']`
                    }
                ]
            }
        }
    ],
}

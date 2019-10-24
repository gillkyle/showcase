require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Song Showcase`,
    description: `Best music in one place.`,
    author: `Kyle Gill`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `songshowcase`,
        accessToken: `${process.env.GATSBY_PRISMIC_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`100`, `300`, `400`, `500`, `700`],
          },
          {
            family: `PT Sans`,
            variants: [`400`, `700`],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: `${process.env.GATSBY_CLIENT_ID}`,
        clientSecret: `${process.env.GATSBY_CLIENT_SECRET}`,
        refreshToken: `AQAlCO82_2dY9t7aF8h3ONn69BDSzgGV2LFFQArSFKAAW2u5AU1neSMsoDYmPnVYjDoiUA7ZJ2y4AMC5nYgqp6da0LnsOZkzfMNHUzAy6JuQTEXPifqprSz5-xWVNzNK32RHDg`,
        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: false, // optional. Set to false to disable fetching of your recently played tracks
      },
    },
  ],
}

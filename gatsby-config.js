require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Audio Vault`,
    description: `Curated, emotional music.`,
    author: `Kyle Gill`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `songshowcase`,
        accessToken: `${process.env.GATSBY_PRISMIC_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Cabin`,
              variants: [`100`, `300`, `400`, `500`, `700`],
            },
            {
              family: `Open Sans`,
              variants: [`400`, `700`],
            },
            {
              family: `Inter`,
              variants: [`400`, `700`],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-152643177-1",
      },
    },
    // simplifies sending signups to Mailchimp
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://gmail.us5.list-manage.com/subscribe/post?u=ce4a6fc187c7f93aa8657f35f&amp;id=79efa975eb`,
      },
    },
    // PWA support
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Audio Vault`,
        short_name: `Audio Vault`,
        start_url: `/`,
        background_color: `#111517`,
        theme_color: `#389cff`,
        display: `minimal-ui`,
        icon: `src/app-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}

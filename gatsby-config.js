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
    `gatsby-plugin-transition-link`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Cabin`,
            variants: [`100`, `300`, `400`, `500`, `700`],
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`],
          },
        ],
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
  ],
}

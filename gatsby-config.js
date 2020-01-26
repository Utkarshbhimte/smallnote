module.exports = {
  siteMetadata: {
    title: `SmallNote`,
    description: `Manage notes easily`,
    author: `@utkarshbhimte`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `smallnote`,
      options: {
        name: `SmallNote`,
        short_name: `SmallNote`,
        start_url: `/`,
        background_color: `#E8DDE6`,
        theme_color: `#E8DDE6`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

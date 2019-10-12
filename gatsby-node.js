const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    query {
      allPrismicSong {
        nodes {
          id
          uid
        }
      }
    }
  `)

  const template = path.resolve("src/templates/song.js")

  pages.data.allPrismicSong.nodes.forEach(node => {
    createPage({
      path: `${node.uid}`,
      component: template,
      context: {
        uid: node.uid,
      },
    })
  })
}

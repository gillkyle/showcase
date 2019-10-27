const path = require("path")

const trackItems = require(`./data/tracks.json`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // add data in /data/tracks.json to posts from Prismic

  // only add to PrismicSong nodes
  if (node.internal.type === `PrismicSong`) {
    // find the matching song from tracks.json to hook up to the song
    const matchingTrackItem = trackItems.find(
      trackItem => trackItem.track.id === node.data.spotify_id
    )

    // add the previewUrl field from the track to the PrismicNode
    createNodeField({
      node,
      name: `previewUrl`,
      value: matchingTrackItem.track.preview_url,
    })
    createNodeField({
      node,
      name: `duration`,
      value: matchingTrackItem.track.duration_ms,
    })
    createNodeField({
      node,
      name: `popularity`,
      value: matchingTrackItem.track.popularity,
    })
  }
}

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

const path = require("path")
const _ = require("lodash")

const trackItems = require(`./data/tracks.json`)
const getArtistUrl = require(`./src/utils/get-artist-url`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // add data in /data/tracks.json to posts from Prismic

  const getMatchingTrackItem = node => {
    if (node.internal.type === `PrismicSong`) {
      return trackItems[node.data.spotify_id]
    } else if (node.internal.type === `PrismicFeaturedTrack`) {
      return trackItems[node.data.featured_track_spotify_id]
    }
  }

  // only add to PrismicSong nodes
  if (
    node.internal.type === `PrismicSong` ||
    node.internal.type === `PrismicFeaturedTrack`
  ) {
    // find the matching song from tracks.json to hook up to the song
    const matchingTrackItem = getMatchingTrackItem(node)
    if (!matchingTrackItem) return

    // add the previewUrl field from the track to the PrismicNode
    createNodeField({
      node,
      name: `previewUrl`,
      value: matchingTrackItem.preview_url,
    })
    createNodeField({
      node,
      name: `duration`,
      value: matchingTrackItem.duration_ms,
    })
    createNodeField({
      node,
      name: `popularity`,
      value: matchingTrackItem.popularity,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const artists = await graphql(`
    query {
      allPrismicSong {
        distinct(field: data___artist)
      }
    }
  `)
  const pages = await graphql(`
    query {
      allPrismicSong(sort: { fields: data___timestamp, order: DESC }) {
        nodes {
          id
          uid
          data {
            song_title
            artist
            album_art {
              localFile {
                childImageSharp {
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const tags = await graphql(`
    query {
      allPrismicTag {
        nodes {
          id
          data {
            name
            bg_color
            text_color
          }
        }
      }
    }
  `)

  const artistTemplate = path.resolve("src/templates/artist.js")
  const songTemplate = path.resolve("src/templates/song.js")
  const tagTemplate = path.resolve("src/templates/tag.js")

  pages.data.allPrismicSong.nodes.forEach((node, index) => {
    createPage({
      path: `${node.uid}`,
      component: songTemplate,
      context: {
        uid: node.uid,
        next: _.get(pages.data.allPrismicSong.nodes, index + 1),
        prev: _.get(pages.data.allPrismicSong.nodes, index - 1),
      },
    })
  })
  tags.data.allPrismicTag.nodes.forEach(node => {
    createPage({
      path: `/tag/${node.data.name.toLowerCase()}`,
      component: tagTemplate,
      context: {
        name: node.data.name,
        bgColor: node.data.bg_color,
        textColor: node.data.text_color,
      },
    })
  })
  artists.data.allPrismicSong.distinct.forEach(node => {
    createPage({
      path: `/artist/${getArtistUrl(node)}`,
      component: artistTemplate,
      context: {
        name: node,
      },
    })
  })
}

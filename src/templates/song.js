import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import AlbumArt from "../components/album-art"
import SpotifyEmbed from "../components/spotify-embed"

const Post = ({ data }) => {
  const { data: song } = data.prismicSong
  const authorName = get(song, `author.document[0].data.name`)
  const tags = get(song, `tag_list[0].all_tags.document`)
  console.log(tags)

  return (
    <Layout>
      <h1>{song.song_title}</h1>
      <h1>{authorName}</h1>
      <AlbumArt fixed={song.album_art.localFile.childImageSharp.fixed} />
      <div dangerouslySetInnerHTML={{ __html: song.content.html }}></div>
      <SpotifyEmbed id={song.spotify_id} />
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query SongBySlug($uid: String!) {
    prismicSong(uid: { eq: $uid }) {
      uid
      data {
        song_title
        artist
        timestamp
        spotify_id
        content {
          html
        }
        album_art {
          localFile {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        author {
          document {
            data {
              name
            }
          }
        }
        tag_list {
          all_tags {
            document {
              data {
                bg_color
                name
                text_color
              }
            }
          }
        }
      }
    }
  }
`

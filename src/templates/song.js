import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import AlbumArt from "../components/album-art"
import SpotifyEmbed from "../components/spotify-embed"

const Post = ({ data }) => {
  console.log(data)
  const { data: song } = data.prismicSong
  return (
    <Layout>
      <h1>{song.song_title}</h1>
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
        timestamp
        spotify_id
        song_title
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
        artist
      }
    }
  }
`

/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import AlbumArt from "../components/album-art"
import SpotifyEmbed from "../components/spotify-embed"
import Tag from "../components/tag"
import { useMousePosition } from "../hooks/useMousePosition"
import { useWindowSize } from "../hooks/useWindowSize"

const Post = ({ data }) => {
  const { data: song } = data.prismicSong
  const authorName = get(song, `author.document[0].data.name`)
  const tags = get(song, `tag_list[0].all_tags.document`)
  const position = useMousePosition()
  const size = useWindowSize()
  const a = 0.99 + (position.x / size.width) * 0.025
  const b = 0.07 + (position.y / size.height) * 0.025
  const c =
    -0.11 + (((position.x / size.height) * position.y) / size.width) * 0.025

  return (
    <Layout>
      <div
        sx={{
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <div
          sx={{
            mt: `6`,
            position: `relative`,
          }}
        >
          <div
            sx={{
              position: `absolute`,
              right: 64,
              bottom: 32,
              transform: `matrix(${a}, ${b}, ${c}, 1, 0, 0)`,
            }}
          >
            <AlbumArt fixed={song.album_art.localFile.childImageSharp.fixed} />
          </div>
          <div
            sx={{
              backgroundColor: `card`,
              borderRadius: `2`,
              p: `4`,
            }}
          >
            <h1 sx={{ fontSize: `6`, fontStyle: `italic`, mb: `1` }}>
              {song.song_title}
            </h1>
            <div sx={{ fontSize: `4`, color: `primaryMuted`, mb: `4` }}>
              {song.artist}
            </div>
            <div
              sx={{
                display: `flex`,
              }}
            >
              {tags.map(tag => (
                <Tag tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `minmax(80px, 150px) 1fr minmax(80px, 150px)`,
          }}
        >
          <div>{authorName}</div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: song.content.html }}></div>
            <SpotifyEmbed id={song.spotify_id} />
          </div>
          <div>asdf</div>
        </div>
      </div>
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
              fixed(width: 250, height: 250) {
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

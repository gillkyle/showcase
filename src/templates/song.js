/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { get } from "lodash"
import { formatDistance } from "date-fns"

import Layout from "../components/layout"
import AlbumArt from "../components/album-art"
import SpotifyEmbed from "../components/spotify-embed"
import Tag from "../components/tag"
import PlayButton from "../components/play-button"
import PlayAnimation from "../components/play-animation"

const Post = ({ data }) => {
  const { data: song } = data.prismicSong
  const authorName = get(song, `author.document[0].data.name`)
  const tags = get(song, `tag_list[0].all_tags.document`)

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
              height: 250,
              right: 32,
              bottom: 32,
              borderRadius: `1`,
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
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `minmax(80px, 220px) 1fr minmax(80px, 220px)`,
          }}
        >
          <div
            sx={{
              mt: `5`,
              color: `textMuted`,
              "*+*": {
                mt: `3`,
              },
            }}
          >
            <div>
              by: <span sx={{ color: `text` }}>{authorName}</span>
            </div>
            <div
              sx={{
                textTransform: `uppercase`,
                fontSize: `0`,
                fontWeight: `bold`,
              }}
            >
              {formatDistance(new Date(song.timestamp), new Date())} ago
            </div>
          </div>
          <div>
            {song.excerpt && (
              <div sx={{ fontSize: `4`, mt: `5`, mb: `4` }}>{song.excerpt}</div>
            )}
            <div
              sx={{
                mb: `3`,
                display: `grid`,
                gridGap: `3`,
                gridTemplateColumns: `auto 1fr`,
              }}
            >
              <PlayButton />
              <PlayAnimation playing={false} />
            </div>
            <div
              sx={{
                lineHeight: `2`,
                "& > p:first-of-type::first-letter": {
                  float: `left`,
                  fontSize: `8`,
                  lineHeight: `48px`,
                  mt: `4`,
                  mr: `2`,
                  fontWeight: 700,
                },
              }}
              dangerouslySetInnerHTML={{ __html: song.content.html }}
            />
            <SpotifyEmbed id={song.spotify_id} />
          </div>
          <div />
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
        excerpt
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

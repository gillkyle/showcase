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

const Post = ({ data }) => {
  const { data: song, fields: spotifyData } = data.prismicSong
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
            display: `flex`,
            justifyContent: `center`,
            minHeight: 280,
          }}
        >
          <div
            sx={{
              position: `absolute`,
              width: `25%`,
              left: -50,
              bottom: 20,
              borderRadius: `1`,
            }}
          >
            <AlbumArt fluid={song.album_art.localFile.childImageSharp.fluid} />
          </div>
          <div
            sx={{
              backgroundColor: `card`,
              borderRadius: `2`,
              p: `4`,
              width: `70%`,
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <div sx={{ pl: `72px` }}>
              <h1 sx={{ fontSize: `7`, mb: `1` }}>{song.song_title}</h1>
              <div
                sx={{
                  fontSize: `5`,
                  color: `primaryMuted`,
                  mb: `4`,
                  background: theme =>
                    `linear-gradient(${theme.colors.secondary}, ${theme.colors.primary})`,
                  "-webkit-background-clip": `text`,
                  "-webkit-text-fill-color": `transparent`,
                }}
              >
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
              color: `textMuted.0`,
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
                border: `1px solid`,
                borderColor: `border`,
                p: `2`,
                mb: `3`,
                display: `grid`,
                gridGap: `3`,
                gridTemplateColumns: `auto auto 1fr`,
                justifyContent: `center`,
              }}
            >
              <PlayButton songPreview={spotifyData.previewUrl} />
              <div
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  fontSize: `1`,
                  letterSpacing: `2px`,
                  textTransform: `uppercase`,
                  color: `textMuted.1`,
                }}
              >
                Song Preview
              </div>
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
      fields {
        previewUrl
      }
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
              fluid {
                ...GatsbyImageSharpFluid
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

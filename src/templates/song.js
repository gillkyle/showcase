/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
import SpotifyEmbed from "../components/spotify-embed"
import SongHeader from "../components/song-header"
import SongMenu from "../components/song-menu"
import PlayButton from "../components/play-button"

const Post = ({ data }) => {
  const { data: song, fields: spotifyData } = data.prismicSong
  const authorName = get(song, `author.document[0].data.name`)
  const tags = song.tag_list.map(song => song.all_tags.document)

  return (
    <Layout>
      <div
        sx={{
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <SongHeader authorName={authorName} song={song} tags={tags} />
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: [`5% 1fr 5%`, `175px 1fr 175px`],
          }}
        >
          <div
            sx={{
              mt: `5`,
              visibility: [`hidden`, `hidden`, `visible`],
              flexDirection: [`row`, `column`, null],
              color: `textMuted.0`,
            }}
          >
            <SongMenu
              spotifyId={song.spotify_id}
              authorName={authorName}
              songTimestamp={song.timestamp}
            />
          </div>
          <div>
            {song.excerpt && (
              <div sx={{ fontSize: `4`, mt: [`4`, `5`], mb: `4` }}>
                {song.excerpt}
              </div>
            )}
            <div
              sx={{
                backgroundColor: `background`,
                border: `1px solid`,
                borderColor: `border`,
                borderRadius: `1`,
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
                "& > p": {
                  lineHeight: `2`,
                },
                "& > p > a": {
                  variant: `gradient.text`,
                },
                "& > p:first-of-type::first-letter": {
                  float: `left`,
                  fontSize: `8`,
                  lineHeight: 0.7,
                  mt: `3`,
                  mr: `2`,
                  fontWeight: 700,
                },
                "& > pre": {
                  fontFamily: `Cabin, Open Sans, sans-serif`,
                  letterSpacing: 1.1,
                  lineHeight: 1.5,
                  px: `3`,
                  borderLeft: theme => `1px solid ${theme.colors.border}`,
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
      ...SongFieldsFragment
      data {
        song_title
        excerpt
        artist
        timestamp
        spotify_id
        content {
          html
        }
        ...AlbumArtFragment
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

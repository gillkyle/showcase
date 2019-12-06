/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { get } from "lodash"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import Layout from "../components/layout"
import SpotifyEmbed from "../components/spotify-embed"
import SongHeader from "../components/song-header"
import SongMenu from "../components/song-menu"
import PlayButton from "../components/play-button"
import AlbumArt from "../components/album-art"

const Post = ({ data, pageContext }) => {
  const { data: song, fields: spotifyData } = data.prismicSong
  const { next, prev } = pageContext
  const authorName = get(song, `author.document[0].data.name`)
  const tags = song.tag_list.map(song => song.all_tags.document)

  return (
    <Layout sx={{ bg: `red` }}>
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
            <div
              sx={{
                display: `grid`,
                gridTemplateColumns: !!prev ? `1fr 1fr` : `1fr`,
                gridGap: `3`,
              }}
            >
              {prev && (
                <AniLink
                  cover
                  direction="left"
                  entryOffset={100}
                  duration={0.75}
                  bg="#232323"
                  to={prev.uid}
                  sx={{ textDecoration: `none` }}
                >
                  <div
                    sx={{
                      color: `text`,
                      backgroundColor: `background`,
                      border: `1px solid`,
                      borderColor: `border`,
                      borderRadius: `1`,
                      p: `2`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <FiChevronLeft size={30} />
                    <div sx={{ mx: `1` }}>
                      <div sx={{ fontSize: `1` }}>{prev.data.song_title}</div>
                      <div sx={{ fontSize: `1`, color: `textMuted.0` }}>
                        {prev.data.artist}
                      </div>
                    </div>
                    <div>
                      <AlbumArt
                        sx={{ height: 60, width: 60 }}
                        fluid={
                          prev.data.album_art.localFile.childImageSharp.fluid
                        }
                      />
                    </div>
                  </div>
                </AniLink>
              )}
              {next && (
                <AniLink
                  cover
                  direction="right"
                  entryOffset={100}
                  duration={0.75}
                  bg="#232323"
                  to={next.uid}
                  sx={{ textDecoration: `none` }}
                >
                  <div
                    sx={{
                      color: `text`,
                      backgroundColor: `background`,
                      border: `1px solid`,
                      borderColor: `border`,
                      borderRadius: `1`,
                      p: `2`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <div>
                      <AlbumArt
                        sx={{ height: 60, width: 60 }}
                        fluid={
                          next.data.album_art.localFile.childImageSharp.fluid
                        }
                      />
                    </div>
                    <div sx={{ mx: `1` }}>
                      <div sx={{ fontSize: `1` }}>{next.data.song_title}</div>
                      <div sx={{ fontSize: `1`, color: `textMuted.0` }}>
                        {next.data.artist}
                      </div>
                    </div>
                    <FiChevronRight size={30} />
                  </div>
                </AniLink>
              )}
            </div>
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

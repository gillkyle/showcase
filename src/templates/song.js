/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { get } from "lodash"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import AlbumArt from "../components/album-art"
import Layout from "../components/layout"
import SpotifyEmbed from "../components/spotify-embed"
import SignupCard from "../components/signup-card"
import SongHeader from "../components/song-header"
import SongMenu from "../components/song-menu"
import PlayButton from "../components/play-button"
import SEO from "../components/seo"

const Post = ({ data, pageContext }) => {
  const { data: song, fields: spotifyData } = data.prismicSong
  const { next, prev } = pageContext
  const authorName = get(song, `author.document[0].data.name`)
  const tags = song.tag_list.map(song => song.all_tags.document)

  return (
    <Layout sx={{ bg: `red` }}>
      <SEO
        title={`${song.song_title} - ${song.artist} Review`}
        description={song.excerpt}
      />
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
                gridTemplateColumns: [`auto auto`, `auto auto 1fr`],
                justifyContent: [`flex-start`, `center`],
              }}
            >
              {spotifyData?.previewUrl ? (
                <PlayButton songPreview={spotifyData.previewUrl} />
              ) : (
                <div />
              )}
              <div
                sx={{
                  display: [`none`, `flex`],
                  alignItems: `center`,
                  fontSize: `1`,
                  letterSpacing: `2px`,
                  textTransform: `uppercase`,
                  color: `textMuted.1`,
                }}
              >
                {!spotifyData?.previewUrl && `No `}Song Preview
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
                  maxWidth: [`300px`, `420px`],
                  overflow: `scroll`,
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
                gridTemplateColumns: !!prev ? [`1fr`, `1fr 1fr`] : `1fr`,
                gridGap: `3`,
              }}
            >
              {prev && (
                <Link
                  cover
                  direction="left"
                  entryOffset={100}
                  duration={0.75}
                  bg="#232323"
                  to={`/${prev.uid}`}
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
                      display: `grid`,
                      gridTemplateColumns: `30px minmax(100px, 180px) 60px`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <FiChevronLeft size={30} />
                    <div sx={{ mx: `1` }}>
                      <div
                        sx={{
                          fontSize: `1`,
                          whiteSpace: `nowrap`,
                          textOverflow: `ellipsis`,
                          overflow: `hidden`,
                        }}
                      >
                        {prev.data.song_title}
                      </div>
                      <div
                        sx={{
                          fontSize: `1`,
                          color: `textMuted.0`,
                          whiteSpace: `nowrap`,
                          textOverflow: `ellipsis`,
                          overflow: `hidden`,
                        }}
                      >
                        {prev.data.artist}
                      </div>
                    </div>
                    <div>
                      <AlbumArt
                        sx={{ height: 60, width: 60 }}
                        fluid={
                          prev.data.album_art.localFile.childImageSharp
                            .gatsbyImageData
                        }
                      />
                    </div>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  cover
                  direction="right"
                  entryOffset={100}
                  duration={0.75}
                  bg="#232323"
                  to={`/${next.uid}`}
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
                      display: `grid`,
                      gridTemplateColumns: `60px minmax(100px, 140px) 30px`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <div>
                      <AlbumArt
                        sx={{ height: 60, width: 60 }}
                        fluid={
                          next.data.album_art.localFile.childImageSharp
                            .gatsbyImageData
                        }
                      />
                    </div>
                    <div sx={{ mx: `1` }}>
                      <div
                        sx={{
                          fontSize: `1`,
                          whiteSpace: `nowrap`,
                          textOverflow: `ellipsis`,
                          overflow: `hidden`,
                        }}
                      >
                        {next.data.song_title}
                      </div>
                      <div
                        sx={{
                          fontSize: `1`,
                          color: `textMuted.0`,
                          whiteSpace: `nowrap`,
                          textOverflow: `ellipsis`,
                          overflow: `hidden`,
                        }}
                      >
                        {next.data.artist}
                      </div>
                    </div>
                    <FiChevronRight size={30} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <SignupCard sx={{ my: `5` }} />
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

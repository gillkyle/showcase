/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import { get } from "lodash"
import { formatDistance } from "date-fns"

import Layout from "../components/layout"
import AlbumArt from "../components/album-art"
import SpotifyEmbed from "../components/spotify-embed"
import Tag from "../components/tag"
import PlayButton from "../components/play-button"
import Clap from "../assets/clap.svg"

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
            mt: `5`,
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
            <motion.svg
              sx={{
                boxShadow: theme => `2px solid ${theme.colors.primary}`,
                borderRadius: 500,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="36" cy="36" r="35" stroke="white" stroke-width="2" />
              <path
                d="M19.93 36.053C18.9769 34.8041 19.0223 32.9539 20.157 31.7976C20.52 31.4275 21.0193 31.15 21.5185 31.0112C21.337 30.5949 21.2462 30.1324 21.2462 29.6698C21.2462 28.791 21.5639 28.0047 22.1539 27.4033C23.2886 26.247 25.0132 26.1545 26.2386 27.0796C26.3748 26.7095 26.5563 26.3395 26.8286 26.0157C27.4186 25.3681 28.2356 24.9518 29.0979 24.9518C29.9148 24.9056 30.7318 25.2294 31.3218 25.8307C31.4125 25.6919 31.5033 25.5069 31.6395 25.4144C32.2295 24.7668 33.0464 24.3505 33.9087 24.3505C34.8165 24.3043 35.6334 24.6743 36.2234 25.2756L40.762 29.8549C41.2612 27.9121 43.0766 26.5708 45.0736 26.802C45.6182 26.8483 46.1174 27.1258 46.4805 27.4959C47.2975 26.5708 48.5683 26.0157 49.8844 26.1545C51.1098 26.2932 52.0629 27.3571 52.0629 28.6522L52.0175 35.3592C52.0175 37.1169 52.2445 38.9208 52.6529 40.4935V40.5398C53.5607 43.7776 52.6529 47.2468 50.3383 49.6058C47.9329 52.0573 44.7105 53.3987 41.352 53.3987C41.0797 53.3987 40.762 53.3987 40.4896 53.3524C39.2188 53.7687 37.8573 54 36.5411 54C33.2734 54 30.0056 52.7511 27.5548 50.2071L18.7954 41.2336C18.2054 40.6323 17.8877 39.7997 17.8877 38.9671C17.8877 38.0883 18.2054 37.3019 18.7954 36.7006C19.1131 36.4231 19.5216 36.1918 19.93 36.053ZM34.9072 26.617C34.6349 26.3395 34.2718 26.247 33.9541 26.247C33.5911 26.247 33.2734 26.432 33.0464 26.6633C32.9103 26.8483 32.8195 27.0796 32.8195 27.3108L40.3081 35.1279L40.535 32.3064L34.9072 26.617ZM49.0221 48.3106C50.8829 46.4142 51.5637 43.6851 50.8829 41.1411C50.3837 39.2909 50.1567 37.3482 50.1567 35.4055L50.2021 28.6985C50.2021 28.421 49.9752 28.1434 49.7029 28.1434C48.5229 28.0047 47.479 28.8835 47.3428 30.0399L47.2521 31.15L47.2067 36.0068C47.2067 37.7645 47.4336 39.5222 47.7967 41.0948C47.7967 41.1411 47.8421 41.1411 47.8421 41.1873C48.7498 44.4252 47.8421 47.8943 45.5274 50.2533C45.3005 50.4846 45.0282 50.7159 44.8013 50.9472C46.3897 50.3921 47.8421 49.5133 49.0221 48.3106ZM20.1116 39.9385L28.871 48.9119C33.0918 53.2137 39.9904 53.2137 44.2112 48.9119C46.0267 47.0617 46.7528 44.3327 46.0721 41.7887V41.7424C45.5728 39.8459 45.3459 37.9495 45.3459 36.0068V29.2998C45.3459 29.0223 45.119 28.7447 44.8466 28.7447C43.6666 28.606 42.6228 29.4848 42.4866 30.6412L42.1689 35.313C42.0781 36.0068 41.6243 36.6081 40.9889 36.8394C40.3081 37.0706 39.6273 36.8856 39.1281 36.4231L30.1418 27.2646C29.8694 26.9871 29.6425 26.8483 29.1887 26.8945C28.8256 26.8945 28.5079 27.0796 28.281 27.3108C27.8725 27.7734 27.9179 28.6985 28.4171 29.2073L35.0888 36.053C35.4519 36.4231 35.4519 37.0244 35.0888 37.3944C34.9072 37.5795 34.6803 37.672 34.408 37.672C34.1811 37.672 33.9088 37.5795 33.7272 37.3944L27.0102 30.5487L25.2401 28.7447C24.7409 28.2359 23.9239 28.2359 23.4247 28.7447C23.1978 28.976 23.0616 29.2998 23.0616 29.6698C23.0616 30.0399 23.1978 30.3637 23.4247 30.5949L31.9572 39.2446C32.3203 39.6147 32.3203 40.216 31.9572 40.586C31.7756 40.771 31.5487 40.8636 31.2764 40.8636C31.0041 40.8636 30.7772 40.771 30.5956 40.586L25.8301 35.7292L23.2886 33.139C22.7893 32.6302 21.9724 32.6302 21.4731 33.139C20.9739 33.6478 20.9739 34.4804 21.4731 34.9892L23.1978 36.7469L24.4686 37.9957L28.8256 42.4362C29.1887 42.8063 29.1887 43.4076 28.8256 43.7776C28.644 43.9627 28.4171 44.0552 28.1448 44.0552C27.8725 44.0552 27.6456 43.9627 27.464 43.7776L21.8816 38.0883C21.3824 37.5795 20.5654 37.5795 20.0662 38.0883C19.8393 38.3195 19.7031 38.6433 19.7031 39.0134C19.7031 39.3834 19.8393 39.7072 20.1116 39.9385ZM26.6925 20.2801L24.3778 15.2383C24.1509 14.7757 23.6063 14.5444 23.1524 14.7757C22.6985 15.007 22.4716 15.5621 22.6985 16.0246L24.9678 21.1127C25.1494 21.4827 25.4671 21.6677 25.8301 21.6677C25.9663 21.6677 26.1025 21.6215 26.2386 21.5752C26.6925 21.3439 26.874 20.7426 26.6925 20.2801ZM32.8195 15.192C32.9557 14.6832 32.638 14.1744 32.1387 14.0356C31.6395 13.8968 31.1402 14.1744 31.0041 14.6832L29.5971 20.0488C29.461 20.5576 29.7787 21.0664 30.2779 21.2051C30.3687 21.2051 30.4595 21.2514 30.5048 21.2514C30.9133 21.2514 31.2764 20.9739 31.4126 20.5576L32.8195 15.192ZM16.5261 21.899L21.4731 24.258C21.6093 24.3043 21.7455 24.3505 21.8816 24.3505C22.2447 24.3505 22.5624 24.1655 22.7439 23.7955C22.9709 23.3329 22.7439 22.7316 22.2901 22.5466L17.3431 20.1876C16.8892 19.9563 16.2992 20.1876 16.1177 20.6501C15.8453 21.1127 16.0723 21.6677 16.5261 21.899Z"
                fill="white"
              />
            </motion.svg>
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

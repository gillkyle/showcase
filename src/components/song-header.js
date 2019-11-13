/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { formatDistance } from "date-fns"

import AlbumArt from "./album-art"
import Tag from "./tag"
import Clap from "./clap"
import { useQueryClapsById } from "../hooks/useClaps"

const SongHeader = ({ song, tags, authorName }) => {
  const { claps, id, loading } = useQueryClapsById(song.spotifyId)
  console.log(tags)
  return (
    <Fragment>
      {/* wide screen view */}
      <div
        sx={{
          display: [`none`, `none`, `flex`],
          mt: `5`,
          position: `relative`,
          justifyContent: `center`,
          minHeight: 280,
        }}
      >
        <div
          sx={{
            position: `absolute`,
            width: `25%`,
            left: 0,
            bottom: 20,
            borderRadius: `0`,
          }}
        >
          <AlbumArt fluid={song.album_art.localFile.childImageSharp.fluid} />
        </div>
        <div
          sx={{
            backgroundColor: `card`,
            borderRadius: `0`,
            p: `4`,
            width: `70%`,
            display: `flex`,
            alignItems: `center`,
          }}
        >
          <div sx={{ pl: `6` }}>
            <h1 sx={{ fontSize: `6`, mb: `1` }}>{song.song_title}</h1>
            <div
              sx={{
                fontSize: `5`,
                mb: `4`,
                variant: `gradient.text`,
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
                <Tag key={index} tag={tag[0]} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* smaller screen layout */}
      <div
        sx={{
          mt: `4`,
          display: [`grid`, `grid`, `none`],
          gridTemplateColumns: [`7.5% 1fr 7.5%`, `175px 1fr 175px`],
        }}
      >
        <div />
        <div
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `column`,
          }}
        >
          <div
            sx={{
              width: `100%`,
              backgroundColor: `card`,
              px: `3`,
              pb: `3`,
            }}
          >
            <AlbumArt
              sx={{ transform: `translateY(-20px)`, maxWidth: 300 }}
              fluid={song.album_art.localFile.childImageSharp.fluid}
            />
            <div
              sx={{
                color: `white`,
                fontSize: 5,
              }}
            >
              {song.song_title}
            </div>
            <div
              sx={{
                fontSize: 4,
                variant: `gradient.text`,
              }}
            >
              {song.artist}
            </div>
            <div
              sx={{
                display: `flex`,
                mt: `3`,
              }}
            >
              {tags &&
                tags.map(
                  (tag, index) =>
                    console.log(tag) || <Tag key={index} tag={tag[0]} />
                )}
            </div>
          </div>
          <div
            sx={{
              mt: `4`,
              display: `grid`,
              gridGap: `5`,
              flexDirection: `row`,
              gridTemplateColumns: `auto 1fr`,
              color: `textMuted.0`,
              alignSelf: `flex-start`,
            }}
          >
            <div
              sx={{
                display: `flex`,
                alignItems: `center`,
              }}
            >
              {!loading && (
                <Clap spotifyId={song.spotifyId} id={id} claps={claps} />
              )}
            </div>
            <div
              sx={{
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `center`,
              }}
            >
              <div>
                by: <span sx={{ color: `text` }}>{authorName}</span>
              </div>
              <div
                sx={{
                  mt: `2`,
                  textTransform: `uppercase`,
                  fontSize: `0`,
                  fontWeight: `bold`,
                }}
              >
                {formatDistance(new Date(song.timestamp), new Date())} ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SongHeader
